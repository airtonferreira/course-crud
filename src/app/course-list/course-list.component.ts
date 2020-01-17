import { CoursesService } from './../courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  //courses: Course[];

  courses$: Observable<Course[]>; //Melhor maneira de fazer um Observable, para usar pipe async...
  error$ = new Subject<boolean>();

  //É important fazer o unsubscribe para evitar problemas de memória na aplicação. Pipe async evita isso.

  constructor(private serviceCourse: CoursesService) { }

  ngOnInit() {
    //this.serviceCourse.list().subscribe( data => this.courses = data);

    this.courses$ = this.serviceCourse.list().pipe(
      catchError( error => {
        this.error$.next(true);
      })
    );
  }

}
