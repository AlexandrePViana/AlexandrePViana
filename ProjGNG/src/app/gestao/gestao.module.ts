import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gestaoPage } from './gestao.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { gestaoPageRoutingModule } from './gestao-routing.module';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { CustomTranslateLoader } from "../interceptors/CustomTranslateLoader";
import { HttpClient } from "@angular/common/http";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    gestaoPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [gestaoPage]
})
export class gestaoPageModule {}
