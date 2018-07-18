import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/components/common/messageservice";
import { ArticleService } from "../article.service";
import { Article } from "../article.interface";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  public articles: Article[];

  constructor(
    private messageService: MessageService,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.articleService.getArticles()
      .subscribe(
        articles => {
          this.articles = articles;
        },
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting articles. Please try again.'
          })
      );
  }

}
