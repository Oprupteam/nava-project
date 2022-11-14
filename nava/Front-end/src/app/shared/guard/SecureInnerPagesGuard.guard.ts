import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SecureInnerPagesGuard {
    
    constructor( public cookieService: CookieService,
        private router: Router) { }

}