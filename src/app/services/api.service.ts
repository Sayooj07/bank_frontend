import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
base_url= 'https://bank-app-vfcj.onrender.com'
  constructor(private http:HttpClient) {  
  }

  register(username:any,acno:any,password:any){ 

    const body= {

      username,
      acno,
      password

    }
    //to call register api
 return this.http.post(`${this.base_url}/employee/register`,body)
  }

login(acno:any,password:any){

  const body={

    acno,
    password
  }

  //api call

  return this.http.post(`${this.base_url}/employee/login`,body)


}

//adding header to http request

appendToken(){


  const token= localStorage.getItem("token")

  //create http header 
  let headers = new HttpHeaders()

  //append token in headers
if(token){ 
  headers=headers.append("access-token",token)
  options.headers = headers
}
return options
}

balanceEnquiry(acno:any){

 return this.http.get(`${this.base_url}/user/balance/${acno}`,this.appendToken())

}

//fund transfer 

fundTransfer(creditAcno:any,creditAmount:any,pswd:any)

//make an api call
{



  const body={

    creditAcno,
    creditAmount,
    pswd
    
  }

  return this.http.post(`${this.base_url}/user/transfer`,body,this.appendToken())
}



getTransactions(){

  return this.http.get(`${this.base_url}/user/transactions`,this.appendToken())



}

deleteAcno(){

//make an api call
  
 return  this.http.delete(`${this.base_url}/user/delete`,this.appendToken())

}




}






















