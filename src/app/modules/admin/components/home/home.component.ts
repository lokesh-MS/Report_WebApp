import { Component, ElementRef, OnInit, Renderer2, ViewChild,Input } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:DbserviceService,private notify:NotificationService, private storage:StorageService,private router:Router,private el: ElementRef, private renderer: Renderer2) { }
AllRecordsArr:any=[];
ArrayFormatData = new Array<any>();
userName:any;
String_bool_val:any;
// StarElement = this.el.nativeElement.querySelector('#star');
//  elementr=(<HTMLElement>document.getElementById('star6558a6f7c67a5e2ad9f3a0c3'))
//  sub= (<HTMLElement>document.getElementById('subject'))
@Input() data:any;
  ngOnInit(): void {

 
    this.getAllRecord()
 


   this.userName= this.storage.GetUser()
  this.String_bool_val = this.storage.String_Search_Getbool();
  if(this.String_bool_val==null){
    this.String_bool_val=true
  }
  else{
    this.String_bool_val = this.storage.String_Search_Getbool();
  }
  
  }
  isClassEnabled:any=true

  getAllRecord(){
  this.service.GetAllRecordServices().subscribe({
      next:(res)=>{
        this.AllRecordsArr=res;
        this.ArrayFormatData=this.AllRecordsArr
        this.ArrayFormatData.filter(number => {
         if(number.stared=='Yes') {
          let starId="";
          starId='star'+number.id
         }
        }
        );
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   
  }
  viewMessage(Inx:any){
    this.service.Store_Id_Service(Inx);
    this.service.GetSingleRecordService(Inx).subscribe({
next:(res)=>{
  this.SingleData=res
  if(this.SingleData.Is_Message_Open==null){
    this.SingleData.Is_Message_Open='Opened'
    this.service.UpdateRecordService(Inx,this.SingleData).subscribe(sub=>{
      console.log(`updated`,sub);
     
   })
  }
}
    })
this.router.navigate(['/admin/MsgView'])
  }
  SingleData:any ;
  getDeleteId(id:any){
    this.DeleteIndex=id
  }
  starColor:any;
  AddStar(ind:any,th:any){
 let Id=""
 Id='star'+ind

let elementr=(<HTMLElement>document.getElementById(Id))
    this.service.GetSingleRecordService(ind).subscribe(sub=>{
      debugger
      this.SingleData=sub
      if(this.SingleData.stared==null){
        this.SingleData.stared='Yes'
 let strId=''
 strId=ind;

  let StarElement = this.el.nativeElement.querySelector('#star');
        console.log(StarElement);
        this.renderer.setStyle(StarElement, 'color', '#00B8A9');
        this.notify.showInfo("Added To Star List",'This Message')
      }
      else{
        this.SingleData.stared=null
        this.notify.showInfo("Removed From Star List",'This Message')
      }
      
      this.service.UpdateRecordService(ind,this.SingleData).subscribe(sub=>{
        console.log(`updated`,sub);
       
     })
    })
  }
DeleteIndex:any;
  deleteMessage(){
this.service.DeleteRecordService(this.DeleteIndex).subscribe({
  next:(res)=>{
    console.log(res);
     this.getAllRecord();
      this.router.navigateByUrl('/admin/home')
  },
  error:(err)=>{
    console.log(err);
    
  }
})
  }
}

