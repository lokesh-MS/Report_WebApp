import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-saved-message',
  templateUrl: './saved-message.component.html',
  styleUrls: ['./saved-message.component.css']
})
export class SavedMessageComponent implements OnInit {

  constructor(private service:DbserviceService,private router:Router,private storage:StorageService) { }
   StaredArr = new Array<number>(); // Creates an array with a length of 5
responcessdata:any;
userName:any;
  ngOnInit(): void {
    this.service.GetAllRecordServices().subscribe({
      next:(res)=>{
        this.responcessdata=res
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  this.userName=  this.storage.GetUser()
  }
  viewMessage(Inx:any){
    this.service.Store_Id_Service(Inx);
this.router.navigate(['/admin/MsgView'])
  }
}
