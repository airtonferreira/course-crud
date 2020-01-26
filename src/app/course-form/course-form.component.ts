import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });

  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log('Form enviado com sucesso!')
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
 
}
