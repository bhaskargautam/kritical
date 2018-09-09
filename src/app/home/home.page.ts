import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public url: any;

    constructor(
        private storage: Storage,
        private http: HttpClient,
        private router: Router
    ) {
        console.log("Initializing HomePage.");
        this.loadSampleData();
        this.url = "http://example.com/1"
    }

    loadSampleData() {
        try {
            this.http.get('assets/samples.json')
                     .subscribe((data) => {
                        console.log("Data ", data);
                        for(var k in data){
                            console.log("Loading Sample ", data[k]);
                            this.storage.set(data[k].url, data[k]);
                        }
                      });
        }
        catch(err) {
            console.error("Could not load sample data", err);
        }
  }

  submit() {
    console.log("Registering request for: " + this.url);
    //Todo: Integrate API to register new url for crawling.
    this.router.navigateByUrl('result?url=' + this.url);
  }
}
