import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //form group

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })
  


  constructor(private fb: FormBuilder, private api: ApiService, private toster  : ToastrService, private JoinRouter: Router ) {


  }

  register() {

    if (this.registerForm.valid) {

      let username = this.registerForm.value.username
      let acno = this.registerForm.value.acno
      let pswd = this.registerForm.value.password

      //register api call in service 

      this.api.register(username, acno, pswd).subscribe({
        next: (response: any) => {

          console.log(response);
          this.toster.success(`${response.username}Register Success`)

          setTimeout(() => {
            this.JoinRouter.navigateByUrl('federalbank/login')
            
          }, 2000);

        },
        error: (err: any) => {
2
          console.log(err);
          this.toster.error(`${err}`,"Register Failed")

        }

      })

    }
    else {
      this.toster.warning('Invalid Form',"Warning")
    }

  }
}


