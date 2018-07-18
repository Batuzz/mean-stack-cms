import { Component, OnInit } from '@angular/core';
import { TranslationService } from "../translation/translation.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private ts: TranslationService
  ) {

  }

  ngOnInit() {

  }

}
