import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaDTO } from '../../models/categoria.dto';
import { tap, delay, take } from 'rxjs/operators';

@Injectable()
export class CategoriaService {

    private readonly API = `${API_CONFIG.baseUrl}`;

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<CategoriaDTO[]>  {
        return this.http.get<CategoriaDTO[]>(`${this.API}/categorias`);
    }
    // loadByID(id) {
    //     return this.http.get<CategoriaDTO>(`${this.API}/categorias/${id}`).pipe(take(1));
    //   }

    //   private create(categoria) {
    //     return this.http.post(this.API, categoria).pipe(take(1));
    //   }
    
    //   private update(categoria) {
    //     return this.http.put(`${this.API}/${categoria.id}`, categoria).pipe(take(1));
    //   }
    
    //   save(categoria) {
    //     if (categoria.id) {
    //       return this.update(categoria);
    //     }
    //     return this.create(categoria);
    //   }
    
    //   remove(id) {
    //     return this.http.delete(`${this.API}/${id}`).pipe(take(1));
    //   }
     
}