import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTransaction'
})
export class FilterTransactionPipe implements PipeTransform {

  transform(transactionArray:any[], searchkey:string,property:string): any[] {


    const result:any=[]

    if (!transactionArray|| searchkey=="" || property=="") {

      return transactionArray
      
    }


    transactionArray.forEach((item:any)=>{

if (item[property].trim().toLowerCase().includes(searchkey.trim().toLowerCase())) {

  result.push(item)
  
}

    })

    return result;

  }

}
