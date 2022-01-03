import { Component, OnInit } from "@angular/core";
import { DataService } from "../../service/dataService.service";
import { PagtoAntecipado } from "../../objects/pagtoAntecipado";
import { Router, NavigationExtras } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-pagto-antecipado",
  templateUrl: "./pagto-antecipado.page.html",
  styleUrls: ["./pagto-antecipado.page.scss"],
})
export class PagtoAntecipadoPage implements OnInit {
  data: PagtoAntecipado[];
  backButton: void;
  constructor(
    private dataService: DataService,
    private route: Router,
    private _translate: TranslateService
  ) {}

  ngOnInit() {
    this.setData();
    this.getTranslate();
  }

  ionViewWillEnter() {
    this.setData();
  }

  async setData() {
    this.dataService.getPagtoAntecipado().subscribe((values: any) => {
      this.data = values;
      this.data = this.data.filter((value) => value.idUser == 7 || value.idUser == 1); //MUDAR PARA ID UTILIZADOR LOGGADO
    });
  }

  addNew() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        new: true,
      },
    };
    this.route.navigate(["/pagto-antecipado/list"], navigationExtras);
  }

  details(value) {
    console.log(JSON.stringify(value));
    let navigationExtras: NavigationExtras = {
      queryParams: {
        values: JSON.stringify(value),
        new: false,
      },
    };
    this.route.navigate(["/pagto-antecipado/list"], navigationExtras);
  }
  getTranslate() {
    this._translate.get(["T_VOLTAR"]).subscribe((res: any) => {
      this.backButton = res.T_VOLTAR;
    });
  }

  getBackButtonText() {
    return "Voltar";
  }
}
