import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Advance } from '../advance';
import { AdvanceService } from '../advance.service';

@Component({
  selector: 'app-approve-advance',
  templateUrl: './approve-advance.component.html',
  styleUrls: ['./approve-advance.component.scss']
})
export class ApproveAdvanceComponent implements OnInit {
  advanceId:any;
  advance:any;


  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private advanceService: AdvanceService,
    private translate: TranslateService
  ) {

    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang')  || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
   }

  ngOnInit() {
    this.getAdvance();
  }

  public getAdvance(){
    this.advanceId = this.activateRoute.snapshot.params['id'];
    this.advanceService.getAdvanceById(this.advanceId).subscribe(data => {

      this.advance = data;
    }, error => console.log(error));
  }

  public onApprove(advance: Advance){
    this.advanceService.approveAdvance(advance).subscribe( data => {

      Swal.fire(this.translate.instant('success'), this.translate.instant('Approved'), 'success')
     // this.getAdvance();
      // this.goAdvances();
    },
    (error: HttpErrorResponse) =>{
      alert(error.message);
      Swal.fire(this.translate.instant('Error'), this.translate.instant('Error'), 'error')
    }
    );
  }

  // goAdvances(){
  //   this.router.navigate(['/operation/advances/advance-print']);
  // }


}
