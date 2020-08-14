import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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

    this.form = this.fb.group({
      email: 'doggy.huang@gmail.com',
      password: '123123',
      rememberMe: true
    });
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
