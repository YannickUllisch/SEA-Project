import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { SurveyComponent } from './survey/survey.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'survey', component: SurveyComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
