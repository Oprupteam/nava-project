import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SwitcherService } from 'src/app/shared/services/switcher.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent {

  layoutSub!: Subscription;
  sidenavtoggled1: any;
  //dash='finance'
 dash='hr'
  constructor(
    private SwitcherService : SwitcherService,
    public router: Router
    ) { }


    toggleSwitcherBody() {
    this.SwitcherService.emitChange(false);
  }

  ngOnDestroy() {
    location.reload();
  }
}
