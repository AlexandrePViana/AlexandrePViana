import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { PagtoAntecipado } from "../../../objects/pagtoAntecipado";
import { Categoria } from "../../../objects/categoria";
import { User } from "../../../auth/user";
import { Ccusto } from "../../../objects/ccusto";
import { FormaPagUser } from "../../../objects/formaPagUser";
import { Empresa } from "../../../objects/empresa";
import { Grupo } from "../../../objects/grupo";
import { DataService } from "../../../service/dataService.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { FormaPagamento } from 'src/app/objects/formaPagamento';
import { JsonpClientBackend } from "@angular/common/http";

@Component({
  selector: "app-list",
  templateUrl: "./list.page.html",
  styleUrls: ["./list.page.scss"],
})
export class ListPage implements OnInit {
  backButton: void;
  item: {
    idUser: -1;
    valor : 0;
    idEmpresa : -1;
    empresa: string;
    idFormaPagamento: -1;
    formaPagamento: string;
    title: "";
    estado: "";
    aprovadoPor: "";
    descricao: "";
    id: -1
  };
  isLoading = false;
  userData : User;
  SupportedFormPag : FormaPagamento[];
  userFormPag : FormaPagUser[];
  data: PagtoAntecipado[];
  empresas: Empresa[];
  formaPagamento: FormaPagamento[];
  categoriasIni: Categoria[];
  formaPagamentoIni: FormaPagamento[];
  newMode: string;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private _translate: TranslateService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.values) {
        this.item = JSON.parse(params["values"]);
        this.item.formaPagamento = "";
        this.item.empresa = "";
      } else {
        this.item = {
          valor : 0,
          idUser: -1,
          idEmpresa : -1,
          empresa : "",
          idFormaPagamento: -1,
          formaPagamento: "",
          title: "",
          estado: "",
          aprovadoPor: "",
          descricao: "",
          id:-1
        };
      }
      this.newMode = params.new;
    });
  }

  ngOnInit() {
    this.getData();
    this.getTranslate();
  }

  getData(): void {
    this.dataService.getEmpresa().subscribe((values:any) => {
      this.empresas = values;
        this.dataService.getFormaPagamento().subscribe((values:any) => {
          this.formaPagamentoIni = values;
          this.dataService.getFormaPagamentoUser().subscribe((values:any) =>{
            this.userData = values;
            var allids : Number[];
            allids = [];
            const fk = <FormaPagUser[]> JSON.parse(this.userData.formasPagto);
            var count = fk.length;
            for (let i = 0; i < Number(count); i++) {
              allids.push(Number(fk[i].idFormaPag));
            }
            this.SupportedFormPag = this.formaPagamentoIni.filter((value)=> allids.includes(value.id));
            this.formaPagamento = this.SupportedFormPag.filter((value)=> value.cartCredito == 0);
          })
          this.getInfo();
        });
      });
  }

  getInfo() {
    if (this.newMode == "false") {
      try
      {
        this.item.empresa = this.empresas.filter(
          (value) => value.id == this.item.idEmpresa
        )[0].nome;
      }
      catch{
      }
        this.item.formaPagamento = this.formaPagamentoIni.filter(
          (value) => value.id == this.item.idFormaPagamento
        )[0].title;
    } 
    this.formaPagamento = this.formaPagamentoIni;
  }

  saveData() {
    this._translate.get(["T_LOADING"]).subscribe((res: any) => {
      this.loadingPresent(res);
    });
    if (this.newMode == "true") {
      let values = {
        idFormaPagamento: this.formaPagamento.filter(
          (filter) => filter.title == this.item.formaPagamento
        )[0].id,
        idEmpresa: this.empresas.filter(
          (filter) => filter.nome == this.item.empresa
        )[0].id,
        title: this.item.title,
        observacoes: this.item.descricao,
        valor : this.item.valor
            };
      this.dataService.addPagtoAntecipado(values).subscribe((values) => {
        this.isLoading = false;
        this._translate.get(["T_SAVE"]).subscribe((res: any) => {
          let header = res.T_ADDDOC;
          this._translate
            .get(["T_SAVESUCCESS"])
            .subscribe((res: any) => {
              let body = res.T_SUCESSDOC;
              this.setAlertMessage(header, body);
            });
          this.loadingDismiss();
          this.router.navigate(["/pagto-antecipado"]);
        });
      });
    } else {
      let values = {
        id: this.item.id,
        idFormaPagamento: this.formaPagamento.filter(
          (filter) => filter.title == this.item.formaPagamento
        )[0].id,
        idEmpresa: this.empresas.filter(
          (filter) => filter.nome == this.item.empresa
        )[0].id,
        title: this.item.title,
        observacoes: this.item.descricao,
        valor : this.item.valor
      };
      this.dataService.updatePagtoAntecipado(values).subscribe((values) => {
        this.isLoading = false;
        this._translate.get(["T_SAVE"]).subscribe((res: any) => {
          let header = res.T_ADDDOC;
          this._translate
            .get(["T_SAVESUCCESS"])
            .subscribe((res: any) => {
              let body = res.T_SUCESSDOC;
              this.setAlertMessage(header, body);
            });
          this.loadingDismiss();
          this.router.navigate(["/pagto-antecipado"]);
        });
      });
    }
  }

  async delItem(confirm) {
    let body;
    let header;
    if (confirm) {
      this.isLoading = true;
      this.dataService.delPagtoAntecipado(this.item.id).subscribe((values) => {
        this._translate
          .get(["T_CONFIRMDELITEM"])
          .subscribe((res: any) => {
            body = res.T_CONFIRMDELITEM;
            this._translate.get(["T_DEL"]).subscribe((res: any) => {
              header = res.T_DEL;
              this.setAlertMessage(header, body);
              this.loadingDismiss();
              this.router.navigate(["/pagto-antecipado"]);
            });
          });
      });
    } else {
      let keys = {
        header: "",
        body: "",
        btConfirm: "",
        btCancel: "",
      };

      this._translate.get(["T_CONFIRMDEL"]).subscribe((res: any) => {
        keys.header = res.T_CONFIRMDEL;
        this._translate
          .get(["T_CONFIRMDELBODY"])
          .subscribe((res: any) => {
            keys.body = res.T_CONFIRMDELBODY;
            this._translate
              .get(["T_CONFIRM"])
              .subscribe((res: any) => {
                keys.btConfirm = res.T_CONFIRM;
                this._translate
                  .get(["T_CANCEL"])
                  .subscribe((res: any) => {
                    keys.btCancel = res.T_CANCEL;
                    this.setConfirmMessage(keys);
                  });
              });
          });
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

  async setAlertMessage(header, body) {
    const alert = await this.alertController.create({
      cssClass: "alertMessage",
      header: header,
      message: body,
      buttons: ["Ok"],
    });
    await alert.present();
  }

  async setConfirmMessage(keys) {
    const alert = await this.alertController.create({
      cssClass: "deleteAlert",
      header: keys.header,
      message: keys.body,
      buttons: [
        {
          text: keys.btCancel,
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: keys.btConfirm,
          handler: () => {
            this.delItem(true);
          },
        },
      ],
    });

    await alert.present();
  }


  getTranslate () {
    this._translate
    .get(["T_VOLTAR"])
    .subscribe((res: any) => {
        this.backButton= res.T_VOLTAR;
    });
  }


  getBackButtonText () {
    return this.backButton
  }
}
