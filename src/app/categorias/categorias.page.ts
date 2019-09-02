import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(
    public navCtrl: NavController, 
    public categoriaService: CategoriaService) {
  }
  ngOnInit() {


    this.categoriaService.findAll()
      .subscribe(res => {
        console.log(res);
      },
      error => {
        console.log(error);
      });
    
  }

}
