import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComplianceComponent } from './compliance.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ComplianceComponent }
	])],
	exports: [RouterModule]
})
export class ComplianceRoutingModule { }
