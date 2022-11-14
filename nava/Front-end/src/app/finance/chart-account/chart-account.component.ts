import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import { FinanceService } from '../finance.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

interface FoodNodeFlat {
  name: string;
  Code: number;
  parentCode: number|null;
  children?: FoodNodeFlat[];
  id:number;

 }

 /** Flat node with expandable and level information */
 interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
 }
@Component({
  selector: 'app-chart-account',
  templateUrl: './chart-account.component.html',
  styleUrls: ['./chart-account.component.scss']
})
export class ChartAccountComponent implements OnInit {
  form: FormGroup = new FormGroup({
    parentAccount:new FormControl(''),
    accountName: new FormControl(''),
    accountType: new FormControl(''),
    accountCode: new FormControl(''),

});
coaData = {
  accountId: '',
  parentAccount: '',
  accountName:  '',
  accountType:'',
  accountCode:'',
  accountDescription:'',
  deleteFlag: 1,
  accountValue: 0,
  transDebit: 0,
  transCredit: 0,
  finalBalance: 0
};

mainAccounts:any[]=[]
codes:any[]=[]

  @ViewChild('chartAccountprint') chartElement!: ElementRef;
  pdfTable!: ElementRef;


  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  TREE_DATA: FoodNodeFlat[] = [

  ]


    private _transformer = (node: FoodNodeFlat, level: number) => {
      return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      };
      }
      treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);
       treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);
       dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
     constructor(private financeService:FinanceService, private router: Router ,
      private modalService: NgbModal,public fb: FormBuilder,

      // Language code
      private translate: TranslateService,
      ) {

        // Language code
        // this.translate.setDefaultLang('ar');
        // const lang = localStorage.getItem('lang')  || 'ar';
        // this.translate.use(lang);
        // document.documentElement.lang = lang;
      }
      hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
     ngOnInit() {

      this.dataSource.data =this.treeConstruct(this.TREE_DATA);
      this.getTree()
      this.getMainAccounts();

      this.form = this.fb.group(
        {
          parentAccount:['', Validators.required],
          accountName:['',Validators.required],
          accountType: ['',Validators.required],
          accountCode: ['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],

     })

    }

    treeConstruct(treeData) {
      let constructedTree = [];
      for (let i of treeData) {
        let treeObj = i;
        let assigned = false;
        this.constructTree(constructedTree, treeObj, assigned)
      }
      return constructedTree;
    }

    constructTree(constructedTree, treeObj, assigned) {
      if (treeObj.parentCode == 0) {
            treeObj.children = [];
            constructedTree.push(treeObj);
            return true;
          } else if (treeObj.parentCode == constructedTree.Code) {
            treeObj.children = [];
            constructedTree.children.push(treeObj);
            return true;
          }
          else {
            if (constructedTree.children != undefined) {
              for (let index = 0; index < constructedTree.children.length; index++) {
                let constructedObj = constructedTree.children[index];
                if (assigned == false) {
                  assigned = this.constructTree(constructedObj, treeObj, assigned);
                }
              }
            } else {
              for (let index = 0; index < constructedTree.length; index++) {
                let constructedObj = constructedTree[index];
                if (assigned == false) {
                  assigned = this.constructTree(constructedObj, treeObj, assigned);
                }
              }
            }
            return false;
          }
        }
    displayedColumns: string[] = ['code','name', 'count'];
coaResponse;
getTree(){
  this.financeService.getCoa().subscribe((response)=>{
    // accountCode: "1"
    // accountDescription: null
    // accountId: 1
    // accountName: "asset"
    // accountType: "main"
    // deleteFlag: 1
    // parentAccount: null


    this.coaResponse=response
    console.log("data  before",    this.coaResponse=response
    )
    // const updateTotal = (r, o) => r + (
    //   o.accountValue = (o.children || []).reduce(updateTotal, 0) || o.accountValue || 0
    // ),
    //  data=this.dataSource.data

    // data.reduce(updateTotal, 0);
    // console.log("data  After",data)
    //this.dataSource.data=data
    response.forEach((element)=>{
      this.TREE_DATA.push({ name: element.accountCode+'-'+element.accountName,Code: element.accountCode,
         parentCode:element.parentAccount,id:element.accountId})
    })
    this.dataSource.data =this.treeConstruct(this.TREE_DATA);



  })
    }
    filterData($event: any){
      this.TREE_DATA.filter = $event.target.value;
    }
    onSort({column, direction}: SortEvent | any) {
      // resetting other headers
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });}


