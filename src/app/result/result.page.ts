import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  private url: any;
  public resultData: any;
  private defaultResult: any;
  private resultAvailable: any;

  constructor(
        private storage: Storage,
        private activatedRoute: ActivatedRoute,
        public toastCtrl: ToastController
    ) {
    this.resultAvailable = false;
    this.storage.get('http://example.com/1').then((data) => {
            this.defaultResult = data;
        });
    this.activatedRoute.queryParams.subscribe(
        (params: Params) => {
            console.log("Loading results for ", params['url']);
            this.storage.get(params['url']).then((data) => {
                console.log(data);
                if(data && data['analysis']) {
                    console.log("Valid Data avaialble" + data);
                    this.resultData = data;
                    this.resultAvailable = true;
                    this.computeRating();
                }
                else {
                    //console.log("Loading Sample Result");
                    //this.raiseToast('Results are not available for the provided URL. Showing Sample-1 result.');
                    this.resultData = this.getCrawlResult(params['url']);
                }
                console.log("Loaded Data", this.resultData);
            });
        });
  }

  ngOnInit() {
  }

  async raiseToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

  computeRating() {
    var sumRating = 0, sumWeight = 0;
    this.resultData.analysis.result.forEach(x => {
        sumRating += x.value * x.weight;
        sumWeight += x.weight;
        console.log(sumRating, sumWeight);
    });
    this.resultData.kriticalRating = (sumRating / sumWeight).toFixed(1);
  }


  updateRating(event, label) {
    console.log("Updating weight for ", label, event.detail.value);
    this.resultData.analysis.result.forEach(x => {
        if(x.label == label) {
            x.weight = event.detail.value
        }
    });
    this.computeRating();
  }

  numStars(rating) {
    return Array(Math.floor(rating));
  }

  numHalfStar(rating) {
    if(rating % 1 >= 0.5) {
        return Array(1);
    }
    else {
        return Array(0);
    }
  }

  numStarOutline(rating) {
    return Array(Math.ceil(4.5 - rating));
  }

  save() {
    this.storage.set(this.resultData.url, this.resultData);
    this.raiseToast('Saved the customized rating.')
  }

  getCrawlResult(url) {
    //Todo: call status & getObject APIs.
    console.log("Fetching results from Crawler.");
    this.resultAvailable = false;
    return {"url" : url};
  }
}
