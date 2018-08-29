import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Books } from '../models/bookModel';
import { User } from '../models/user';
import { AuthService } from 'angular5-social-login';
import { promise } from 'protractor';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppstoreService {
  currentUser:User = { userName: null,
    email: null,
    password: null,
    role:null,
    userId:null
  };
  url = 'http://localhost:3000/books/';
  url1 = 'http://localhost:3000/user/register';
  url2 = 'http://localhost:3000/user/authenticate';
  url3 = 'http://localhost:3000/user/social-login';
  url4 = 'http://localhost:3000/user/profile'
  graphUrlBase = 'https://graph.facebook.com/';
  bookArray: Array<Books>;
  currentBook:Books=null;
  constructor(private socialAuthService: AuthService, private http: HttpClient ) { }

  register(user: User): Observable<any> {
    return this.http.post(this.url1, user);
  }
  authenticate(user: User): Observable<any> {
    console.log('In authenticate');
    return this.http.post(this.url2, user);
  }
  addBook(book: Books): Observable<any> {
    console.log(book.author)
    return this.http.post(this.url, book);
  }
  getBooks(): Observable<any> {
    return  this.http.get(this.url);
  }
  deleteBookByIsbn(id): Observable<any>  {
    return this.http.delete(this.url + id);
  }
  addBookByIsbn(isbn:string): Observable<any> {
    console.log('in appstore');
    console.log(isbn)
  //  var isbnObj:{"isbn":string};
  //   isbnObj.isbn = <string>isbn;
    return this.http.post(this.url+'addUsingIsbn', {"isbn":isbn});
  }
  // socialLogin(socialPlatformProvider, socialPlatform): Promise<any> {
  //   return this.socialAuthService.signIn(socialPlatformProvider);
  // }
  // socialLogout(): Promise<any> {
  //   return this.socialAuthService.signOut();
  // }
  signupUsingSocialLogin(user:User): Observable<any> {
    console.log(user);
    this.currentUser = user;
    return this.http.post(this.url3, user);
  }
  getProfile(userId) :Observable<any>{
    console.log('in app store get profile with id ' ,userId);
    return this.http.get(this.url4,
      {params:{userId:userId}}
    );
  }
  getProfilePic(userId): Observable<any> {
    return this.http.get(this.graphUrlBase+userId+'/picture');
  }
}
