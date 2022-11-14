import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }
  ngOnInit() {
    fromEvent(window, 'load').subscribe(() => document.querySelector('#glb-loader')?.classList.remove('loaderShow'));
  }

}
