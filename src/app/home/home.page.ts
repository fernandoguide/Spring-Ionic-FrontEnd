import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController,
     public menu: MenuController,
     public auth: AuthService) {}

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menu.swipeGesture(true);
  }
  ionViewDidEnter(){
    this.auth.refreshToken().subscribe(response =>{
      this.auth.succcessfullLogin(response.headers.get('Authorization'));
      this.navCtrl.navigateRoot('categorias');
    }, error => {});
   
  }

  login(){
    this.auth.authenticate(this.creds).subscribe(response =>{
      this.auth.succcessfullLogin(response.headers.get('Authorization'));
      this.navCtrl.navigateRoot('categorias');
    }, error => {});
    console.log(this.creds);
   
  }
  signup(){
    this.navCtrl.navigateRoot('signup');
  }
}
