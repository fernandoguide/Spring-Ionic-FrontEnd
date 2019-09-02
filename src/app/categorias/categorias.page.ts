import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController, 
    public categoriaService: CategoriaService) {
  }
  ngOnInit() {


    this.categoriaService.findAll()
      .subscribe(res => {
        this.items = res;
        console.log(res);
      },
      error => {
        console.log(error);
      });
    
  }

}
