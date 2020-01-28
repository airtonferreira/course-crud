import { AlertModalComponent } from './../shared/alert-modal/alert-modal.component';

import { CoursesService } from './../courses.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../course';
import { Observable, Subject, empty, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from '../shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  //bsModalRef: BsModalRef;

  deleteModalRef: BsModalRef;

  @ViewChild('deleteModal', {static: true}) deleteModal;

  courses$: Observable<Course[]>; //Melhor maneira de fazer um Observable, para usar pipe async...
  error$ = new Subject<boolean>();

  courseSelected: Course;

  //É important fazer o unsubscribe para evitar problemas de memória na aplicação. Pipe async evita isso.

  constructor(private serviceCourse: CoursesService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    //this.serviceCourse.list().subscribe( data => this.courses = data);

    this.courses$ = this.serviceCourse.list().pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        return Observable.throw(error);
      })
    );

    this.onRefresh();
  }

  onRefresh() {
    this.courses$ = this.serviceCourse.list().pipe(
      catchError(
        error => {
          this.handleError();
          return empty();
        }
      )
    )
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos.');
    //this.bsModalRef = this.modalService.show(AlertModalComponent);
    //this.bsModalRef.content.type = 'danger';
    //this.bsModalRef.content.message = 'Erro ao carregar cursos.';
  }

  onEdit(id) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }

  onDelete(course) {
    this.courseSelected = course;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja excluir este curso?');
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.serviceCourse.remove(course.id) : EMPTY)
    ).subscribe(
      success => {
        this.onRefresh();
        this.alertService.showAlertSuccess('Curso excluido com sucesso!');
      },
      error => {
        this.alertService.showAlertDanger('Erro ao excluir curso.');
      } 
    );
  }

  onConfirmDelete() {
    this.serviceCourse.remove(this.courseSelected.id).subscribe(
      success => {
        this.onRefresh();
        this.alertService.showAlertSuccess('Curso excluido com sucesso!');
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao excluir curso.')
        this.deleteModalRef.hide();
      } 
    );

    
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
