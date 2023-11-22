import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DbserviceService } from './dbservice.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceGuard implements CanActivate {
  constructor(private service:DbserviceService , private router:Router,private storage:StorageService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token=this.storage.GetToken()
    if(token){
      return true
      }
      else{
        this.router.navigate(['login'])
        return false
      }

  }
  
}
