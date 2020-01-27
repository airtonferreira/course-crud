import { AlertModalService } from "./../shared/alert-modal.service";
import { CoursesService } from "./../courses.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.css"]
})
export class CourseFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CoursesService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.params.pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.service.loadById(id))
    // ).subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const course$ = this.service.loadById(id);
    //     course$.subscribe(course => {
    //       this.updateForm(course);
    //     });
    //   }
    // );

    const course = this.route.snapshot.data["course"];

    this.form = this.fb.group({
      id: [course.id],
      name: [
        course.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      ]
    });
  }

  // updateForm(course) {
  //   this.form.patchValue({
  //     id: course.id,
  //     name: course.name
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {


      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente.';
      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar o curso {{course.name}}, tente novamente.';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => {
          this.modal.showAlertDanger(msgError);
        }
      );

      // if (this.form.value.id) {
      //   this.service.update(this.form.value).subscribe(
      //     success => {
      //       console.log(this.form.value);
      //       this.modal.showAlertSuccess("Curso ATUALIZADO com sucesso!");
      //       this.location.back();
      //     },
      //     error =>
      //       this.modal.showAlertDanger(
      //         "Erro ao ATUALIZAR curso, tente novamente."
      //       )
      //   );
      // } else {
      //   this.service.create(this.form.value).subscribe(
      //     success => {
      //       console.log(this.form.value);
      //       this.modal.showAlertSuccess("Curso criado com sucesso!");
      //       this.location.back();
      //     },
      //     error =>
      //       this.modal.showAlertDanger("Erro ao criar curso, tente novamente.")
      //   );
      // }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
