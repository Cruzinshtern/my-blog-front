import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './admin/components/login/login.component';
import {RegisterComponent} from './admin/components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UpdateUserProfileComponent} from './components/update-user-profile/update-user-profile.component';
import {AuthGuard} from './guards/auth.guard';
import {HomeComponent} from './components/home/home.component';
import {CreateBlogEntryComponent} from './components/create-blog-entry/create-blog-entry.component';
import {ViewBlogEntryComponent} from './components/view-blog-entry/view-blog-entry.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersComponent
      },
      {
        path: ':id',
        component: UserProfileComponent
      }
    ]
  },
  {
    path: 'update-profile',
    component: UpdateUserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-blog-entry',
    component: CreateBlogEntryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog-entries/:id',
    component: ViewBlogEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
