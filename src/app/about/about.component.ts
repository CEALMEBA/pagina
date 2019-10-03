import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { Game } from '../Games';

@Component({
  selector: 'app-home',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity:0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset:0}),
            style({opacity: .5, transform: 'translateY(35xp)', offset:.3}),
            style({opacity: 1, transform: 'translateY(0)', offset:1}),
          ]))]), {optional: true}),
        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset:0}),
            style({opacity: .5, transform: 'translateY(35xp)', offset:.3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset:1}),
          ]))]), {optional: true})  
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  count: number;
  name : String;
  developer :String;
  gamesystem : String;
  genere: String;
  year : number;
  createdAt: string;
  updatedAt: string;
  gameSystems: Game[];

  constructor(private service: DataService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    return this.service.getGames().subscribe( (gameSystemList: any) => {
      this.gameSystems = gameSystemList;
      this.count = this.gameSystems.length;
    });
  }

  post() {
    const gameSystem = new Game();

    gameSystem.name = this.name;
    gameSystem.developer = this.developer
    gameSystem.gamesystem = this.gamesystem
    gameSystem.genere = this.genere
    gameSystem.year = this.year
    gameSystem.createdAt = this.createdAt
    gameSystem.updatedAt = this.updatedAt

    return this.service.postGame(gameSystem).subscribe((response: any) => {
      console.log(response);
      this.name = '';
      this.developer='';
      this.gamesystem ='';
      this.genere='';
      this.year
      this.createdAt='';
      this.updatedAt=''
      this.get();
    });
  }

  delete(id) {
    return this.service.deleteGame(id).subscribe((response: any) => {
      console.log(response);
      this.get();
    });
  }
}
