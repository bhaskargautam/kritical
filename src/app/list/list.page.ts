import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  public items: Array<{ title: string; note: string; icon: string, url: string }> = [];

  constructor(
      private storage: Storage,
      private router: Router
    ) {
    this.storage.forEach((data, key, index) => {
          this.items.push({
            title: data.title,
            note: data.note,
            icon: data.icon,
            url: data.url
          });
    });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  navToResult(url) {
    this.router.navigateByUrl('result?url=' + url);
  }
}
