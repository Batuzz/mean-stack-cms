import { TestBed, inject } from '@angular/core/testing';

import { TranslationService } from './translation.service';
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";

describe('TranslationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationService, MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([TranslationService], (service: TranslationService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all translations', inject([TranslationService], (service: TranslationService) => {
    expect(service.getTranslations).toBeTruthy();
  }));

  it('should get single translation by ID', inject([TranslationService], (service: TranslationService) => {
    expect(service.getTranslation('it does not exist')).toBeTruthy();
  }));

  it('should get translations by name', inject([TranslationService], (service: TranslationService) => {
    expect(service.getTranslationsByName('it does not exist')).toBeTruthy();
  }));

  it('should create a translation', inject([TranslationService], (service: TranslationService) => {
    expect(service.createTranslation({
      name: 'karma-test-translation',
      language: 'asdasdasdasd',
      text: 'Karma test translation text'
    })).toBeTruthy();
  }));

  it('should remove a translation', inject([TranslationService], (service: TranslationService) => {
    expect(service.removeTranslationByName('karma-test-translation')).toBeTruthy();
  }));
});
