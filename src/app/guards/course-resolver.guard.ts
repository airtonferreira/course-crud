import { CoursesService } from './../courses.service';
import { Course } from './../course';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseResolverGuard implements Resolve<Course> {

  constructor(
    private service: CoursesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Course | Observable<Course> | Promise<Course> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    return of({
      id: null,
      name: null
    });

  }


}