@ViewChild('TABLE', { static: false })
TABLE!: ElementRef;
title = 'Excel';

      ExportTOExcel() {
        let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);

        delete (ws['D1'])
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'ScoreSheet.xlsx');
      }


      public generatePDF(): void {

        html2canvas(this.chartElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
          const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');

          const fileWidth = 210;
          const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
          let PDF = new jsPDF('p', 'mm', 'a4',);
          PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
           PDF.html(this.chartElement.nativeElement.innerHTML)
          PDF.save(`Reports.pdf`);
        });
      }
      printPage() {
        window.print();

      }




  public onEditAccountById (node:any){
    node=node.name.slice(0,node.name.indexOf('-'))
    this.financeService.getAccountByCode(node).subscribe((data:any)=>{
      console.log(data);
      this.router.navigate(['/ChartAccount/ChartAccount/update', data[0].accountId])
    })}


    public onPrintAccountById (node:any){
      node=node.name.slice(0,node.name.indexOf('-'))
      this.financeService.getAccountByCode(node).subscribe((data:any)=>{
        console.log(data);
        this.router.navigate(['/ChartAccount/ChartAccount/print', data[0].accountId])
      })

          // dataSource._data._value.forEach((element)=>{

          //  })
        }

        Select2Open(select2modal:any) {this.modalService.open(select2modal);}
        submitted = false;
        get f(): { [key: string]: AbstractControl } {
          return this.form.controls;
        }

        GenerateAccountCode(event:any){
          var parId= (event.target as HTMLInputElement).value;
         // alert((parId))
         // alert(event)
          this.financeService.getAccountsByParent(parId).subscribe((data:any)=>{
          if(data.length == 0){
             this.coaData.accountCode=parId+'0'
            // console.log(parId);
            }
          else{
           // console.log(data);

            let max=0;
            data.forEach(element=>{
              Number(element.accountCode)>max?max=Number(element.accountCode):''
            })
            this.coaData.accountCode=(max+1).toString()
          }
          })
         // console.log(this.coaData.accountCode);

         }

         getMainAccounts(){
          this.financeService.getCoa().subscribe((data)=>{


            const filtered=data.filter(element=>{
              return element.accountType=='main'
            })
            for (let i = 1; i <=8; i++) {
              filtered.forEach(element => {
                if(element.accountCode.toString()[0] ==i)
                this.mainAccounts.push(element)
              });

            }
            console.log('accounnnnt',this.mainAccounts);


          })
         }

         public onAddAccounts(): void {

          this.submitted = true;
          if (this.form.invalid) {
            return;
          }
          if(this.codes.includes(this.coaData.accountCode)){
            Swal.fire(this.translate.instant('Error'), this.translate.instant('accountcodeisexist,trytochangeit!'), 'error')
            return
          }

           this.financeService.addAcount(this.coaData).subscribe(
             (response) => {

               console.log(response);
               Swal.fire(this.translate.instant('success'), this.translate.instant('Dataisadded'), 'success')
               this.financeService.getCoa();

             },
             (error: HttpErrorResponse) => {
              console.log(this.coaData);

               alert(error.message);
               Swal.fire(this.translate.instant('Error'), this.translate.instant('ErrorwhileaddingData'),
               'error')
               }
           );
            }
  }
