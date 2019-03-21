import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-celulares',
  templateUrl: './celulares.page.html',
  styleUrls: ['./celulares.page.scss'],
})
export class CelularesPage implements OnInit {

  results:any;
  marca="";
  modelo="";
  imagem="";

  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.results = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('response');
      })
    );
    console.log(this.results);

  }

}
