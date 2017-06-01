import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  	selector: 'my-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
	//Public Fields
	selectedHero: Hero;
	heroes: Hero[];

	//The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
	constructor(private heroService: HeroService,
		private router: Router) {
		
	}

	ngOnInit(): void {
		this.getHeroes();
	}

	getHeroes(): void {
		this.heroService.getHeroes()
			.then(heroes => this.heroes = heroes);
	}

	// getHeroesSlowly(): Promise<Hero[]> {
	//   return new Promise(resolve => {
	//     // Simulate server latency with 2 second delay
	//     setTimeout(() => resolve(this.getHeroes()), 2000);
	//   });
	// }

	//Public Methods
	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}

	gotoDetail(): void {
		this.router.navigate(['./detail', this.selectedHero.id]);
	}
}