import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: DbserviceService,private storage:StorageService,private router:Router,private el: ElementRef, private renderer: Renderer2,) { }
  username:any;
RecordDataGroup!:FormGroup;
currentTime :any;
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
      File_Code:[""],
    })
    this.username= this.storage.GetUser();
    console.log(this.username);





  }
  Select_File:any='Select File'
Db_FileName:any;
  sendMessage(){

    this.RecordDataGroup.value.sender_Name=this.username;
    this.RecordDataGroup.value.File=this.Select_File;
    this.RecordDataGroup.value.File_Name=this.Db_FileName;
    this.RecordDataGroup.value.File_Code=this.file_code
    this.currentTime = this.getCurrentTime();
    this.RecordDataGroup.value.Inserted_Time= this.currentTime
    console.log(this.RecordDataGroup.value);
    if(this.RecordDataGroup.value.Receiver_Name==""){
      let rePasswordInput =  this.el.nativeElement.querySelector("#to");
    
      this.renderer.setStyle(rePasswordInput, 'border-color', 'red');
      return
    }
    else if(this.RecordDataGroup.value.Subject==""){
      let rePasswordInput =  this.el.nativeElement.querySelector("#subject");
    
      this.renderer.setStyle(rePasswordInput, 'border-color', 'red');
      return
    }
    else if(this.RecordDataGroup.value.Message==""){
      let rePasswordInput =  this.el.nativeElement.querySelector("#Message");
    
      this.renderer.setStyle(rePasswordInput, 'border-color', 'red');
      return
    }
    this.FileUploadFun()
this.service.InsertRecordServices(this.RecordDataGroup.value).subscribe({
  next:(res)=>{
 
    this.router.navigate(['/admin/home'])
console.log(res);
this.RecordDataGroup.reset();
  },
  error:(err)=>{
console.log(err);

  }
})


// console.log(this.RecordDataGroup.value);

  }
  formData = new FormData();
  fileName:any;
  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        this.Select_File=this.fileName;
        this.Db_FileName= this.fileName;

        this.formData.append("File", file);

      
    }
}
file_ErrMess:any;
file_code:any;
FileUploadFun(){
 
  let FileNameData:any;
  console.log(this.formData.get('File'));
  if(this.formData.get('File')==null){
    this.file_ErrMess='Please select a file';
    return;
  }
    const upload$ = this.service.UploadFile(this.formData).subscribe({
            next:(res)=>{
               console.log(res);
               FileNameData=res
               this.file_code=res
               this.storage.StoreFileName(res)
              
            },
            error:(err)=>{
               console.log(err);
              
            }
          });
         
          this.formData.delete('File');

  this.Select_File='Select File'

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
