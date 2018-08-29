import { Component, OnInit } from '@angular/core';
import { AppstoreService } from '../../shared/services/appstore.service';
import { Books } from '../../shared/models/bookModel';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.css']
})
export class DisplayBookComponent implements OnInit {
book:Books;
bookAvaliable:boolean=false;
  constructor(private appStore:AppstoreService) { 
    
  }

  ngOnInit() {
    this.book = this.appStore.currentBook;
    console.log(this.book)
    if(this.book.remainingBooks>0){
      this.bookAvaliable = true;
    } else{
      this.bookAvaliable= false;
    }
  }
  
}
