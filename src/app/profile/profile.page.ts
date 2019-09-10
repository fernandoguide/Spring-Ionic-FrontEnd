import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;
  cliente: ClienteDTO;

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService ) { 
    }

  ngOnInit() {

    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          this.getImageIfExists();
        },
        error => {});
    }
  }

  getImageIfExists() {
    // this.clienteService.getImageFromBucket(this.cliente.id)
    this.clienteService.getImageFromAssets(this.cliente.id)
    .subscribe(response => {
      // this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      this.cliente.imageUrl = `${API_CONFIG.baseImgAssests}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }
}
