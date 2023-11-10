import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
// import * as $ from 'jquery';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2,private services:DbserviceService,private router:Router) { }

  // closeBtn = this.el.nativeElement.querySelector('#btn');
  //  searchBtn =  this.el.nativeElement.querySelector(".bx-search");
  userName:any;
  ngOnInit(): void {
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
    this.userName=this.services.GetUser()
  }
 
  LogOut(){
    this.router.navigate(['/'])
     sessionStorage.clear();
  }
}
