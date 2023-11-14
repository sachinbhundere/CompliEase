import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { ComplianceComponent } from './compliance.component';
import { BadgeModule } from 'primeng/badge';
import { ComplianceRoutingModule } from './compliance-routing.module';
import { KnobModule } from 'primeng/knob';
import { ScrollerModule } from 'primeng/scroller';
import { MenuModule } from 'primeng/menu';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ComplianceRoutingModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
        CardModule,
        ChipModule,
        ProgressBarModule,
        ButtonModule,
        BadgeModule,
        KnobModule,
        ScrollerModule,
        MenuModule
	],
	declarations: [ComplianceComponent]
})
export class ComplianceModule { }
