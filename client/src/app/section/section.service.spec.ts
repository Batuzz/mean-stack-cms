import { TestBed, inject } from '@angular/core/testing';

import { SectionService } from './section.service';
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";

describe('SectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SectionService, MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([SectionService], (service: SectionService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all sections', inject([SectionService], (service: SectionService) => {
    expect(service.getSections).toBeTruthy();
  }));

  it('should get single section by ID', inject([SectionService], (service: SectionService) => {
    expect(service.getSection('it does not exist')).toBeTruthy();
  }));

  it('should create a section', inject([SectionService], (service: SectionService) => {
    expect(service.createSection({
      name: 'karma-test-section',
      sequence: [],
      translations: [],
      image: 'asd',
    })).toBeTruthy();
  }));

  it('should remove a section', inject([SectionService], (service: SectionService) => {
    expect(service.removeSecitonByName('karma-test-section')).toBeTruthy();
  }));
});
