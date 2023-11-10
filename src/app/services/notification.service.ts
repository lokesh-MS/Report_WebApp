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
showSuccess() {
  this.toastr.success('Login Successful', 'Login',{
    progressBar:true,
    timeOut:3000,
  });
}
showError(err:any) {
  this.toastr.error('Login Failed', err,{
    progressBar:true,
    timeOut:3000,
  });
  
}
 
    showInfo(){
    this.toastr.info('everything is broken', 'Major Error', {
   timeOut: 3000,
 });
   }
    showWarning(){
    this.toastr.warning('everything is broken', 'Major Error', {
   timeOut: 3000,
 });
   }
}
