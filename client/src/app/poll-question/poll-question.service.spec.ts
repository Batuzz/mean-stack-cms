import { TestBed, inject } from '@angular/core/testing';

import { PollQuestionService } from './poll-question.service';
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";

describe('PollQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PollQuestionService, MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([PollQuestionService], (service: PollQuestionService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all poll questions', inject([PollQuestionService], (service: PollQuestionService) => {
    expect(service.getPollQuestions).toBeTruthy();
  }));

  it('should get single poll question by ID', inject([PollQuestionService], (service: PollQuestionService) => {
    expect(service.getPollQuestion('it does not exist')).toBeTruthy();
  }));

  it('should create a poll question', inject([PollQuestionService], (service: PollQuestionService) => {
    expect(service.createPollQuestion({
      name: 'karma-test-poll-question',
      translations: [],
      answerOptions: [],
    })).toBeTruthy();
  }));

  it('should remove a poll question', inject([PollQuestionService], (service: PollQuestionService) => {
    expect(service.removePollQuestionByName('karma-test-poll-question')).toBeTruthy();
  }));
});
