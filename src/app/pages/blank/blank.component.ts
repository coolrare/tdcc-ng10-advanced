import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {

  name = '';
  type = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');

    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
    });

    this.name = this.route.snapshot.queryParamMap.get('name');

    this.route.queryParamMap.subscribe(params => {
      this.name = params.get('name');
    });

  }

}
