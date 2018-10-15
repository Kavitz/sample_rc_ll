import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'v1830-footer',
	template: `<div class="n-footer">
  				<div class="n-footer-right">
      				<div class="n-footer-copyright">
          				© {{currentyear}} Nokia. All rights reserved.
      				</div>
  				</div>
			</div>`,
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	private currentyear = new Date().getFullYear();
	constructor() { }

	ngOnInit() {
	}
}
