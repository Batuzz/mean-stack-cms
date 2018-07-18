import { TestBed, inject } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";

describe('ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ArticleService, MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([ArticleService], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all articles', inject([ArticleService], (service: ArticleService) => {
    expect(service.getArticles).toBeTruthy();
  }));

  it('should get single article by ID', inject([ArticleService], (service: ArticleService) => {
    expect(service.getArticle('it does not exist')).toBeTruthy();
  }));

  it('should get single article by name', inject([ArticleService], (service: ArticleService) => {
    expect(service.getArticleByName('it does not exist')).toBeTruthy();
  }));

  it('should create an article', inject([ArticleService], (service: ArticleService) => {
    expect(service.createArticle({
      name: 'karma-test-article',
      translations: [],
      sections: [],
    })).toBeTruthy();
  }));

  it('should remove an article', inject([ArticleService], (service: ArticleService) => {
    expect(service.removeArticleByName('karma-test-article')).toBeTruthy();
  }));

});
