import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from "../service/dataService.service";
import { NavController, NavParams } from "@ionic/angular";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private route: Router, private dataService: DataService) {}


  ngOnInit() {
  }
  navO(i : number){
    switch (i) {
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
  // {
  //   
  }

