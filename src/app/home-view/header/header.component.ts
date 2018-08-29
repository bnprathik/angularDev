import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  loginandout() {
    console.log('btn loginout clicked');
    this.route.navigate(['login']);
  }
  register() {
    console.log('btn register clicked');
    this.route.navigate(['register']);
  }
}
