import { TestBed, inject } from '@angular/core/testing';

import { PollService } from './poll.service';
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";

describe('PollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PollService , MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([PollService], (service: PollService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all polls', inject([PollService], (service: PollService) => {
    expect(service.getPolls).toBeTruthy();
  }));

  it('should get single poll by ID', inject([PollService], (service: PollService) => {
    expect(service.getPoll('it does not exist')).toBeTruthy();
  }));

  it('should get single poll by name', inject([PollService], (service: PollService) => {
    expect(service.getPollByName('it does not exist')).toBeTruthy();
  }));

  it('should create a poll', inject([PollService], (service: PollService) => {
    expect(service.createPoll({
      name: 'karma-test-poll',
      translations: [],
      questions: [],
    })).toBeTruthy();
  }));

  it('should remove a poll', inject([PollService], (service: PollService) => {
    expect(service.removePollByName('karma-test-poll')).toBeTruthy();
  }));
});
