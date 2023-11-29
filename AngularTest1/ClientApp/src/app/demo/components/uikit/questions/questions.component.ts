import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit {
    example: string;
    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state as { example: string };
        this.example = state.example;
    }

    selectedCategory: any = null;

    leftDisabled: boolean = true;
    rightDisabled: boolean = false;
    qIndex: number = 0;

    Questions: any[] = null;
    //add questions based on the card heading in following json array
    categories: any[] = [{
        card: 'Onboarding',
        questions:
            [{
                question: '1. How many computer users do you have?',
                options: [{ name: 'Under 100', key: 'A' },
                { name: '101-300', key: 'B' },
                { name: '301-500', key: 'C' },
                { name: '501-1000', key: 'D' },
                { name: 'More than 1000', key: 'E' }]
            }, {
                question: '2. How many mobiles users do you have?',
                options: [{ name: 'Under 100', key: 'A' },
                { name: '101-3070', key: 'B' },
                { name: '301-500', key: 'C' },
                { name: '501-1000', key: 'D' },
                { name: 'More than 1000', key: 'E' }]
            },
            {
                question: '3. How many laptops users do you have?',
                options: [{ name: 'Under 1000', key: 'A' },
                { name: '101-300', key: 'B' },
                { name: '301-500', key: 'C' },
                { name: '501-1000', key: 'D' },
                { name: 'More than 1000', key: 'E' }]
            }
            ]
    },
    {
        card: 'Access',
        questions:
            [{
                question: '1. How many  do you have?',
                options: [{ name: 'Under 100', key: 'A' },
                { name: '101-300', key: 'B' },
                { name: '301-500', key: 'C' },
                { name: '501-1000', key: 'D' },
                { name: 'More than 1000', key: 'E' }]
            }, {
                question: '2. How many mobiles uve?',
                options: [{ name: 'Under 100', key: 'A' },
                { name: '101-3070', key: 'B' },
                { name: '301-500', key: 'C' },
                { name: '501-1000', key: 'D' },
                { name: 'More than 1000', key: 'E' }]
            }

            ]
    }];

    ngOnInit() {
        //  this.selectedCategory = this.categories[1];
        // console.log(this.example);
        this.categories.forEach(element => {
            if (element.card == this.example) {
                this.Questions = [];
                this.Questions = element.questions
            }
        });

    }

    switchQuestion(Direction) {
        if (Direction == 'Next') {
            this.qIndex = this.qIndex + 1
        } else {
            this.qIndex = this.qIndex - 1
        }
        if (this.qIndex > 0) {
            this.leftDisabled = false;
        } else {
            this.leftDisabled = true;
        }
        if ((this.qIndex + 1) < this.Questions.length) {
            this.rightDisabled = false
        } else {
            this.rightDisabled = true
        }

    }







}
