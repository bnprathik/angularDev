import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import { AddBooksComponent } from './admin/add-books/add-books.component';
import { FormsModule } from '@angular/forms';
import { AppstoreService } from './shared/services/appstore.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayAllBooksComponent } from './book/display-all-books/display-all-books.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { appRoutes } from './app.routes';
import { HomeComponent } from './home-view/home/home.component';
import { HeaderComponent } from './home-view/header/header.component';
import { FooterComponent } from './home-view/footer/footer.component';
import { LoginComponent } from './home-view/login/login.component';
import { RegisterComponent } from './home-view/register/register.component';
import { BookDetailsModalComponent } from './book/book-details-modal/book-details-modal.component';
import { DisplayBookComponent } from './book/display-book/display-book.component';
import { FacebookModule } from 'ngx-facebook';
import { UserComponent } from './home-view/user/user.component';
// import { BookuploadComponent } from './admin/bookupload/bookupload.component';
// import { FileUpload } from 'ng2-fileupload';

// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
        [{
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("275937912957124")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('465442865448-1lfksrsm27tnlcu5gue68rjtltar7pss.apps.googleusercontent.com')
        }]

  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    AddBooksComponent,
    DisplayAllBooksComponent,
    AdminHomeComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    BookDetailsModalComponent,
    DisplayBookComponent,
    UserComponent
    // BookuploadComponent
    // FileUpload
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    // MatButtonModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppstoreService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }
],
  bootstrap: [AppComponent],
  entryComponents:[BookDetailsModalComponent]
})
export class AppModule { }
