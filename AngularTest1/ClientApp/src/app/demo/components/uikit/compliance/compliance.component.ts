import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './compliance.component.html'
})
export class ComplianceComponent {

    selectedState: any = null;
    items!: MenuItem[];
    value!: number;
    states: any[] = [
        {name: 'Arizona', code: 'Arizona'},
        {name: 'California', value: 'California'},
        {name: 'Florida', code: 'Florida'},
        {name: 'Ohio', code: 'Ohio'},
        {name: 'Washington', code: 'Washington'}
    ];

    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    cities1: any[] = [];

    cities2: any[] = [];

    city1: any = null;

    city2: any = null;

    ngOnInit() {

        this.value = 94;
    }

}
