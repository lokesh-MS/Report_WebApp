import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-msg-view',
  templateUrl: './msg-view.component.html',
  styleUrls: ['./msg-view.component.css']
})
export class MsgViewComponent implements OnInit,OnDestroy {

  constructor(private service:DbserviceService,private storage:StorageService,private fb :FormBuilder) { }
  sigleDataArr = new Array<any>(); // Creates an array with a length of 5
  FileErrMess:any;
  fileDownloadGroup!:FormGroup;
  ngOnInit(): void {
this.fileDownloadGroup = this.fb.group({
  filename:["",Validators.required],
})
   const id= this.service.Get_Id();
   this.service.GetSingleRecordService(id).subscribe({
    next:(res)=>{ 
      this.sigleDataArr.push(res)
console.log(res);

    },
    error:(err)=>{
      console.log(err);
    }
   })
  }
  ngOnDestroy() {
    // Perform cleanup tasks here, e.g., unsubscribe from observables
  }
  downloadFile(filename:any){
   debugger
  
  this.service.downloadFile(filename).subscribe((data: Blob) => {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  });
  }

}
