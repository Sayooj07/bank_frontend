import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  //loading spinner

  isLoading :boolean=false

  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

 
  })


constructor( private fb:FormBuilder,private  api: ApiService,private toster:ToasterService,private loginRouter: Router){}


login(){
  if(this.loginForm.valid){
   //  get inputs
   let acno = this.loginForm.value.acno
   let pswd = this.loginForm.value.password

//set isloading true

this.isLoading=true

   // register api call in service

   this.api.login(acno,pswd).subscribe({

    next:(res:any)=>{
//destructure response to preuserr and token

const{preuser,token}= res
      //save username in local storage

      localStorage.setItem("loginUsername",preuser.username)

      localStorage.setItem("loginAcno",preuser.acno)

    //store token in local storage
    localStorage.setItem("token",token)


      setTimeout(() => {


        //set isloading  to false
this.isLoading=false


        this.toster.showSuccess(`Welcome ${preuser.username} `, 'Success')  

        this.loginRouter.navigateByUrl('user/dashboard')
        
      }, 2000);
    },


    

    error:(err:any)=>{
      console.log(err.error);
      this.toster.showError(`${err.error}`, 'Fail')      
  
    
    }
   })
   

  }
  else{
    this.toster.showWarning("  Invalid Form", 'Warning')      

}
}


}
