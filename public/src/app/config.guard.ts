import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
 
@Injectable()
export class ConfigGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private router: Router
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.configService.configLoaded.getValue() == true) {
      return true;
    } else {
      this.router.navigate(['capture']);
      return false;
    }

  }
}
