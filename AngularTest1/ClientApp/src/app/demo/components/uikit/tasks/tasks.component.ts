import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit{
    customers1: Customer[] = [];
    loading: boolean = true;
    tableData: Array<any>;
    cols: any[];
    selectedValues: Array<any> = [];
    collectionSize: any;
    customers2: Customer[] = [];
    products: Product[] = [];
    customers3: Customer[] = [];
    constructor(private customerService: CustomerService, private productService: ProductService) { }
    ngOnInit() {
        this.cols = [
            { field: 'Name', header: 'Name' },
            { field: 'Policy', header: 'Policy' },
            { field: 'Status', header: 'Status' },
            { field: 'Severity', header: 'Severity' },
            { field: 'Owner', header: 'Owner' },
            { field: 'Plan', header: 'Plan' },
            { field: 'DueDate', header: 'Due Date' },
            { field: 'ImpScore', header: 'Imp. Score' },
            { field: 'Evidence', header: 'Evidence' }
          ];

          this.tableData = [];
this.tableData = [
      {
        "Name": "Performing vulnerability assessments of public-facing system and network devices",
        "Policy": "vulnerability Management",
        "Status": "Done",
        "Severity": "Critical",
        "Owner": "Priyanka",
        "Plan": "Short Term",
        "DueDate": "Aug 8, 2023",
        "ImpScore": "0.94%",
        "Evidence": "None"
      },
      {
        "Name": "Performing vulnerability assessments of public-facing system and network devices",
        "Policy": "vulnerability Management",
        "Status": "Done",
        "Severity": "Critical",
        "Owner": "Priyanka",
        "Plan": "Short Term",
        "DueDate": "Aug 8, 2023",
        "ImpScore": "0.94%",
        "Evidence": "None"
      },
      {
        "Name": "Performing vulnerability assessments of public-facing system and network devices",
        "Policy": "vulnerability Management",
        "Status": "Done",
        "Severity": "Critical",
        "Owner": "Priyanka",
        "Plan": "Short Term",
        "DueDate": "Aug 8, 2023",
        "ImpScore": "0.94%",
        "Evidence": "None"
      },
      {
        "Name": "Performing vulnerability assessments of public-facing system and network devices",
        "Policy": "vulnerability Management",
        "Status": "Done",
        "Severity": "Critical",
        "Owner": "Priyanka",
        "Plan": "Short Term",
        "DueDate": "Aug 8, 2023",
        "ImpScore": "0.94%",
        "Evidence": "None"
      },
      {
        "Name": "Performing vulnerability assessments of public-facing system and network devices",
        "Policy": "vulnerability Management",
        "Status": "Done",
        "Severity": "Critical",
        "Owner": "Priyanka",
        "Plan": "Short Term",
        "DueDate": "Aug 8, 2023",
        "ImpScore": "0.94%",
        "Evidence": "None"
      }

   ];

          this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);
    }

    onTableHeaderCheckboxToggle(event: any) {
        // console.log('otct')
        if (event.checked === true) {
          //  console.log('checked')
          //  console.log(this.selectedValues)
        } else {
          // console.log('else')
          // console.log(this.selectedValues)
        }
      }


}
