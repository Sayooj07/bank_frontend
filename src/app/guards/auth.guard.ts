import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {


constructor(private authService: AuthService, private toster:ToasterService, private router:Router ){}

canActivate:CanActivateFn=()=>{


  if( this.authService.isLoggedIn ()){

    return true




  }

  else{

this.toster.showWarning("Access Denied","Warning")

this.router.navigateByUrl('')

return false
  }


}


  
  
}
