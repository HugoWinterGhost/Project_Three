import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carouselPictures: Array<{ name: string; url: string }> = [];

  constructor() { }

  ngOnInit(): void {
    this.carouselPictures = [ 
      { name: 'vert1.png', url: 'bracelets/Melinda' }, 
      { name: 'vert2.jpg', url: 'boucles-oreilles/Marie' },
      { name: 'argent1.jpg', url: 'colliers/Eden' },
      { name: 'argent2.jpg', url: 'colliers/Vahalla' },
      { name: 'kena.jpg', url: 'colliers/Kena' },
    ];
  }

}
