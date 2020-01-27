import { CourseResolverGuard } from "./guards/course-resolver.guard";
import { HomeComponent } from "./home/home.component";
import { CourseFormComponent } from "./course-form/course-form.component";
import { CourseListComponent } from "./course-list/course-list.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "courses", component: CourseListComponent },
  {
    path: "new-course",
    component: CourseFormComponent,
    resolve: {
      course: CourseResolverGuard
    }
  },
  {
    path: "courses/edit/:id",
    component: CourseFormComponent,
    resolve: {
      course: CourseResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
