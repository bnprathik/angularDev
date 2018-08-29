import { Component, OnInit } from '@angular/core';
import { AppstoreService } from '../../shared/services/appstore.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userProfilePic:String;
  constructor(private appStore:AppstoreService) { }

  ngOnInit() {
    console.log('in init user');
    this.appStore.getProfile(this.appStore.currentUser.userId).subscribe(res=>{
      console.log('in user');
      console.log(res);
    })
  }
  profile(){
    this.appStore.getProfilePic(this.appStore.currentUser.userId).subscribe(res=>{
      console.log(res);
    });
    
  }

}
