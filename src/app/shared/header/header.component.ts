import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'v1830-header',
  template: `<header class="main-header clearfix">
  <h1 class="header-logo nomar pull-left">
      <img src="../../../assets/img/nokia-logo-white-2x.png">
  </h1>
  <h3 class="header-caption nomar pull-left whitec">Virtual 1830 - Master UI</h3>
  </header>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
