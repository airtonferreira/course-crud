import { Course } from './course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'http://localhost:3000/cursos';

  courses: Course[];

  constructor(private http: HttpClient) { }


  list() {
    return this.http.get<Course[]>(this.API).pipe(
      tap()
    );
  }

  // O tap é uma maneira de debugar. Vc pode usar o console.log dentro, para visualizar o retorno dos dados no console.

}
