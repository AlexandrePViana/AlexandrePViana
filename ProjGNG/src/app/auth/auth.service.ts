import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, map, catchError } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

import { Storage } from "@ionic/storage";
import { User } from "./user";
import { AuthResponse } from "./auth-response";
import { AlertController, LoadingController } from "@ionic/angular";
import {
  Plugins,
  FilesystemDirectory,
  FilesystemEncoding,
} from "@capacitor/core";
const { Filesystem } = Plugins;
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  //AUTH_SERVER_ADDRESS: string = "https://192.168.1.79:44331/";
  AUTH_SERVER_ADDRESS: string = "https://localhost:44399/api/";
  authSubject = new BehaviorSubject(false);
  isLoading = false;

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private _translate: TranslateService
  ) {}

  getLanguage() {
    this._translate.get(["T_LOADING"]).subscribe((res: Array<string>) => {
      this.loadingPresent(res);
    });
    
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.httpClient
      .get(`${this.AUTH_SERVER_ADDRESS}/api/com_language`, {
        headers: headers,
        observe: "body",
      })
      .pipe(
        tap(
          (res: AuthResponse) => {
            if (res) {
            }
          },
          (error: any) => {
            console.log("erro obter línguas");
            this.setAlertMessage('Erro', 'Sem ligação ao servidor');
          }
        )
      );
  }

  getTranslationsWithout(lang) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.httpClient
      .get(
        `${this.AUTH_SERVER_ADDRESS}api/com_tranlations?&$filter=language%20ne%20%27${lang}%27`,
        {
          headers: headers,
          observe: "body",
          withCredentials:true
        },
        
      )
      .pipe(
        tap(
          (res: AuthResponse) => {
            if (res) {
            }
          },
          (error: any) => {
            console.log("erro obter línguas");
          }
        )
      );
  }


  // login(user: User){
  //   this._translate.get(["T_LOADING"]).subscribe((res: Array<string>) => {
  //     this.loadingPresent(res);
  //   });
  //   let userInfo = user.user.split('@')[0];
  //   const enconded = btoa(userInfo + ":" + user.password);
  //   let contentHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Basic ' + enconded
  //   });
  //   const table = "user";
  //   console.log(enconded);
  //   console.log(contentHeader);
  //   this.httpClient.get(this.AUTH_SERVER_ADDRESS + table + '?&$filter=nome%20eq%20%27'+ userInfo+'%27',{ headers: contentHeader, withCredentials: true })
  //   .pipe(
  //     map((res:any) => {
  //        console.log(res);
  //     }),
  //     catchError(_ => this.httpClient.get(`/assets/i18n/en.json`))
  //   );
        
  // }


  login(user: User): Observable<AuthResponse> {
    this._translate.get(["T_LOADING"]).subscribe((res: Array<string>) => {
      this.loadingPresent(res);
    });
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient
      .post(
        'https://fs.bwd.local/adfs/oauth2/token',
        "grant_type=password&scope=openid&client_id=e02a316c-985a-473a-b2ac-90b38cded936" +
        "&username=" +
         user.user +
          "&password=" +
         user.password,
        {
          headers: headers,
          observe: "body",
        }
      )
      .pipe(
        tap(
          (res: AuthResponse) => {
            if (res) {
              console.log("done login!");
              this.loadingDismiss();
            }
          },
          (error: any) => {
            this.loadingDismiss();
            this._translate
              .get(["T_BADLOGIN", "T_SEEDATA"])
              .subscribe((res: Array<string>) => {
                this.setFailedLogin(res);
              });
          }
        )
      );
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user)
      .pipe(
        tap(async (res: AuthResponse) => {
          if (res) {
            await this.storage.set("access_token", res.access_token);
            await this.storage.set("token_type", res.token_type);
            await this.storage.set("expires_in", res.expires_in);
            this.authSubject.next(true);
          }
        })
      );
  }

  async logout() {
    await this.storage.remove("access_token");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  async setFailedLogin(res) {
    const alert = await this.alertController.create({
      cssClass: "failedLogin",
      header: res.T_BADLOGIN,
      message: res.T_SEEDATA,
      buttons: ["Ok"],
    });
    await alert.present();
  }

 

  async setAlertMessage(header, body) {
    const alert = await this.alertController.create({
      cssClass: "alertMessage",
      header: header,
      message: body,
      buttons: ["Ok"],
    });
    await alert.present();
  }

  async loadingPresent(res) {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: "A carregar" + "...",
        spinner: "circles",
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss();
          }
        });
      });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

}
