import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { Router } from "@angular/router";
import { DataService } from "../service/dataService.service";

@Component({
  selector: "app-gestao",
  templateUrl: "gestao.page.html",
  styleUrls: ["gestao.page.scss"],
})
export class gestaoPage implements OnInit {
  constructor(private route: Router, private dataService: DataService) {}

  details(n) {
    switch (n) {
      case 0:
        this.route.navigate(["/orcamentos"]);
        break;

      case 1:
        this.route.navigate(["/pagto-antecipado"]);
        break;

      case 2:
        this.route.navigate(["/perfil"]);
        break;
    }
  }
  ngOnInit() {

  }
  ionViewWillEnter() {

  }
 
}
