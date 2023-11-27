import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    templateUrl: './policies.component.html'
})
export class PoliciesComponent {

    // selectedState: any = null;

    // states: any[] = [
    //     {name: 'Arizona', code: 'Arizona'},
    //     {name: 'California', value: 'California'},
    //     {name: 'Florida', code: 'Florida'},
    //     {name: 'Ohio', code: 'Ohio'},
    //     {name: 'Washington', code: 'Washington'}
    // ];

    // dropdownItems = [
    //     { name: 'Option 1', code: 'Option 1' },
    //     { name: 'Option 2', code: 'Option 2' },
    //     { name: 'Option 3', code: 'Option 3' }
    // ];

    // cities1: any[] = [];

    // cities2: any[] = [];

    // city1: any = null;

    // city2: any = null;

    files: Array<any>;
    filename: any;
    ID = 0;
    constructor(private sanitizer: DomSanitizer) { }
    ngOnInit() {this.filename = 'Access'
        // this.files = [
        //     "Biometric Data Download Process",
        //     "Camera settings"
        //   ]
    }
    viewDoc(name) {
        this.filename = name;
        this.ID = 1;
        // console.log(this.ID + this.filename);

      }

      docURL() {
        // window.scroll(0, 350);
        var dgg = this.sanitizer.bypassSecurityTrustResourceUrl("assets/Documents/" + this.filename + ".pdf");
        console.log(dgg)
        return this.sanitizer.bypassSecurityTrustResourceUrl("assets/Documents/" + this.filename + ".pdf");
      }
}
