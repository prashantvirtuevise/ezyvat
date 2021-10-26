import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomenavControlService } from 'src/app/services/homenav-control.service';

@Component({
  selector: 'app-links-options',
  templateUrl: './links-options.component.html',
  styleUrls: ['./links-options.component.scss']
})
export class LinksOptionsComponent implements OnInit {
  status:boolean;
  memberName = 'Nitzan';
  constructor(public user:HomenavControlService,private route:Router) { }

  ngOnInit(): void {  
    //If there is a token per user
    this.status=true;
    //else
   //this.status=false; 

   this.user.isShowIconHomeBold= false;
   this.user.isShowIconPurBold = false;
   this.user.isShowIconShopBold = false;
   this.user.isShowIconProBold = true;

  }
  logout(){
    let logout = confirm("Do you really want to logout")
    console.log(logout);
    if (logout == true) {
      localStorage.clear();
      this.route.navigateByUrl("home");
    }  
  }
}
