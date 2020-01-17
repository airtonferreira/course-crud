import { environment } from './../environments/environment';
import { Course } from './course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = `${environment.API}cursos`; // Fazendo isso, podemos usar uma variável de ambiente criada no environment.ts

  courses: Course[];

  constructor(private http: HttpClient) { }


  list() {
    return this.http.get<Course[]>(this.API).pipe(
      delay(2000),
      tap()
    );
  }

  // O tap é uma maneira de debugar. Vc pode usar o console.log dentro, para visualizar o retorno dos dados no console.

}
