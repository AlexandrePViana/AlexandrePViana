import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagtoAntecipadoPageRoutingModule } from './pagto-antecipado-routing.module';

import { PagtoAntecipadoPage } from './pagto-antecipado.page';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { CustomTranslateLoader } from "../../interceptors/CustomTranslateLoader";
import { HttpClient } from "@angular/common/http";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagtoAntecipadoPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [PagtoAntecipadoPage]
})
export class PagtoAntecipadoPageModule {}
