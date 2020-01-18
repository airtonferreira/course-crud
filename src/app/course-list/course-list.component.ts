import { AlertModalComponent } from './../shared/alert-modal/alert-modal.component';

import { CoursesService } from './../courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  bsModalRef: BsModalRef;

  courses$: Observable<Course[]>; //Melhor maneira de fazer um Observable, para usar pipe async...
  error$ = new Subject<boolean>();

  //É important fazer o unsubscribe para evitar problemas de memória na aplicação. Pipe async evita isso.

  constructor(private serviceCourse: CoursesService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    //this.serviceCourse.list().subscribe( data => this.courses = data);

    this.courses$ = this.serviceCourse.list().pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
      })
    );
  }

  handleError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos.';
  }

}
