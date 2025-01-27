import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { protectGuard } from './protect.guard';
import { RegisterComponent } from './register/register.component';
import { SellerprofileComponent } from './sellerprofile/sellerprofile.component';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },{
    path:"register",
    component:RegisterComponent
  },{
    path:"login",
    component:LoginComponent
  },{
    path:"customerprofile/:id",
    component:CustomerprofileComponent,
    canActivate:[protectGuard]
  },{
    path:"sellerprofile/:id",
    component:SellerprofileComponent,
    canActivate:[protectGuard]
  },{
    path:"cart",
    component:CartComponent,
    canActivate:[protectGuard]
  },{
    path:'',
    redirectTo:"home",
    pathMatch:'full'
  },
  {
    path:"**",
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
