import { Component, OnInit } from '@angular/core';
import { PollService } from "../poll/poll.service";
import { MessageService } from "primeng/components/common/messageservice";
import { ActivatedRoute } from "@angular/router";
import { Poll } from "../poll/poll.interface";
import {TranslationService} from "../translation/translation.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public name: string;
  public poll: Poll;
  public selectedAnswers = [];
  public data: any = [];
  public chartData: any = [];
  public answers: any;
  public canRender: boolean = false;
  public options : any;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private pollService: PollService,
    public ts: TranslationService
  ) {

    this.options = {
      legend: {
        position: 'bottom',
        fontColor: 'white',
        labels:{
          fontColor: 'white'
        }
      },
      font: {
        color: '#fff'
      }
    };
  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.name = params['name'];
        this.pollService.getPollByName(this.name)
          .subscribe(
            (poll) => {
              this.poll = poll;
              let selectedAnswers = JSON.parse(localStorage.getItem('answer-' + this.name));
              for(let element of selectedAnswers) {
                this.selectedAnswers[element.question] = element.answer;
              }

              this.pollService.getChartData(this.name)
                .subscribe(
                  (data) => {
                    let elements = [];

                    for(let element of data) {
                      if(elements.indexOf(element.question._id) == -1)
                        elements.push(element.question._id);
                      if(!this.data[element.question._id]) {
                        this.data[element.question._id] = {};
                        this.data[element.question._id]['translations'] = element.question.translations;
                        this.data[element.question._id]['selectedAnswer'] = {};
                        this.data[element.question._id]['labels'] = [];
                        this.data[element.question._id]['data'] = [];
                        this.data[element.question._id]['color'] = [];
                        this.data[element.question._id]['hoverColor'] = [];
                      }
                      if(element.answer._id == this.selectedAnswers[element.question._id])
                        this.data[element.question._id]['selectedAnswer'] = element.answer.translations;
                      this.data[element.question._id]['labels'].push(this.ts.trans(element.answer.translations));
                      this.data[element.question._id]['data'].push(element.count);
                      this.data[element.question._id]['color'].push(element.color);
                      this.data[element.question._id]['hoverColor'].push(element.hoverColor);
                    }

                    for(let element of elements) {
                      let toPush  = {
                        translations: this.data[element]['translations'],
                        selectedAnswer: this.data[element]['selectedAnswer'],
                        labels: this.data[element]['labels'],
                        datasets: [
                          {
                            data: this.data[element]['data'],
                            backgroundColor: this.data[element]['color'],
                            hoverBackgroundColor: this.data[element]['hoverColor']
                          }]
                      };
                      this.chartData.push(toPush);
                    }
                    this.canRender = true;

                  }
                );
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting poll chart data. Please refresh the website.'
              })
          );
      });
  }

}
