import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:DbserviceService, private router:Router,private el: ElementRef, private renderer: Renderer2) { }
AllRecordsArr:any=[];
userName:any;
  ngOnInit(): void {
    // let closeBtn = this.el.nativeElement.querySelector('#id01');
    // var modal = document.getElementById('id01');
    this.getAllRecord()
   this.userName= this.service.GetUser()
  //  console.log(this.userName);
  //  console.log(this.AllRecordsArr);
   
  }


  getAllRecord(){
    this.service.GetAllRecordServices().subscribe({
      next:(res)=>{
        this.AllRecordsArr=res;
        // console.log(res);
        // console.log(this.AllRecordsArr);
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  viewMessage(Inx:any){
    this.service.Store_Id_Service(Inx);
this.router.navigate(['/admin/MsgView'])
  }
  // SingleData:any;
  SingleData:any ;
  getDeleteId(id:any){
    this.DeleteIndex=id
  }
  AddStar(ind:any){
    // debugger
    
    this.service.GetSingleRecordService(ind).subscribe(sub=>{
      // this.SingleData.push(sub)
      // console.log(this.SingleData);
      this.SingleData=sub
      if(this.SingleData.stared==null){
        this.SingleData.stared='Yes'
      }
      else{
        this.SingleData.stared=null
      }
      
      this.service.UpdateRecordService(ind,this.SingleData).subscribe(sub=>{
        console.log(`updated`,sub);
       
     })
    })
  }
DeleteIndex:any;
  deleteMessage(){
   debugger
this.service.DeleteRecordService(this.DeleteIndex).subscribe({
  next:(res)=>{
    console.log(res);
     this.getAllRecord();
      this.router.navigateByUrl('/admin')
    
    
  },
  error:(err)=>{
    console.log(err);
    
  }
})
  }

  // Model Pop up delete funtion 
  // Get the modal


// When the user clicks anywhere outside of the modal, close it

}
