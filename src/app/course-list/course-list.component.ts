import { CoursesService } from './../courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[];

  constructor(private serviceCourse: CoursesService) { }

  ngOnInit() {
    this.serviceCourse.list().subscribe( data => this.courses = data);
  }

}
