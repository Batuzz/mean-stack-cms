import { TestBed, inject } from '@angular/core/testing';

import { LanguageService } from './language.service';
import { MessageService } from "primeng/components/common/messageservice";
import { HttpClientModule } from "@angular/common/http";

describe('LanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ LanguageService, MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([LanguageService], (service: LanguageService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all languages', inject([LanguageService], (service: LanguageService) => {
    expect(service.getLanguages()).toBeTruthy();
  }));

  it('should get single language by ID', inject([LanguageService], (service: LanguageService) => {
    expect(service.getLanguage('abc')).toBeTruthy();
  }));

  it('should create a single language', inject([LanguageService], (service: LanguageService) => {
    expect(service.createLanguage({
      name: 'karma-test-language',
      iso: 'karma-test-iso'
    })).toBeTruthy();
  }));

  it('should remove a language', inject([LanguageService], (service: LanguageService) => {
    expect(service.removeLanguageByName('karma-test-language')).toBeTruthy();
  }));
});
