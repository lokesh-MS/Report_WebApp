import { Component, ElementRef, OnInit, Renderer2,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
// import * as $ from 'jquery';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private service:DbserviceService,private notify:NotificationService, private storage:StorageService,private router:Router,private el: ElementRef, private renderer: Renderer2) { }
  userName:any;
  AllRecordArrData:any = new Array<any>();
  stringSearch :any;
  AllRecordsArr:any=[];
  ArrayFormatData = new Array<any>();
  notificationCount:any;
  countArray=new Array<any>();
 ngAfterViewInit(): void {


 }
 searchval:any;

  ngOnInit(): void {
  
    this.userName= this.storage.GetUser()
   let closeBtn = this.el.nativeElement.querySelector('#btn');
   let sidebar = this.el.nativeElement.querySelector('.sidebar');
   let searchBtn =  this.el.nativeElement.querySelector(".bx-search");
    closeBtn.addEventListener('click', () => {
      console.log('Button clicked!');
      sidebar.classList.toggle("open");
      menuBtnChange(); //calling the function(optional)
    });
    searchBtn.addEventListener("click", () => {
      // Sidebar open when you click on the search iocn
      sidebar.classList.toggle("open");
      menuBtnChange(); //calling the function(optional)
    });
    function menuBtnChange() {
      if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
      }
    }

    let toggle = this.el.nativeElement.querySelector('#toggle');
    
    let menu = this.el.nativeElement.querySelector('.menu');   
    let sideMenu =this.el.nativeElement.querySelector('.Animated-Radial-Menu');
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active')
        // this.renderer.setStyle(sideMenu, 'display', 'block');
        //this.renderer.setStyle(menu, 'display', 'block');
    });
    this.userName=this.storage.GetUser()
    this.service.GetAllRecordServices().subscribe({
      next:(res)=>{
 this.AllRecordArrData=res;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    this.getAllRecord();

  }
 
  LogOut(){
    this.router.navigate(['/'])
     sessionStorage.clear();
  }
notifyCount:number=0;
  getAllRecord(){
   
    
    this.service.GetAllRecordServices().subscribe({
      next:(res)=>{
        this.AllRecordsArr=res;
        this.ArrayFormatData=this.AllRecordsArr
        this.notifyCount =this.countArray.length;
        this.ArrayFormatData.filter(number => {
          if(number.receiver_Name==this.userName){
            // 
            this.countArray.push(number);
             if(number.is_Message_Open==null || number.is_Message_Open!="Opened"){
              this.notifyCount++;
                     }
          }
          console.log(this.notifyCount);
        }
        
        );
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
}

