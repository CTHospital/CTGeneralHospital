import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  checked1: boolean = false;
  checked2: boolean = true;
  disabled = false;
  patient: PatientRegistration[] = [];

  displayedColumns = ['patientId', 'firstName', 'lastName','contactNumber', 'email', 'status', 'blockAction'];
  dataSource = new MatTableDataSource<PatientRegistration>();
  id!:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() queryID =0;
  isAdmin:boolean = false;
  constructor(private router: Router,private route: ActivatedRoute, private patientRegistrationService : PatientRegistrationService) { }

  ngOnInit(): void {
    this.patientRegistrationService.getAllActivePatientList().subscribe(patient =>{
      this.patient = patient;
      this.dataSource.data = this.patient;
      console.log("Data source : " , this.dataSource.data);
      
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    console.log("filter value", filterValue);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  activeToInactiveStatus(patient:PatientRegistration) {
    console.log(patient);
    this.patientRegistrationService.activeToInactiveStatus(patient).subscribe();
    window.location.reload();
  }
  inactiveToActiveStatus(patient:PatientRegistration) {
    console.log(patient);
    this.patientRegistrationService.inactiveToActiveStatus(patient).subscribe();
    window.location.reload();
  }

  unblockToBlockStatus(patient:PatientRegistration) {
    console.log(patient);
    this.patientRegistrationService.unblockToBlockStatus(patient).subscribe();
    window.location.reload();
  }

  blockToUnblockStatus(patient:PatientRegistration) {
      this.patientRegistrationService.blockToUnblockStatus(patient).subscribe();
      window.location.reload();
  }

  downloadPatientList(){
    let doc = new jsPDF();
    let data = document.getElementById("content")
   this.generatePdf(data);
  }

  generatePdf(data:any){
    html2canvas(data).then(canvas =>{
      const contentDataUrl = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p','pt','a4');
      const imgProps= pdf.getImageProperties(contentDataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(contentDataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("patientDetails.pdf");
    })
  }
}
