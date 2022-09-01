import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';

  sourceList: Satellite[];
  displayList: Satellite[];

	constructor() {
		this.sourceList = [];
		this.displayList = [];
		let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

		window.fetch(satellitesUrl).then(function (response) {
			response.json().then(function (data) {

				let fetchedSatellites = data.satellites;
				// loop over satellites
				for(let i=0; i < fetchedSatellites.length; i++) {
					// create a Satellite object 
					let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
					// add the new Satellite object to sourceList 
					this.sourceList.push(satellite);
				 }

				 // make a copy of the sourceList to be shown to the user
				 this.displayList = this.sourceList.slice(0);
	  
			}.bind(this));
		}.bind(this));

	}

	search(searchTerm: string): void {
		let matchingSatellites: Satellite[] = [];
		searchTerm = searchTerm.toLowerCase();
		for(let i=0; i < this.sourceList.length; i++) {
			let name = this.sourceList[i].name.toLowerCase();
			let type = this.sourceList[i].type.toLowerCase();
			let launchDate = this.sourceList[i].launchDate.toLowerCase();
			let orbitType = this.sourceList[i].orbitType.toLowerCase();
			let operational = String(this.sourceList[i].operational).toLowerCase();
			if (name.includes(searchTerm)) {
				if (!matchingSatellites.includes(this.sourceList[i])){
					matchingSatellites.push(this.sourceList[i]);
				}
			} if (type.includes(searchTerm)) {
				if (!matchingSatellites.includes(this.sourceList[i])){
					matchingSatellites.push(this.sourceList[i]);
				}
			}if (launchDate.includes(searchTerm)) {
				if (!matchingSatellites.includes(this.sourceList[i])){
					matchingSatellites.push(this.sourceList[i]);
				}
			}if (orbitType.includes(searchTerm)) {
				if (!matchingSatellites.includes(this.sourceList[i])){
					matchingSatellites.push(this.sourceList[i]);
				}
			}if (operational.includes(searchTerm)) {
				if (!matchingSatellites.includes(this.sourceList[i])){
					matchingSatellites.push(this.sourceList[i]);
				}
			}
		}
		



		this.displayList = matchingSatellites;
	}


}
