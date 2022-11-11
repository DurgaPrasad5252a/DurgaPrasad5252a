import { SelectorMatcher } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Details } from '../details';
import { StdLogService } from '../ser/std-log.service';

@Component({
  selector: 'app-std-login',
  templateUrl: './std-login.component.html',
  styleUrls: ['./std-login.component.css'],
})
export class StdLoginComponent implements OnInit {
  details: Details[] = [];
  FullName: any;
  p: number = 1;
  constructor(private ss: StdLogService) {}

  ngOnInit(): void {
    this.ss.getDetails().subscribe((response) => {
      this.details = response;
    });
  }
  Search() {
    if (this.FullName == '') {
      this.ngOnInit();
    } else {
      this.details = this.details.filter((res) => {
        return res.FullName.toLocaleLowerCase().match(
          this.FullName.toLocaleLowerCase()
        );
      });
    }
  }
}
