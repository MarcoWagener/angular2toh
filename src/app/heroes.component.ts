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

	add(name: string): void {
		name = name.trim();

		if(!name) { return; }

		this.heroService.create(name)
			.then(hero => {
				this.heroes.push(hero);
				this.selectedHero = null;
			});
	}

	delete(hero: Hero): void {
		this.heroService
			.delete(hero.id)
			.then(() => {
				this.heroes = this.heroes.filter(h => h !== hero);
				if (this.selectedHero === hero) { this.selectedHero = null; }
			});
	}
}