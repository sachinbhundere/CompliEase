import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit{

    // constructor(private customerService: CustomerService, private productService: ProductService) { }

    selectedCategory: any = null;


    categories: any[] = [
        { name: 'Under 100', key: 'A' },
        { name: '101-300', key: 'B' },
        { name: '301-500', key: 'C' },
        { name: '501-1000', key: 'D' },
        { name: 'More than 1000', key: 'E' }
    ];

    ngOnInit() {
        this.selectedCategory = this.categories[1];
    }






}
