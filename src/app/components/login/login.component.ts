import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private service:DbserviceService ,private router:Router,private notify:NotificationService) { }
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
  }

isLogin:boolean=true;
chaneFun(){
  this.isLogin=!this.isLogin
}
 
loginMethod(){
  this.service.LoginService(this.loginGroup.value).subscribe({
    next:(res:any)=>{
this.service.StoreToken(res.token);
this.service.StoreUser(res.username);
this.notify.showSuccess()
this.router.navigate(["/admin"])
    },
    error:(err)=>{
console.log(err.error.message);
this.notify.showError(err.error.message)
    }
  })
}
signUpMethod(){
  
  this.service.SignUpService(this.signUpGroup.value).subscribe({
    
    next:(res)=>{

      this.notify.showSuccess()
this.router.navigate(["/admin"])
console.log(res);

    },
    error:(err)=>{
      this.notify.showError(err.error)
console.log(err.error);

    }
  })
  
}
}
