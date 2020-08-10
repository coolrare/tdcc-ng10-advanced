import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  data = {
    email: 'doggy.huang@gmail.com',
    password: '123123',
    rememberMe: true
  };

  constructor() { }

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

  doSubmit(form: NgForm) {
    if (form.valid) {
      // TODO: this.http.post('/save', this.data).subscribe();
      alert('表單送出成功');
    }
    else {
      alert('表單有問題，無法送出');
    }
  }

}
