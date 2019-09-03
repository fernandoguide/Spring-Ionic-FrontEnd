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
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  login(){
    this.auth.authenticate(this.creds).subscribe(response =>{
      this.auth.succcessfullLogin(response.headers.get('Authorization'));
      this.navCtrl.navigateBack('categorias');
    }, error => {});
    console.log(this.creds);
   
  }
}
