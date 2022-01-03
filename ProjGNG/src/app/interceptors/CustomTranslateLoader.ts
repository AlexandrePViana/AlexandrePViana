import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class CustomTranslateLoader implements TranslateLoader  {
    //api_url: string ="http://192.168.1.79:44331/api/";
    api_url: string ="https://localhost:44399/api/";
    contentHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    constructor(private httpClient: HttpClient) {}
    getTranslation(lang: string): Observable<any> {
        const apiAddress = this.api_url + `com_tranlations?&$filter=language%20eq%20%27${lang}%27`;
        return this.httpClient.get(apiAddress, { headers: this.contentHeader })
          .pipe(
            map((res:any) => {
                let data = res.value;
                let values = {};
                for (let val in data){
                    values[data[val].key] = data[val].value
                }
                return values;
            }),
            catchError(_ => this.httpClient.get(`/assets/i18n/en.json`))
          );
    }
}
