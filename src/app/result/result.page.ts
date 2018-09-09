import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  private url: any;
  private resultData: any;

  constructor(
        private storage: Storage,
        private activatedRoute: ActivatedRoute
    ) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
        (params: Params) => {
            console.log("Loading results for ", params['url']);
            this.storage.get(params['url']).then((data) => {
                this.resultData = data;
                console.log(this.resultData);
            });
        });
  }
}
