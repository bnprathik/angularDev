import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';
import { Books } from '../../shared/models/bookModel';
import { AppstoreService } from '../../shared/services/appstore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-all-books',
  templateUrl: './display-all-books.component.html',
  styleUrls: ['./display-all-books.component.css']
})
export class DisplayAllBooksComponent implements OnInit {
bookArray: Array<Books>;
bookInfoDisplaystatus ="none";
dialogRef: MatDialogRef<BookDetailsModalComponent>
  constructor(private appStoreService:  AppstoreService,
    public dialog: MatDialog,private route:Router) { }

  ngOnInit() {
    this.appStoreService.getBooks().subscribe((response) => {
    this.bookArray = response;
    console.log(response);
    console.log(this.bookArray);
    });
    // this.bookArray = this.appStoreService.bookArray;
    // console.log(this.bookArray);
  }
  deleteBook(isbn) {
    console.log(isbn);
    this.appStoreService.deleteBookByIsbn(isbn).subscribe((resp) => {
      console.log(resp);
    });
  }

  openModalPopUp(book){
    console.log('in open modal');
    console.log(book);
    const dialogRef = this.dialog.open(BookDetailsModalComponent, {
      width: '600px',
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result === 'moreinfo'){
      this.appStoreService.currentBook = book;
      this.route.navigate(['book-detail']);
      }
      // this.appStoreService.currentBook.subscribe((book)=>{
      //   console.log(book);
      // })
    });
  }
}
  // displayBookDetail(event){
  //   console.log(event)
  //   if(this.bookInfoDisplaystatus === "none"){
  //     this.bookInfoDisplaystatus = "block"
  //     console.log('in book enter');
  //   }else{
  //     this.bookInfoDisplaystatus = "none"
  //     console.log('in book leave');
  //   }
  // }