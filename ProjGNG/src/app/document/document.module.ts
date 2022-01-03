import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentPage } from './document.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { CustomTranslateLoader } from "../interceptors/CustomTranslateLoader"
import { HttpClient } from "@angular/common/http";

import { DocumentPageRoutingModule } from './document-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DocumentPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [DocumentPage]
})
export class DocumentPageModule {}
