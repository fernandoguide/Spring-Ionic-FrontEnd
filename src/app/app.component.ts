import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Categorias',
      url: '/categorias',
      icon: 'Cat'
    },{
      title: 'Profile',
      url: '/profile',
      icon: 'profile'  
    }      
  ];

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public nav: NavController
  ) {
    this.initializeApp();
    
   
  }
  logout() {
      this.auth.logout();
      this.nav.navigateRoot('home');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }
 
}
