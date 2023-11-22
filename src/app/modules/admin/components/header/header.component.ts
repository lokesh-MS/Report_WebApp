import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service:DbserviceService,private storeage:StorageService) { }
  userName:any;
  ngOnInit(): void {
     this.userName=this.storeage.GetUser()
  }

}
