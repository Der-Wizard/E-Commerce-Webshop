import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path:'', component: HomeComponent, canActivate: [authGuard] },
    { path:'products', component: HomeComponent, canActivate: [authGuard] },
    { path:'about', component: AboutComponent, canActivate: [authGuard] }
];
