import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr'
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( public toastr: ToastrService) { }
//   showSuccess(){
//     this.toastr.success('everything is broken', 'Major Error', {
//    timeOut: 3000,
//  });
//    }
showSuccess(mes:any,header:any) {
  this.toastr.success(mes, header,{
    progressBar:true,
    timeOut:3000,
  });
}
showError(mes:any,err:any) {
  this.toastr.error(mes, err,{
    progressBar:true,
    timeOut:3000,
  });
  
}
 
    showInfo(mes:any,heading:any){
    this.toastr.info(mes, heading, {
   timeOut: 5000,
 });
   }
    showWarning(mes:any){
    this.toastr.warning(mes, 'Login', {
   timeOut: 3000,
 });
   }
}
