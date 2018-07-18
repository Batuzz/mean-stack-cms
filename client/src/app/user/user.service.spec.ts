import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserService, MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
