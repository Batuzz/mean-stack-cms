import { Routes } from '@angular/router';

import { LoginFormComponent } from "./user/login-form/login-form.component";
import { LanguageNewComponent } from "./language/language-new/language-new.component";
import { LanguageListComponent } from "./language/language-list/language-list.component";
import { LanguageDetailComponent } from "./language/language-detail/language-detail.component";
import { TranslationListComponent } from "./translation/translation-list/translation-list.component";
import { TranslationDetailComponent } from "./translation/translation-detail/translation-detail.component";
import { MenuNewComponent } from "./menu/menu-new/menu-new.component";
import { MenuListComponent } from "./menu/menu-list/menu-list.component";
import { MenuDetailComponent } from "./menu/menu-detail/menu-detail.component";
import { TranslationNewComponent } from "./translation/translation-new/translation-new.component";
import { SubmenuDetailComponent } from "./submenu/submenu-detail/submenu-detail.component";
import { SubmenuListComponent } from "./submenu/submenu-list/submenu-list.component";
import { SubmenuNewComponent } from "./submenu/submenu-new/submenu-new.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { AuthGuard } from "./_guards/auth.guard";
import { PollAnswerNewComponent } from "./poll-answer/poll-answer-new/poll-answer-new.component";
import { PollAnswerListComponent } from "./poll-answer/poll-answer-list/poll-answer-list.component";
import { PollAnswerDetailComponent } from "./poll-answer/poll-answer-detail/poll-answer-detail.component";
import { PollQuestionNewComponent } from "./poll-question/poll-question-new/poll-question-new.component";
import { PollQuestionListComponent } from "./poll-question/poll-question-list/poll-question-list.component";
import { PollQuestionDetailComponent } from "./poll-question/poll-question-detail/poll-question-detail.component";
import { PollNewComponent } from "./poll/poll-new/poll-new.component";
import { PollListComponent } from "./poll/poll-list/poll-list.component";
import { PollDetailComponent } from "./poll/poll-detail/poll-detail.component";
import { UserProfileComponent } from "./user/user-profile/user-profile.component";
import { ImageNewComponent } from "./image/image-new/image-new.component";
import { ImageListComponent } from "./image/image-list/image-list.component";
import { ImageDetailComponent } from "./image/image-detail/image-detail.component";
import { SectionNewComponent } from "./section/section-new/section-new.component";
import { SectionListComponent } from "./section/section-list/section-list.component";
import { SectionDetailComponent } from "./section/section-detail/section-detail.component";
import { ArticleNewComponent } from "./article/article-new/article-new.component";
import { ArticleDetailComponent } from "./article/article-detail/article-detail.component";
import { ArticleListComponent } from "./article/article-list/article-list.component";
import { ArticleViewComponent } from "./article/article-view/article-view.component";
import { PollViewComponent } from "./poll/poll-view/poll-view.component";
import { LoginGuard } from "./_guards/login.guard";
import { AboutComponent } from "./about/about.component";
import { ChartComponent } from "./chart/chart.component";

export const ROUTES: Routes = [
  { path: 'login', component: LoginFormComponent, canActivate: [LoginGuard] },
  { path: 'homepage', component: HomepageComponent },
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthGuard] },

  /* Language */
  { path: 'language/new', component: LanguageNewComponent, canActivate: [AuthGuard] },
  { path: 'language/list', component: LanguageListComponent, canActivate: [AuthGuard] },
  { path: 'language/detail/:id', component: LanguageDetailComponent, canActivate: [AuthGuard] },

  /* Translation */
  { path: 'translation/new', component: TranslationNewComponent, canActivate: [AuthGuard] },
  { path: 'translation/list', component: TranslationListComponent, canActivate: [AuthGuard] },
  { path: 'translation/detail/:id', component: TranslationDetailComponent, canActivate: [AuthGuard] },

  /* Menu */
  { path: 'image/new', component: ImageNewComponent, canActivate: [AuthGuard] },
  { path: 'image/list', component: ImageListComponent, canActivate: [AuthGuard] },
  { path: 'image/detail/:id', component: ImageDetailComponent, canActivate: [AuthGuard] },

  /* Menu */
  { path: 'menu/new', component: MenuNewComponent, canActivate: [AuthGuard] },
  { path: 'menu/list', component: MenuListComponent, canActivate: [AuthGuard] },
  { path: 'menu/detail/:id', component: MenuDetailComponent, canActivate: [AuthGuard] },

  /* Submenu */
  { path: 'submenu/new', component: SubmenuNewComponent, canActivate: [AuthGuard] },
  { path: 'submenu/list', component: SubmenuListComponent, canActivate: [AuthGuard] },
  { path: 'submenu/detail/:id', component: SubmenuDetailComponent, canActivate: [AuthGuard] },

  /* Poll */
  { path: 'poll/new', component: PollNewComponent, canActivate: [AuthGuard] },
  { path: 'poll/list', component: PollListComponent, canActivate: [AuthGuard] },
  { path: 'poll/detail/:id', component: PollDetailComponent, canActivate: [AuthGuard] },
  { path: 'poll/:name', component: PollViewComponent },
  { path: 'chart/:name', component: ChartComponent },

  /* Poll Questions */
  { path: 'poll/question/new', component: PollQuestionNewComponent, canActivate: [AuthGuard] },
  { path: 'poll/question/list', component: PollQuestionListComponent, canActivate: [AuthGuard] },
  { path: 'poll/question/detail/:id', component: PollQuestionDetailComponent, canActivate: [AuthGuard] },

  /* Poll Answers */
  { path: 'poll/answer/new', component: PollAnswerNewComponent, canActivate: [AuthGuard] },
  { path: 'poll/answer/list', component: PollAnswerListComponent, canActivate: [AuthGuard] },
  { path: 'poll/answer/detail/:id', component: PollAnswerDetailComponent, canActivate: [AuthGuard] },

  /* Sections */
  { path: 'section/new', component: SectionNewComponent, canActivate: [AuthGuard] },
  { path: 'section/list', component: SectionListComponent, canActivate: [AuthGuard] },
  { path: 'section/detail/:id', component: SectionDetailComponent, canActivate: [AuthGuard] },

  /* Articles */
  { path: 'article/new', component: ArticleNewComponent, canActivate: [AuthGuard] },
  { path: 'article/list', component: ArticleListComponent, canActivate: [AuthGuard] },
  { path: 'article/detail/:id', component: ArticleDetailComponent, canActivate: [AuthGuard] },
  { path: 'article/:name', component: ArticleViewComponent },
];
