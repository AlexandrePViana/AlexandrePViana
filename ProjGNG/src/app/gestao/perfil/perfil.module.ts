import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { CustomTranslateLoader } from "../../interceptors/CustomTranslateLoader";
import { HttpClient } from "@angular/common/http";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
