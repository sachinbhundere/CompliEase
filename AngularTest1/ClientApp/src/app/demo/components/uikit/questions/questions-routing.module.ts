import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: QuestionsComponent }
	])],
	exports: [RouterModule]
})
export class QuestionsRoutingModule { }
