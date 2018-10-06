import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public url: any;
    private crawler_url: any;
    private apiKey: any;
    private id: any;

    constructor(
        private storage: Storage,
        private http: HttpClient,
        private router: Router
    ) {
        console.log("Initializing HomePage.");
        this.loadSampleData();
        this.url = "http://example.com/1";
        this.crawler_url = "http://ec2-54-174-223-230.compute-1.amazonaws.com:80/crawlerapi/";
        this.apiKey = "ABCDPREMIUM";
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

  submit_crawl_request() {
    try {
        this.http.post(this.crawler_url, {
            "apiKey": this.apiKey,
            "url": this.url
            }, {
            'headers' : new HttpHeaders({
                    "Content-Type" : "application/json" })
        }).subscribe((data) => {
            console.log("received data: " + data);
        });
    }
    catch(error) {
        console.error(error);
    }

    this.storage.length().then((len) => {
        this.id = len;
        this.storage.set(this.url, {
            "url" : this.url,
            "id" : this.id,
            "analysis" : null,
            "title" : "Result pending" ,
            "note" : this.url,
            "icon" : "restaurant",
            "industry" : "Restaurant"
         });
    });
  }

  submit() {
    this.storage.get(this.url).then((data) => {
        if(!data){
            console.log("Registering request for: " + this.url);
            this.submit_crawl_request();
        } else {
            console.log("Results already exists." + data);
        }
        this.router.navigateByUrl('result?url=' + this.url);
    });
  }
}
