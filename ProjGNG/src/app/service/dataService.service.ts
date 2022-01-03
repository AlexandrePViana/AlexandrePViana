import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Grupo } from '../objects/grupo';
import { User } from '../auth/user';
import { Empresa } from '../objects/empresa';
import { Categoria } from '../objects/categoria';
import { Orcamento } from '../objects/orcamento';
import { FormaPagamento } from '../objects/formaPagamento';
import { FormaReembolso } from '../objects/formaReembolso';
import { PagtoAntecipado } from '../objects/pagtoAntecipado';
import { Ccusto } from '../objects/ccusto';
import * as moment from 'moment';
import { forkJoin } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //apiUrl: string = 'https://192.168.1.79:44331/api/';
  apiUrl: string = 'https://localhost:44325/api/';
  apiImageUrl: string = 'http://localhost:50473/';
  idUser: number = 1;
  userName: string = 'appMobileTeste';
  constructor(private http: HttpClient
    ) { }

  getGrupo (): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.apiUrl + 'grupo')
      
  }
 getEmpresa ():Observable<Empresa[]>{
  return this.http.get<Empresa[]>(this.apiUrl + 'empresa')

 }
  getCategoria (): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl + 'subCategoria')
      .pipe(
        tap(_ => this.log('obter categorias')),
        catchError(this.handleError.bind(this))
      );
  }

  getOrcamento (): Observable<Orcamento[]> {
    return this.http.get<Orcamento[]>(this.apiUrl + 'orcamento')
      .pipe(
        tap(_ => this.log('obter orcamentos')),
        catchError(this.handleError.bind(this))
      );
  }

  getFormaPagamento (): Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(this.apiUrl + 'formaPagamento')
      .pipe(
        tap(_ => this.log('obter formas de pagamento')),
        catchError(this.handleError.bind(this))
      );
  }

  getFormaPagamentoUser (): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'user/7')
      .pipe(
        tap(_ => this.log('obter formas de pagamento utilizador')),
        catchError(this.handleError.bind(this))
      );
  }

  getFormaReembolso (): Observable<FormaReembolso[]> {
    return this.http.get<FormaReembolso[]>(this.apiUrl + 'formaReembolso')
      .pipe(
        tap(_ => this.log('obter formas de reembolso')),
        catchError(this.handleError.bind(this))
      );
  }

  getPagtoAntecipado (): Observable<PagtoAntecipado[]> {
    return this.http.get<PagtoAntecipado[]>(this.apiUrl + 'pagtoAntecipado')
      .pipe(
        tap(_ => this.log('obter pagamentos antecipados')),
        catchError(this.handleError.bind(this))
      );
  }

  getCcusto (): Observable<Ccusto[]> {
    return this.http.get<Ccusto[]>(this.apiUrl + 'ccusto')
      .pipe(
        tap(_ => this.log('obter centro custo')),
        catchError(this.handleError.bind(this))
      );
  }
  // getCcustoUsers (): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl + 'ccustoUser')
  //     .pipe(
  //       tap(_ => this.log('obter centro custo users')),
  //       catchError(this.handleError.bind(this))
  //     );
  // }

  saveCC (info, idDoc, idGrupo) : Observable<any[]> {
    let responses = [];
          for (let n in info) {
            responses.push(this.http.post(this.apiUrl + 'docCCusto', {
              'idGrupo': idGrupo,
              'idCCusto': info[n].id,
              'idDoc': idDoc,
              'peso': info[n].peso,
              'created': moment.utc().toISOString(),
              'createdBy': this.userName
            }))
          }
          return forkJoin(responses);
  }

  // saveBatch (info): Observable<any[]> {
  //   return this.http.post<any[]>(this.apiUrl + 'batchDoc', info) 
  //   .pipe(
  //     catchError(this.handleError.bind(this))
  //   );
    
  // }

  saveDocument (images, info, idBatch): Observable<any[]> {
    
    let responses = [];
    for (let n in images) {
      responses.push(this.http.post(this.apiUrl + 'documento', 
      {
        'idGrupo': info.idGrupo[0].id,
        'idUser': this.idUser,
        'idFormaPag': info.idFormaPag[0].id,
        'idSubCategoria': info.idSubCategoria[0].id,
        'idFormaReemb': info.idFormaReemb[0].id,
        'idBatch': idBatch,
        'idOrcamento': info.idOrcamento[0].id,
        'idPagtoAntecipado': info.idPagtoAntecipado[0].id,
        'title': info.title,
        'data': info.data,
        'file': images[n],
        'created': moment.utc().toISOString(),
        'createdBy': this.userName
      }
      ))
    }
    return forkJoin(responses);
  }
  saveDocumentNoImage (info, idBatch): Observable<any[]> {
    
    let responses = [];
      responses.push(this.http.post(this.apiUrl + 'documento', 
      {
        'idGrupo': info.idGrupo[0].id,
        'idUser': this.idUser,
        'idFormaPag': info.idFormaPag[0].id,
        'idSubCategoria': info.idSubCategoria[0].id,
        'idFormaReemb': info.idFormaReemb[0].id,
        'idBatch': idBatch,
        'idOrcamento': info.idOrcamento[0].id,
        'idPagtoAntecipado': info.idPagtoAntecipado[0].id,
        'title': info.title,
        'data': info.data,
        'created': moment.utc().toISOString(),
        'createdBy': 'O Unico Maravilhoso Alex'
      }
      ))
    return forkJoin(responses);
  }


  addOrcamento (item){
      return this.http.post(this.apiUrl + 'orcamento', 
      {
        'title': item.title,
        'idEmpresa': item.idempresa,
        'descricao' : item.desc,
        'idUser':  this.idUser,
        'valor': parseFloat(item.valor).toFixed(2),
        'estado': 'T_AGRDAPROV',
        'created': moment.utc().toISOString(),
        'createdBy': this.userName
      });
  }

  updateOrcamento (values){
    return this.http.put(this.apiUrl + 'orcamento/' + values.id, 
      {
        'id':values.id,
        'title': values.title,
        'descricao': values.desc,
        'idEmpresa' : values.idempresa,
        'idUser':  this.idUser,
        'valor': parseFloat(values.valor).toFixed(2),
        'estado': 'T_AGRDAPROV',
        'modified': moment.utc().toISOString(),
        'modifiedBy': this.userName
      });
  }

  delOrcamento (id) {
    return this.http.delete(this.apiUrl + 'orcamento/' + id);
  }

  addPagtoAntecipado (item){
    return this.http.post(this.apiUrl + 'pagtoAntecipado', 
    {
      'valor' : item.valor,
      'title': item.title,
      'idFormaPagamento': item.idFormaPagamento,
      'idEmpresa': item.idEmpresa,
      'idUser':  this.idUser,
      'descricao': item.observacoes,
      'estado': 'T_AGRDAPROV',
      'created': moment.utc().toISOString(),
      'createdBy': this.userName
    });
}
  updatePagtoAntecipado (values){
    return this.http.put(this.apiUrl + 'pagtoAntecipado/' + values.id, 
      {
        'id':values.id,
        'valor' : values.valor,
        'title': values.title,
        'idFormaPagamento': values.idFormaPagamento,
        'idEmpresa': values.idEmpresa,
        'idUser':  this.idUser,
        'descricao': values.observacoes,
        'estado': 'T_AGRDAPROV',
        'modified': moment.utc().toISOString(),
        'modifiedBy': this.userName
      });
  }


  delPagtoAntecipado (id) {
    return this.http.delete(this.apiUrl + 'pagtoAntecipado/' + id);
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log("ERROR: " + errorMessage);
    return throwError(errorMessage);
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

authImageAPI (): Observable<any[]> {
  console.log("Try token in OCR");
  return this.http.get<any[]>(this.apiImageUrl + 'login', {
    headers: {
      'Authorization': 'Basic ' + btoa('Marco@bwd-it.com:12345'),
      'Image-Transformation': 'true'
    }   
  })
    .pipe(
      tap(_ => this.log('token OCR obtido')),
      catchError(this.handleError.bind(this))
    );
}

processImageAPI (token, source): Observable<any[]> {
  return this.http.post<any[]>(this.apiImageUrl + 'image',{
    image: source
  }, {
    headers: {
      'enctype': 'multipart/form-data;',
      'Content-Type': 'application/json',
      'Accept': 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-CSRF-Token',
      
      //'Authorization': 'Bearer ' + token,
     // 'Image-Transformation': 'true',
    },
  })
    .pipe(
      tap(_ => this.log('obter categorias')),
      catchError(this.handleError.bind(this))
    );
}

}
