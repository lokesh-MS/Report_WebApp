import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-msg-view',
  templateUrl: './msg-view.component.html',
  styleUrls: ['./msg-view.component.css']
})
export class MsgViewComponent implements OnInit,OnDestroy {

  constructor(private service:DbserviceService) { }
  sigleDataArr = new Array<any>(); // Creates an array with a length of 5

  ngOnInit(): void {
   const id= this.service.Get_Id();
   this.service.GetSingleRecordService(id).subscribe({
    next:(res)=>{
      console.log(this.sigleDataArr);
      this.sigleDataArr.push(res)

    },
    error:(err)=>{
      console.log(err);
    }
   })
  }
  ngOnDestroy() {
    // Perform cleanup tasks here, e.g., unsubscribe from observables
  }
  

}
