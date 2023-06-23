import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  transferSuccessMsg:string=""
  
  transferFailMsg:string=""
  balance: number = 0
  title = 'bank';
  user: string = ''
  showOffcanvas: boolean = true
  isCollapse: boolean = true
  handleTransfer:boolean = true
 

  //transfer form

  transferForm = this.fb.group({

    creditAcno: ["", [Validators.required, Validators.pattern("[0-9]*")]],
    creditAmount: ["", [Validators.required, Validators.pattern("[0-9]*")]],
    profilePswd: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]
  })


  constructor(private api: ApiService, private toster: ToasterService, private fb: FormBuilder, private dashboardRouter:Router) { }

  ngOnInit(): void {

    this.user = localStorage.getItem('loginUsername') || ""
  }

  collapse() {

    this.isCollapse = !this.isCollapse
  }

  getBalance() {


    let acno = localStorage.getItem("loginAcno")
    this.api.balanceEnquiry(acno).subscribe({

      next: (res: any) => {

        console.log(res);
        this.balance = res

      },
      error: (err: any) => {
        this.showOffcanvas = false

        console.log(err.error);
        this.toster.showError(err.error, 'Fail')


      }

    })

  }

  transfer() {


    if (this.transferForm.valid) {

      // get input values from form
      let creditAcno = this.transferForm.value.creditAcno
      let creditAmount = this.transferForm.value.creditAmount
      let profilePswd = this.transferForm.value.profilePswd

      //make call to service 

      this.api.fundTransfer(creditAcno,creditAmount,profilePswd).subscribe({

        next:(res:any)=>{
          console.log(res);
          this.transferSuccessMsg=res
          this.handleTransfer=true
          setTimeout(() => {
            this.transferSuccessMsg=""
           
            this.transferForm.reset()
            
          }, 5000);
       
        },
        
        error:(err:any)=>{

console.log(err.error);
this.transferFailMsg=err.error
this.handleTransfer=true
setTimeout(() => {
  this.transferFailMsg=""
 
  this.transferForm.reset()
  
}, 5000);


        }
      })


    }
    else {

      this.toster.showWarning("Invalid Form", "Warning")

    }
  }

  
cancelTransfer(){

  this.transferForm.reset()
  this.transferSuccessMsg=""
  this.transferFailMsg=""



}


deleteMyAcno(){

  //make call to service 

  this.api.deleteAcno().subscribe({

    next :(res:any)=>{

      console.log(res);

      //remove login data from local storage
      localStorage.removeItem("loginAcno")
      localStorage.removeItem("loginUsername")
      localStorage.removeItem("token")

    //alert res

    this.toster.showWarning(res,"Warning")
    setTimeout(() => {

      this.dashboardRouter.navigateByUrl('')
      
    }, 2000);


      
    },
    error: (err:any)=>{

console.log(err);


    }
  })



}



logout(){

  localStorage.removeItem("loginAcno")
  localStorage.removeItem("loginUsername")
  localStorage.removeItem("token")

  setTimeout(() => {


    this.dashboardRouter.navigateByUrl('')
    
  }, 1000);




}


}








