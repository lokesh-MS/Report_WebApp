import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: DbserviceService,private router:Router,private el: ElementRef, private renderer: Renderer2,) { }
  username:any;
RecordDataGroup!:FormGroup;
  ngOnInit(): void {
    this.RecordDataGroup = this.fb.group({
      sender_Name:["",Validators.required],
      Receiver_Name: ["", Validators.required],
      Add_CC:["",Validators.required],
      Subject: ["", Validators.required],
      Message: ["", Validators.required],
      File:[""],
      File_Name:[""],
      Inserted_Time:[""],
    })
    this.username= this.service.GetUser();
    console.log(this.username);




  
// doenload btn Animation Function

let uploadBtn:any = this.el.nativeElement.querySelector('.upload__button');
let upload:any = this.el.nativeElement.querySelector('.upload');
    uploadBtn.addEventListener("click", async () => {
      upload.classList.add("uploading");
      await this.sleep(3000);
      upload.classList.add("uploaded");
      await this.sleep(2000);
      upload.classList.remove("uploading");
      upload.classList.add("uploaded-after");
      await this.sleep(1000);
      upload.className = "upload";
  });
    // doenload btn Animation Function
  }
  Select_File:any='Select File'
Db_FileName:any;
  sendMessage(){
    const currentTime = new Date(); // Create a new Date object with the current date and time
    const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();
const seconds = currentTime.getSeconds();

console.log(`Current time: ${hours}:${minutes}:${seconds}`);
    debugger
    this.RecordDataGroup.value.sender_Name=this.username;
    this.RecordDataGroup.value.File=this.Select_File;
    this.RecordDataGroup.value.File_Name=this.Db_FileName;
    this.RecordDataGroup.value.Inserted_Time= `${hours}:${minutes}`
this.service.InsertRecordServices(this.RecordDataGroup.value).subscribe({
  next:(res)=>{
    // const upload$ = this.service.UploadFile(this.formData);

    // upload$.subscribe(sub=>{
    //   console.log(sub);
      
    // });
    this.router.navigate(['/admin/home'])
console.log(res);
this.RecordDataGroup.reset();
  },
  error:(err)=>{
console.log(err);

  }
})


console.log(this.RecordDataGroup.value);

  }
  formData = new FormData();
  fileName:any;
  onFileSelected(event:any) {
debugger
    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        this.Select_File=this.fileName;
        this.Db_FileName= this.fileName;

        this.formData.append("File", file);

      
    }
}
FileUploadFun(){
  debugger
  let FileNameData:any;
  const upload$ = this.service.UploadFile(this.formData).subscribe({
    next:(res)=>{
       console.log(res);
       FileNameData=res
       this.service.StoreFileName(res)
      // console.log(FileNameData);
      
    },
    error:(err)=>{
       console.log(err);
      
    }
  });
  this.Select_File='Select File'
  // upload$.subscribe(sub=>{
  //   let data:any =sub
  //   console.log(JSON.parse(data));
    
    
  // });
}
// lllll

 uploadBtn:any = this.el.nativeElement.querySelector('.upload__button');
 upload:any = this.el.nativeElement.querySelector('.upload');
 sleep = (time:any) => new Promise(resolve => setTimeout(resolve, time));
}
