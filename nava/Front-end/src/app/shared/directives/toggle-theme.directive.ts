import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleTheme]'
})
export class ToggleThemeDirective {
  private body:HTMLBodyElement | any = document.querySelector('body');
  constructor() { }

  @HostListener('click') toggleTheme(){
    
    if (this.body != !this.body) {
      this.body.classList.toggle('dark-theme');
      this.body.classList.toggle('dark-menu');
      this.body.classList.toggle('header-dark');
   
      this.body.classList.remove('color-menu');
      this.body.classList.remove('light-menu');
      this.body.classList.remove('header-light');
      this.body.classList.remove('color-header');
    }
  }
}
