import { Component, OnInit } from '@angular/core';
import { TranslationService } from "../../translation/translation.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";
import { ArticleService } from "../article.service";
import { Article } from "../article.class";
import { Translation } from "../../translation/translation.interface";
import { Section } from "../../section/section.interface";
import { SectionService } from "../../section/section.service";

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss', '../../../assets/forms.scss']
})
export class ArticleNewComponent implements OnInit {

  public article: Article = new Article();
  public translations: Translation[];
  public selectedTranslations: Translation[] = [];
  public articleForm: FormGroup;
  public sections: Section[];
  public selectedSections: Section[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public ts: TranslationService,
    private messageService: MessageService,
    private articleService: ArticleService,
    private sectionService: SectionService,
  ) {
    this.articleForm = formBuilder.group({
      name: [ null, [
        Validators.required,
      ]]
    });
    this.ts.getTranslations()
      .subscribe(
        translations => this.translations = translations,
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting translations. Please try again.'
          })
      );
    this.sectionService.getSections()
      .subscribe(
        sections => this.sections = sections,
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting sections. Please try again.'
          })
      )
  }

  ngOnInit() { }

  public createArticle(value: any) {
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

    this.articleService.createArticle(this.article);
  }

}
