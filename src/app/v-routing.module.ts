import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'prefix'},
  {path: 'login', loadChildren: './landing/landing.module#LandingModule'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'}
];

@NgModule({
  imports: [HomeModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class VRoutingModule {
}
