import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { FaqComponent } from './components/faq/faq.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductInfoComponent } from './components/products/product-info/product-info.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ConfirmationComponent } from './components/checkout/confirmation/confirmation.component';
import { ContactFormConfirmationComponent } from './components/contact-form/contact-form-confirmation/contact-form-confirmation.component';
import { NewsletterUnsubscribeComponent } from './components/newsletter-unsubscribe/newsletter-unsubscribe.component';

export const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'home', redirectTo: 'products' },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductInfoComponent },
    { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
    { path: 'registration', component: RegistrationComponent, canActivate: [noAuthGuard] },
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    { path: 'account', component: AccountComponent, canActivate: [authGuard] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
    { path: 'confirmation/:orderId', component: ConfirmationComponent, canActivate: [authGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactFormComponent },
    { path: 'contact-form-confirmation', component: ContactFormConfirmationComponent },
    { path: 'newsletter-unsubscribe', component: NewsletterUnsubscribeComponent },
    { path: 'faq', component: FaqComponent },
    { path: '**', redirectTo: 'not-found' },
    { path: 'not-found', component: NotFoundComponent },
];
