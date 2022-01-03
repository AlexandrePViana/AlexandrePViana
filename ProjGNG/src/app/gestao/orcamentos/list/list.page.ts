import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Orcamento } from "../../../objects/orcamento";
import { Categoria } from "../../../objects/categoria";
import { Ccusto } from "../../../objects/ccusto";
import { Empresa } from "../../../objects/empresa";
import { Grupo } from "../../../objects/grupo";
import { DataService } from "../../../service/dataService.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.page.html",
  styleUrls: ["./list.page.scss"],
})
export class ListPage implements OnInit {
  backButton: void;
  item: {
    idEmpresa : -1;
    empresa : string;
    descricao : string;
    title: "";
    valor: 0;
    estado: "";
    id: -1;
  };
  isLoading = false;
  data: Orcamento[];
  empresas: Empresa[];
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
        this.item.empresa ="";
      } else {
        this.item = {
          idEmpresa: -1,
          empresa : "",
          title: "",
          valor: 0,
          descricao : "",
          estado: "",
          id: -1,
        };
      }
      this.newMode = params.new;
    });
  }

  ngOnInit() {
    this.getData();
    this.getTranslate();
    console.log(this.item.idEmpresa);
  }

  getData(): void {
    this.dataService.getEmpresa().subscribe((values:any) => {
      this.empresas = values;
      this.getInfo();
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
      catch
      {
        this.item.empresa = "NULL";
      }
    }
    else
    {
      try
      {
        this.item.empresa = this.empresas.filter(
          (value) => value.id == this.item.idEmpresa
        )[0].nome;
      }
      catch
      {

      }
      
    }
  }

  saveData() {
    this._translate.get(["T_LOADING"]).subscribe((res: Array<string>) => {
      this.loadingPresent(res);
    });
    if (this.newMode == "true") {
      let values = {
        idempresa: this.empresas.filter(
          (filter) => filter.nome == this.item.empresa
        )[0].id,
        title: this.item.title,
        valor: this.item.valor,
        desc: this.item.descricao
      };
      this.dataService.addOrcamento(values).subscribe((values) => {
        this.isLoading = false;
        this._translate.get(["T_SAVE"]).subscribe((res: any) => {
          let header = res.T_ADDDOC;
          this._translate
            .get(["T_SAVESUCCESS"])
            .subscribe((res: any) => {
              let body = res.T_SUCESSDOC;
              this.setAlertMessage("Sucesso", "O seu orçamento foi inserido com sucesso!");
            });
          this.loadingDismiss();
          this.router.navigate(["/orcamentos"]);
        });
      });
    } else {
      let values = {
        idempresa: this.empresas.filter(
          (filter) => filter.nome == this.item.empresa
        )[0].id,
        id: this.item.id,
        title: this.item.title,
        valor: this.item.valor,
        desc : this.item.descricao
      };
      this.dataService.updateOrcamento(values).subscribe((values) => {
        this.isLoading = false;
        this._translate.get(["T_SAVE"]).subscribe((res: any) => {
          let header = res.T_ADDDOC;
          this._translate
            .get(["T_SAVESUCCESS"])
            .subscribe((res: any) => {
              let body = res.T_SUCESSDOC;
              this.setAlertMessage("Sucesso", "O orçamento foi atualizado com sucesso!");
            });
          this.loadingDismiss();
          this.router.navigate(["/orcamentos"]);
        });
      });
    }
  }
  async delItem(confirm) {
    let body;
    let header;
    if (confirm) {
      this.isLoading = true;
      this.dataService.delOrcamento(this.item.id).subscribe((values:any) => {
        this._translate.get(["T_CONFIRMDELITEM"]).subscribe((res:any) => {
          body = res.T_CONFIRMDELITEM;
          this._translate
            .get(["T_DEL"])
            .subscribe((res: any) => {
              header = res.T_DEL;
              this.setAlertMessage("Sucesso", "O orçamento foi eliminado com sucesso!");
              this.loadingDismiss();
              this.router.navigate(["/orcamentos"]);
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
