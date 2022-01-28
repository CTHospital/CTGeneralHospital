import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/entities/patient';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-approve-patient',
  templateUrl: './approve-patient.component.html',
  styleUrls: ['./approve-patient.component.css']
})
export class ApprovePatientComponent implements OnInit {

  disabled = false;
  patient: PatientRegistration[] = [];
  approvePatient!:PatientRegistration;

  displayedColumns = ['patientId', 'firstName', 'lastName','contactNumber', 'email', 'action'];
  dataSource = new MatTableDataSource<PatientRegistration>();
  id!:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() queryID =0;
  isAdmin:boolean = false;
  constructor(private router: Router,private route: ActivatedRoute, private patientRegistrationService : PatientRegistrationService) { }

  ngOnInit(): void {
    this.patientRegistrationService.getAllPatientList().subscribe(patient =>{
      this.patient = patient;
      this.dataSource.data = this.patient;
      console.log("Data source : " , this.dataSource.data);
    })
    // window.location.reload();
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

  approveRegistration(row:PatientRegistration) {
    this.patientRegistrationService.approvePatient(row).subscribe();
    window.location.reload();
    console.log("done");
  }

  updateStatus(status:any) {
    return status;
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
      pdf.text("Approve Patient list",10,10)
      const imgProps= pdf.getImageProperties(contentDataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(contentDataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("approovePatientDetails.pdf");
    })
  }
}
