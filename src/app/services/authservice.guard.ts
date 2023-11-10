import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DbserviceService } from './dbservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceGuard implements CanActivate {
  constructor(private service:DbserviceService , private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token=this.service.GetToken()
    if(token){
      return true
      }
      else{
        this.router.navigate(['login'])
        return false
      }

  }
  
}
