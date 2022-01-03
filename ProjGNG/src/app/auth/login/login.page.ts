import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { TranslateService } from "@ngx-translate/core";
import { Globalization } from "@ionic-native/globalization/ngx";
import { AlertController, LoadingController } from "@ionic/angular";
import { MSAdal, AuthenticationContext, AuthenticationResult } from "@ionic-native/ms-adal/ngx";
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { _ } from "underscore/underscore";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  providers: [AuthService], 
})
export class LoginPage implements OnInit {
  public language: string;
  initLang = [];
  lang = [];
  user = "Marco@bwd.local";
  password = "BwD@Admin";
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _translate: TranslateService,
    private globalization: Globalization,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private msAdal: MSAdal,
    private httpClient: HttpClient,

  ) {}

  ionViewDidEnter(): void {
    //this.getTranslations();

    this.autoLogin();
  
  }

  ngOnInit() {
    //this.setADAL();
    //console.log("DENTRO");
  }


  autoLogin() {



    const headers = new HttpHeaders();
    headers.append("Content-Type", "application\\x-www-form-urlencoded");
    headers.append("Access-Control-Allow-Origin", "*");


    
    let postParams = {
      "username":'Marco@bwd.local',
      "password": "BwD@Admin",
      "scope": "openid",
      "grant_type": "password",
      "client_id": "e02a316c-985a-473a-b2ac-90b38cded936"
    }

    let postAuth = {
      "client_id": "e02a316c-985a-473a-b2ac-90b38cded936",
      "response_type": "code",
      "redirect_uri": "http://localhost:8100",
      "response_mode": "query",
    }
    this.httpClient.post("https://fs.bwd.local/adfs/oauth2/authorize/", postAuth,  {
      headers: headers,
      observe: "body",
      responseType: "json"
    }).subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
     });

    // this.httpClient.get("https://fs.bwd.local/adfs/oauth2/authorize/", 
    // {
    //   headers:headers,
    //   params: postAuth
    // }).subscribe(data => {
    //   console.log(data['_body']);
    //  }, error => {
    //   console.log(error);
    // });
  }

  async setADAL() {
    let authContext: AuthenticationContext = this.msAdal.createAuthenticationContext('https://fs.bwd.local/federationmetadata/2007-06/federationmetadata.xml');

    authContext.acquireTokenAsync('https://webapi', '5ec93aaa-2842-4d33-a8f2-e7983740ef00', '/')
      .then((authResponse: AuthenticationResult) => {
        console.log('Token is' , authResponse.accessToken);
        console.log('Token will expire on', authResponse.expiresOn);
      })
      .catch((e: any) => console.log('Authentication failed', e));
  }

  login(form) {
    //this.authService.login(form.value);
    //this.router.navigate(["/dashboard"]);
    this.router.navigate(["/"]);
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

  getTranslations() {
    let res = { T_LOADING: "Loading" };
    this.loadingPresent(res);
    this.authService.getLanguage().subscribe(
      (res: any) => {
        let languages = [];
        res.value = _.filter(res.value, function (obj) {
          return obj.idGrupo == res.value[0].idGrupo;
        });
        this.lang = res.value;
        this.language = res.value[0].language;
        for (let val in res.value) {
          languages.push(res.value[val].language);
        }
        languages = _.uniq(languages);
        this.initLang = languages;
        this.getDeviceLanguage();
        this.authService
          .getTranslationsWithout(this._translate.getDefaultLang())
          .subscribe(
            (res) => {
              let data = res.value;
              languages = _.without(languages, languages[0]);
              for (let lang in languages) {
                let values = {};
                let temp = _.filter(data, function (obj) {
                  return (obj.language = languages[lang]);
                });
                for (let val in temp) {
                  values[temp[val].key] = temp[val].value;
                }
                this._translate.setTranslation(languages[lang], values);
                this.loadingDismiss();
              }
            },
            (error: any) => {
              this.loadingDismiss();
            }
          );
      },
      (error: any) => {
        this.loadingDismiss();
      }
    );
  }

  _initialiseTranslation(): void {
    this._translate.get("T_slingshot").subscribe((res: string) => {
      console.log("Translate T_slingshot = " + res);
      console.log("Translate NEW = " + this._translate.get("T_NEW"));
    });
  }

  public changeLanguage(): void {
    this._translateLanguage();
  }

  _translateLanguage(): void {
    this._translate.use(this.language);
    this._initialiseTranslation();
  }

  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang(this.initLang[0]);
    if (language) {
      this.language = language;
    } else {
      // Set your language here
      this.language = this.initLang[0];
    }
    this._translateLanguage();
  }

  getDeviceLanguage() {
    if (window.Intl && typeof window.Intl === "object") {
      this._initTranslate(this.initLang[0]);
    } else {
      this.globalization
        .getPreferredLanguage()
        .then((res) => {
          this._initTranslate(res.value);
        })
        .catch((e) => {
          console.log(e);
        });
    }
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
