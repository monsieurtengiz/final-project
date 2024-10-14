import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CartpageComponent } from './cartpage/cartpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-homepage', pathMatch: 'full' }, 
  { path: 'app-homepage', component: HomepageComponent }, 
  { path: 'app-cartpage', component: CartpageComponent }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
