import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { CheckOutDirective } from './directives/checkout/check-out.directive';
import { CustomAlertService } from './services/messages/custom-alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink,
    FooterComponent, HeaderComponent,
    CheckOutDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  @ViewChild('alert_container', { read: ViewContainerRef, static: true}) alert_container!: ViewContainerRef;

  constructor(private alertService: CustomAlertService) { }

  ngAfterViewInit(): void {
    this.alertService.setContainer(this.alert_container);  
  }


}
