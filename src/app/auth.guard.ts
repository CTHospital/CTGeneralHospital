import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userDetails!: User;
  constructor(private router:Router)
  {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

      this.userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
      console.log("PAtient Details from login: ", this.userDetails);
      if(this.userDetails.email != null){
    return true;
      }
      else{
        this.router.navigate(['/'])
        return false;
      }
  }
  
}
