import { Component, OnInit } from "@angular/core";
import { DataService } from "../../service/dataService.service";
import { Orcamento } from "../../objects/orcamento";
import { Router, NavigationExtras } from "@angular/router";

import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-item",
  templateUrl: "./orcamentos.page.html",
  styleUrls: ["./orcamentos.page.scss"],
})
export class OrcamentoPage implements OnInit {
  data: Orcamento[];
  backButton: void;
  constructor(private dataService: DataService, private route: Router, 
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
    this.dataService.getOrcamento().subscribe((values: any) => {
      this.data = values;
      for (let n in this.data) {
        this.data[n].valor = parseFloat(this.data[n].valor).toFixed(2);
      }
      this.data = this.data.filter((value) => value.idUser == 7 || value.idUser == 1);
    });
  }

  addNew() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        new: true,
      },
    };
    this.route.navigate(["/orcamentos/list"], navigationExtras);
  }

  details(value) {
    console.log(value);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        values: JSON.stringify(value),
        new: false,
      },
    };
    this.route.navigate(["/orcamentos/list"], navigationExtras);
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
