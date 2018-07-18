import { TestBed, inject } from '@angular/core/testing';

import { PollAnswerService } from './poll-answer.service';
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";

describe('PollAnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PollAnswerService, MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([PollAnswerService], (service: PollAnswerService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all poll answers', inject([PollAnswerService], (service: PollAnswerService) => {
    expect(service.getPollAnswers).toBeTruthy();
  }));

  it('should get single poll answer by ID', inject([PollAnswerService], (service: PollAnswerService) => {
    expect(service.getPollAnswer('it does not exist')).toBeTruthy();
  }));

  it('should create a poll answer', inject([PollAnswerService], (service: PollAnswerService) => {
    expect(service.createPollAnswer({
      name: 'karma-test-poll-answer',
      translations: [],
    })).toBeTruthy();
  }));

  it('should remove a poll answer', inject([PollAnswerService], (service: PollAnswerService) => {
    expect(service.removePollAnswerByName('karma-test-poll-answer')).toBeTruthy();
  }));
});
