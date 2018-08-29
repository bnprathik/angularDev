import { Routes } from '@angular/router/router';

import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddBooksComponent } from './admin/add-books/add-books.component';
import { HomeComponent } from './home-view/home/home.component';
import { LoginComponent } from './home-view/login/login.component';
import { DisplayAllBooksComponent } from './book/display-all-books/display-all-books.component';
import { RegisterComponent } from './home-view/register/register.component';
import { DisplayBookComponent } from './book/display-book/display-book.component';
import { UserComponent } from './home-view/user/user.component';


export const appRoutes: Routes = [
    {
        path:'',
        component:HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'admin-login',
        component: LoginComponent       
    },
    {
        path: 'admin-home',
        component: AdminHomeComponent
    },
    {
        path: 'get-books',
        component: DisplayAllBooksComponent
    },
    {
        path: 'add-books',
        component: AddBooksComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component:LoginComponent
    },
    {
        path:'book-detail',
        component:DisplayBookComponent
    },
    {
        path:'user-home',
        component: UserComponent
    }

];
