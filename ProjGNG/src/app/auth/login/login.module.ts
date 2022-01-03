import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { CustomTranslateLoader } from "../../interceptors/CustomTranslateLoader"
import { HttpClient } from "@angular/common/http";
import { MSAdal } from "@ionic-native/ms-adal/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    LoginPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [LoginPage],
  providers: [
    MSAdal
  ]
})
export class LoginPageModule {}
