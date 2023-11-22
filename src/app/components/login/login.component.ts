import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private el: ElementRef, private renderer: Renderer2, private service:DbserviceService ,private storage:StorageService,private router:Router,private notify:NotificationService) { }
  loginGroup!: FormGroup;
  signUpGroup!:FormGroup;
  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.signUpGroup = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
      Repassword:['', Validators.required]
    })

    // input element referance
   let userNameInput =  this.el.nativeElement.querySelector("#userId");

  }

isLogin:boolean=true;
chaneFun(){
  this.isLogin=!this.isLogin
}
 
loginMethod(){
  
  console.log(this.loginGroup.value);
  if(this.loginGroup.value.username == ""){
   let userNameInput =  this.el.nativeElement.querySelector("#userId");
   
    if (userNameInput) {
      this.renderer.setStyle(userNameInput, 'border-color', 'red');
    }
    this.notify.showWarning("Enter a valid User name!");
    return;
  }
  else if(this.loginGroup.value.password==""){
    let PasswordInput= this.el.nativeElement.querySelector("#pwd");

    if(PasswordInput){
      this.renderer.setStyle(PasswordInput,'border-color','red')
    }
this.notify.showWarning("Enter a valid Password!");
return;
  }
  // else if(this.loginGroup.value.username == "" && this.loginGroup.value.password==""){
  //   this.notify.showWarning("Please Check Input Fields!");
  //   return;
  // }
  this.service.LoginService(this.loginGroup.value).subscribe({
    next:(res:any)=>{
this.storage.StoreToken(res.token);
this.storage.StoreUser(res.username);
this.notify.showSuccess('LoginSuccessfully','Login')
this.router.navigate(["/admin"])
    },
    error:(err)=>{
console.log(err.error.message);
this.notify.showError(err.error.message ,'Login')
    }
  })
}
signUpMethod(){
  let currentTime = this.getCurrentTime();
  // this.signUpGroup.value.signUptime=currentTime.toString()
  this.service.SignUpService(this.signUpGroup.value).subscribe({
    
    next:(res)=>{

      this.notify.showSuccess("SignUp Successfully" ,'SignUp')
// this.router.navigate([""])
this.chaneFun();
console.log(res);

    },
    error:(err)=>{
      let userNameInput =  this.el.nativeElement.querySelector("#user");
      let passwordInput =  this.el.nativeElement.querySelector("#pwd1");
      let rePasswordInput =  this.el.nativeElement.querySelector("#pwd2");
      this.renderer.setStyle(userNameInput, 'border-color', 'red');
      this.renderer.setStyle(passwordInput, 'border-color', 'red');
      this.renderer.setStyle(rePasswordInput, 'border-color', 'red');
      this.notify.showError(err.error,'Login')
console.log(err.error);

    }
  })
  this.signUpGroup.reset();
}

// confirm password checking
passwordCheck(e:any){
console.log(e.target.value);
let psw1 =this.signUpGroup.value.password;
let pws2 =e.target.value
if(psw1!=pws2){
  let rePasswordInput =  this.el.nativeElement.querySelector("#pwd2");

  this.renderer.setStyle(rePasswordInput, 'border-color', 'red');
}
else{
  let rePasswordInput =  this.el.nativeElement.querySelector("#pwd2");

  this.renderer.setStyle(rePasswordInput, 'border-color', 'green');
}


}


//  password type changing function


password: any;
showPassword = false;
showPassword2 =false
togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
  

  
}
togglePasswordVisibility2() {
  this.showPassword2 = !this.showPassword2;
  

  
}


getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes:any = now.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Add leading zero to single-digit minutes
  minutes = minutes < 10 ? '0' + minutes : minutes;

  var timeString = hours + ':' + minutes + ' ' + ampm;
  return timeString;
}



}
