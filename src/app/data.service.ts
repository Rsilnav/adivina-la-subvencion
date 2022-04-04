import { Injectable } from '@angular/core';
import *  as  data from '../assets/output.json';
import { Subvencion } from './subvencion';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor() {
  }

  getTestData(): Subvencion[] {
    return [
      {
        c: 'Convocatoria1',
        b: 'Beneficiario1',
        p: 1,
      },
      {
        c: 'Convocatoria2',
        b: 'Beneficiario2',
        p: 2,
      },
      {
        c: 'Convocatoria3',
        b: 'Beneficiario3',
        p: 3,
      },
      {
        c: 'Convocatoria4',
        b: 'Beneficiario4',
        p: 4,
      },
      {
        c: 'Convocatoria5',
        b: 'Beneficiario5',
        p: 5,
      },
    ];
  }

  getRealData(): Subvencion[] {
    const castedData = (data as Subvencion[])
    const size = castedData.length;
    const randomEntries = []
    for (let i = 0; i < 5; i++) {
      randomEntries.push(castedData[Math.floor(Math.random() * size)])
    }
    return randomEntries;
  }
}


