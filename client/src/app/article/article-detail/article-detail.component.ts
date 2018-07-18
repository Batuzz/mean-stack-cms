import { Component, OnInit } from '@angular/core';
import { TranslationService } from "../../translation/translation.service";
import { MessageService } from "primeng/components/common/messageservice";
import { ActivatedRoute } from "@angular/router";
import { SectionService } from "../../section/section.service";
import { ImageService } from "../../image/image.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Article } from "../article.interface";
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss', '../../../assets/forms.scss']
})
export class ArticleDetailComponent implements OnInit {

  public id: string;
  public article: Article;
  public translations: any[];
  public selectedTranslations: any[];
  public sections: any[];
  public selectedSections: any[];
  public formControl: FormControl = new FormControl();
  public articleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private translationService: TranslationService,
    private imageService: ImageService,
    private messageService: MessageService,
    private sectionService: SectionService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) {
    this.articleForm = formBuilder.group({
      name: [ null, [
        Validators.required
      ]],
    });
  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params['id'];
        this.translationService.getTranslations()
          .subscribe(
            translations => {
              this.articleService.getArticle(this.id)
                .subscribe(
                  article => {
                    this.sectionService.getSections()
                      .subscribe(
                        sections => {
                          this.article = article;
                          if(article.translations)
                            this.selectedTranslations = article.translations;
                          else
                            this.selectedTranslations = [];

                          if(this.selectedTranslations && this.selectedTranslations.length)
                            for(let trans of this.selectedTranslations) {
                              translations = translations.filter(obj => obj._id != trans._id);
                            }

                          if(article.sections)
                            this.selectedSections = article.sections;
                          else
                            this.selectedSections = [];

                          if(this.selectedSections && this.selectedSections.length)
                            for(let section of this.selectedSections) {
                              sections = sections.filter(obj => obj._id != section._id);
                            }

                          this.sections = sections;
                          this.translations = translations;

                          this.articleForm.setValue({
                            name: article.name,
                          });
                        }
                      )
                  },
                  () =>
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error!',
                      detail: 'An error occurred while getting image. Please try again.'
                    })
                );
            },() =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting translations. Please try again.'
              })
          );
      });
  }


  public updateArticle(value: any) {
    if(!this.articleForm.valid || !this.selectedTranslations.length || !this.selectedSections.length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning!',
        detail: 'You have pick at least one translation, section and fill all the fields.'
      });
      return;
    }

    this.article.name = value.name;
    this.article.translations = this.selectedTranslations;
    this.article.sections = this.selectedSections;

    this.articleService.updateArticle(this.article);
  }

}
