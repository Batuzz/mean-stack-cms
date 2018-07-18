import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { RouterModule } from "@angular/router";
import { ROUTES } from "./app.routes";
import { UserService } from "./user/user.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LanguageNewComponent } from './language/language-new/language-new.component';
import { LanguageListComponent } from './language/language-list/language-list.component';
import { LanguageDetailComponent } from './language/language-detail/language-detail.component';
import { LanguageService } from "./language/language.service";
import { TranslationListComponent } from './translation/translation-list/translation-list.component';
import { TranslationService } from "./translation/translation.service";
import { TranslationDetailComponent } from './translation/translation-detail/translation-detail.component';
import { TranslationNewComponent } from './translation/translation-new/translation-new.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuNewComponent } from './menu/menu-new/menu-new.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';
import { MenuService } from "./menu/menu.service";
import { PollListComponent } from './poll/poll-list/poll-list.component';
import { PollNewComponent } from './poll/poll-new/poll-new.component';
import { PollDetailComponent } from './poll/poll-detail/poll-detail.component';
import { SubmenuNewComponent } from './submenu/submenu-new/submenu-new.component';
import { SubmenuListComponent } from './submenu/submenu-list/submenu-list.component';
import { SubmenuDetailComponent } from './submenu/submenu-detail/submenu-detail.component';
import { SubmenuService } from "./submenu/submenu.service";
import { PollService } from "./poll/poll.service";
import { MenuViewComponent } from './menu/menu-view/menu-view.component';
import { HomepageComponent } from './homepage/homepage.component';
import { JwtInterceptor } from "./_helpers/jwt.inceptor";
import { AuthGuard } from "./_guards/auth.guard";
import { PollQuestionNewComponent } from './poll-question/poll-question-new/poll-question-new.component';
import { PollQuestionDetailComponent } from './poll-question/poll-question-detail/poll-question-detail.component';
import { PollQuestionListComponent } from './poll-question/poll-question-list/poll-question-list.component';
import { PollAnswerNewComponent } from './poll-answer/poll-answer-new/poll-answer-new.component';
import { PollAnswerDetailComponent } from './poll-answer/poll-answer-detail/poll-answer-detail.component';
import { PollAnswerListComponent } from './poll-answer/poll-answer-list/poll-answer-list.component';
import { PollAnswerService } from "./poll-answer/poll-answer.service";
import { PollQuestionService } from "./poll-question/poll-question.service";
import { LanguagesFilterPipe } from "./language/language-filter.pipe";
import { MenuFilterPipe } from "./menu/menu-filter.pipe";
import { PollFilterPipe } from "./poll/poll-filter.pipe";
import { PollAnswerFilterPipe } from "./poll-answer/poll-answer-filter.pipe";
import { PollQuestionFilterPipe } from "./poll-question/poll-question-filter.pipe";
import { SubmenuFilterPipe } from "./submenu/submenu-filter.pipe";
import { TranslationFilterPipe } from "./translation/translation-filter.pipe";
import { TranslationPipe } from "./_pipes/TranslationPipe";
import { TranslationTextFilterPipe } from "./translation/translation.text-filter.pipe";
import { SubmenuURLFilterPipe} from "./submenu/submenu.url-filter.pipe";
import { MenuURLFilterPipe } from "./menu/menu.url-filter.pipe";
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import {
  AccordionModule, AutoCompleteModule, ColorPickerModule, DataListModule, DropdownModule, FileUploadModule,
  PickListModule, RadioButtonModule
} from "primeng/primeng";
import { ImageNewComponent } from './image/image-new/image-new.component';
import { ImageDetailComponent } from './image/image-detail/image-detail.component';
import { ImageListComponent } from './image/image-list/image-list.component';
import { ImageService } from "./image/image.service";
import { SectionDetailComponent } from './section/section-detail/section-detail.component';
import { SectionNewComponent } from './section/section-new/section-new.component';
import { SectionListComponent } from './section/section-list/section-list.component';
import { GrowlModule } from "primeng/growl";
import { MessageService } from "primeng/components/common/messageservice";
import { GrowlMessagesComponent } from './growl-messages/growl-messages.component';
import { SectionService } from "./section/section.service";
import { TranslationLanguageFilterPipe } from "./translation/translation.language-filter.pipe";
import { ArticleNewComponent } from './article/article-new/article-new.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleService } from "./article/article.service";
import { EditorModule } from "primeng/editor";
import { ArticleViewComponent } from './article/article-view/article-view.component';
import { PollViewComponent } from './poll/poll-view/poll-view.component';
import { FooterComponent } from './footer/footer.component';
import { LoginGuard } from "./_guards/login.guard";
import { AboutComponent } from './about/about.component';
import { ChartComponent } from './chart/chart.component';
import {ChartModule} from "primeng/chart";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LanguageNewComponent,
    LanguageListComponent,
    LanguageDetailComponent,
    TranslationListComponent,
    TranslationDetailComponent,
    TranslationNewComponent,
    MenuListComponent,
    MenuNewComponent,
    MenuDetailComponent,
    PollListComponent,
    PollNewComponent,
    PollDetailComponent,
    SubmenuNewComponent,
    SubmenuListComponent,
    SubmenuDetailComponent,
    MenuViewComponent,
    HomepageComponent,
    PollQuestionNewComponent,
    PollQuestionDetailComponent,
    PollQuestionListComponent,
    PollAnswerNewComponent,
    PollAnswerDetailComponent,
    PollAnswerListComponent,
    LanguagesFilterPipe,
    MenuFilterPipe,
    PollFilterPipe,
    PollAnswerFilterPipe,
    PollQuestionFilterPipe,
    SubmenuFilterPipe,
    SubmenuURLFilterPipe,
    MenuURLFilterPipe,
    TranslationFilterPipe,
    TranslationPipe,
    TranslationTextFilterPipe,
    UserProfileComponent,
    ImageNewComponent,
    ImageDetailComponent,
    ImageListComponent,
    SectionDetailComponent,
    SectionNewComponent,
    SectionListComponent,
    GrowlMessagesComponent,
    TranslationLanguageFilterPipe,
    ArticleNewComponent,
    ArticleDetailComponent,
    ArticleListComponent,
    ArticleViewComponent,
    PollViewComponent,
    FooterComponent,
    AboutComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FileUploadModule,
    AccordionModule,
    DataListModule,
    GrowlModule,
    PickListModule,
    DropdownModule,
    AutoCompleteModule,
    EditorModule,
    RadioButtonModule,
    ChartModule,
    ColorPickerModule,
  ],
  providers: [
    LanguageService,
    TranslationService,
    MenuService,
    SubmenuService,
    PollService,
    AuthGuard,
    LoginGuard,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    PollAnswerService,
    PollQuestionService,
    ImageService,
    MessageService,
    SectionService,
    ArticleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    if(!localStorage.getItem('language'))
      localStorage.setItem('language', 'en');
  }
}
