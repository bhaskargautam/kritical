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
                     .subscribe(data => {
                        console.log("Data ", data);
                        data.forEach(sample =>
                              {
                                console.log("Loading Sample ", sample);
                                this.storage.set(sample.url, sample);
                               }
                            );
                      });
        }
        catch(err) {
            console.error("Could not load sample data", err);
        }
  }

  submit() {
    console.log("submitted");
    console.log(this.url);
    this.router.navigateByUrl('result?url=' + this.url);
  }
}
