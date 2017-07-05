import { Component } from '@angular/core';
import APP_CONFIG from './app.config';
import { Node, Link } from './d3';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];
  data: any;
  loading: boolean;

  constructor(private http: Http) {
    this.makeRequest();
  }

  ngOnInit( ) {
  }

  makeRequest(): void {
    this.loading = true;
    this.http.get('assets/godiva-10-es.json')
    .subscribe((res: Response)=>{
      const tagsFromGodiva= res.json() || {return: []};
      tagsFromGodiva.result.map((tag) => {
        this.nodes.push(new Node(+tag.ID));
      });
      tagsFromGodiva.result.map((tag) => {
        this.links.push(new Link(+tag.PARENT_ID, +tag.ID))
      });
      this.loading = false;
    });

  }

  /*constructor() {

    const N = APP_CONFIG.N,
          getIndex = number => number - 1;

    /** constructing the nodes array
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        this.links.push(new Link(i, i * m));
      }
    }
  }*/
}
