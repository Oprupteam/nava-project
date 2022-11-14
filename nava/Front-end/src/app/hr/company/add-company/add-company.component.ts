import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Partner } from '../partner';
import { environment } from '../../../../environments/environment'
import { TranslateService } from '@ngx-translate/core';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  model!: NgbDateStruct;
  partners: any;
  partner:any;
  partnerById:any;
  public subscriptions: Subscription[] = [];
  // private apiServerUrl = environment.apiBaseUrl
  selectAFile: File = null as any;
  filesPreview: File[] = [];
  img: any;

  constructor(
    private translate: TranslateService,
    private companyService:CompanyService,
    private modalService: NgbModal,
    private http: HttpClient,
    ) { }

  companyData = {
    companyName: '',
    tradingName: '',
    commercialNo: '',
    commercialName: '',
    issuesCommercialRegistration:'',
    commercialRegistrationExpiry :' ',
    municipalLicenseNo: '',
    issuesMunicipalLicenseNo: '',
    municipalLicenseNoExpiry:'',
    capitalAsPerCR: '',
    taxNo: '',
    companyLogo: '',
    activityType: '',
    deleteFlag: 1,
  }

  partnerData = {
    partnerName: '',
    nationality: '',
    cardNumber: '',
    percentage: '',
    deleteFlag: 1,
  }

  ngOnInit(): void {
    this.getAllPartner();
    // this.partnerById
    // this.getPartnerById(partnerId);
  }

// upload img
  onPreviewFileSelect(event:any) {
    // console.log(event.addedFiles[0].name)
    if(this.filesPreview.length<1)
      {
      // console.log(event);
		  this.filesPreview.push(...event.addedFiles);
      this.img = event.addedFiles
      this.companyData.companyLogo = event.addedFiles[0].name
      }
	}
  onPreviewFileRemove(event:any) {
		// console.log(event);
		this.filesPreview.splice(this.filesPreview.indexOf(event), 1);
	}

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

// $event.target.files
  // define a function to upload files
  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name); }
    this.companyService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    // console.log(httpEvent)
    switch(httpEvent.type) {
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          // console.log(httpEvent);
          break;

    }
  }
// upload img

  public convertDate(date:any){
    return `${date.year}-${date.month}-${date.day}`
  }


  public addCompany(): void{

    this.companyData.issuesCommercialRegistration =
     this.convertDate(this.companyData.issuesCommercialRegistration)
    this.companyData.commercialRegistrationExpiry =
     this.convertDate(this.companyData.commercialRegistrationExpiry)
    this.companyData.issuesMunicipalLicenseNo =
     this.convertDate(this.companyData.issuesMunicipalLicenseNo)
    this.companyData.municipalLicenseNoExpiry =
     this.convertDate(this.companyData.municipalLicenseNoExpiry)

    this.onUploadFiles(this.img)

    this.companyService.addCompany(this.companyData).subscribe(
    )
  }

  onFileSelected(event:any) {
    this.selectAFile = <File>event.target.files[0]
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectAFile, this.selectAFile.name);
    console.log(fd)
    this.http.post('uploadData', fd).subscribe(res => {
      console.log(res)
    })
  }


  public addPartner(): void{
    this.companyService.addPartner(this.partnerData).subscribe(
      () => {this.getAllPartner()}
    )
    this.partnerData.partnerName = ''
    this.partnerData.nationality = ''
    this.partnerData.cardNumber = ''
    this.partnerData.percentage = ''
  }

  getAllPartner(){
    this.companyService.getAllPartner()
    .subscribe(data => this.partners = data)
  }

  Select2Open(select2modal:any) {

    this.modalService.open(select2modal);

  }
  Select2Update(select2modal:any,p:any) {
    this.partnerData=p
    this.modalService.open(select2modal);

  }
  deletePartner(partnerId: Partner){
    this.companyService.deletePartner(partnerId).subscribe(
      () => {this.getAllPartner()}
    );
   }



   updatePartner(){
    this.companyService.updatePartner(this.partners).subscribe(
    )
  }

   getPartnerById(partnerId: number){
    this.companyService.getPartnerById(partnerId).subscribe(data=>{
     this.partner=data
     return this.partner
    })
  }
}
