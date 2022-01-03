import { DecimalPipe } from '@angular/common';

export class Orcamento {
    id: number;
    title: string;
    idEmpresa : number;
    idUser: number;
    valor: string;
    descricao: string;
    estado: string;
    aprovadoPor: string;
    created: Date;
    createdBy: string;
    modified: Date;
    modifiedBy: string;
  }