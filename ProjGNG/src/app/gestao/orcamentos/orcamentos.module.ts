import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrcamentoPageRoutingModule } from './orcamentos-routing.module';
import {DecimalPipe} from '@angular/common';

import { OrcamentoPage } from './orcamentos.page';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { CustomTranslateLoader } from "../../interceptors/CustomTranslateLoader";
import { HttpClient } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrcamentoPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [OrcamentoPage],
  providers: [DecimalPipe],
})
export class OrcamentoPageModule {}
