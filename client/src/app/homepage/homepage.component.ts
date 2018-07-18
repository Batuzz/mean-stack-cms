import { Component, OnInit } from '@angular/core';
import { TranslationService } from "../translation/translation.service";

declare var $ : any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private ts: TranslationService
  ) {

  }

  ngOnInit() {
    let max = 4;
    let min = 1;


    let scrollpos = 1;
    let section;

    $(window).bind('mousewheel DOMMouseScroll', function(event){
      if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        scrollpos = scrollpos - 1;
        let body = $("html, body");
        if (scrollpos<min){
          scrollpos = min;
        }
        section = "#content"+scrollpos;
        body.stop().animate({scrollTop:$(section).offset().top -45}, 1000, 'swing', function() {
        });

      }
      else {
        scrollpos = scrollpos + 1;
        let body = $("html, body");
        if (scrollpos>max){
          scrollpos = max;
        }
        section = "#content"+scrollpos;
        body.stop().animate({scrollTop:$(section).offset().top -45}, 1000, 'swing', function() {
        });

      }
    });

  }


}
