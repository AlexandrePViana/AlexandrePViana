import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  backButton: void;
  constructor(
    private _translate: TranslateService
  ) { }

  ngOnInit() {
    this.setData();
    this.getTranslate();
  }


  setData (){

  }

  getTranslate() {
    this._translate.get(["T_VOLTAR"]).subscribe((res: any) => {
      this.backButton = res.T_VOLTAR;
    });
  }

  getBackButtonText() {
    return this.backButton;
  }
}
