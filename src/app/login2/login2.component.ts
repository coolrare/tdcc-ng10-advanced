import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { TwidValidator } from '../twid.directive';

@Component({
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css'],
  providers: [TwidValidator]
})
export class Login2Component implements OnInit, OnDestroy {

  form: FormGroup;

  data = {
    email: 'demo@example.com',
    pwds: [
      {
        password: '1111',
        rememberMe: true
      },
      {
        password: '222',
        rememberMe: false
      },
      {
        password: '222',
        rememberMe: false
      }
    ]
  };

  constructor(private fb: FormBuilder, private twid: TwidValidator) { }

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
      email: this.fb.control('', {
        validators: [
          Validators.required,
          // Validators.email,
          this.twid.validate
        ],
        updateOn: 'blur'
      }),

      pwds: this.fb.array([])
    });

    this.resetForm();
  }

  resetForm() {

    this.fa('pwds').clear();

    const len = this.data.pwds.length;
    for (let index = 0; index < len; index++) {
      this.fa('pwds').push(this.fb.group({
        password: this.fb.control('', {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        rememberMe: true
      }));
    }

    this.form.reset(this.data);
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

  fa(name: string) {
    return this.form.get(name) as FormArray;
  }

  addNewPwd() {
    this.fa('pwds').push(this.fb.group({
      password: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      rememberMe: true
    }));
  }
}

function MyValidator(c: AbstractControl): ValidationErrors {
  if (c.value.indexOf('ABC') >= 0) {
    return { my: true };
  } else {
    return null;
  }
}
