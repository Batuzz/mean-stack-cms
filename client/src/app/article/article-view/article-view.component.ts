import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/components/common/messageservice";
import { ArticleService } from "../article.service";
import { ActivatedRoute } from "@angular/router";
import { Article } from "../article.interface";

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss']
})
export class ArticleViewComponent implements OnInit {

  private name: string;
  public article: Article;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.name = params['name'];
        this.articleService.getArticleByName(this.name)
          .subscribe(
            (article) => {
              this.article = article;
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting article. Please refresh the website.'
              })
          )
      });
  }

}
