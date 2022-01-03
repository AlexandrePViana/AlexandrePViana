import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthModule } from "./auth/auth.module";

import { DataService } from "./service/dataService.service";
//import { TokenInterceptor } from "./interceptors/HttpInterceptor.interceptor";

import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { CustomTranslateLoader } from "./interceptors/CustomTranslateLoader"




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },
    Globalization,
    

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
