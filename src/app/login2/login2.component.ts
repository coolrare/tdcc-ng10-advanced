import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit, OnDestroy {

  form: FormGroup;

  data = {
    email: 'doggy.huang@gmail.com',
    password: '123123',
    rememberMe: true
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';

    // this.form = this.fb.group({
    //   email: 'doggy.huang@gmail.com',
    //   password: '123123',
    //   rememberMe: true
    // });

    // this.form = this.fb.group({
    //   email: ['doggy.huang@gmail.com', [Validators.required, Validators.email]],
    //   password: ['123123', [Validators.required, Validators.minLength(3)]],
    //   rememberMe: true
    // });

    this.form = this.fb.group({
      email: this.fb.control('doggy.huang@gmail.com', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }),

      pwds: this.fb.array([
        this.fb.group({
          password: this.fb.control('123123', {
            validators: [Validators.required, Validators.minLength(3)]
          }),
          rememberMe: true
        }),
        this.fb.group({
          password: this.fb.control('123', {
            validators: [Validators.required, Validators.minLength(3)]
          }),
          rememberMe: false
        })
      ])


    });
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

  fa(name: string) {
    return this.form.get(name) as FormArray;
  }

}
