import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Diagnosis } from 'src/app/entities/diagnosis';
import { Medication } from 'src/app/entities/medication';
import { Procedure } from 'src/app/entities/procedure';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { MedicationService } from 'src/app/services/medication.service';
import { ProcedureService } from 'src/app/services/procedure.service';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit {
  diagnosisForm!:any;
  procedureForm!:any;
  medicationForm!:any;

  displayedColumsDiagnosis: string[] = [
    'diagCode',
    'diagDescription',
    'diaDeprecated',
  ];
  dataSourceDiagnosis = new MatTableDataSource<Diagnosis>();
  displayedColumsProcedure: string[] = ['proCode', 'proDescription', 'proDeprecated'];

  dataSourceProcedure = new MatTableDataSource<Procedure>();
  displayedColumsMedication: string[] = ['drugID', 'drugName'];
  dataSourceMedication = new MatTableDataSource<Medication>();
  diagnosisDetails!: Diagnosis[];
  procedureDetails!: Procedure[];
  medicationDetails!: Medication[];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private diagnosisService: DiagnosisService,
    private procedureService: ProcedureService,
    private medicationService: MedicationService,
  ) { 

    this.diagnosisForm = this.fb.group({
      diagnosisId: [],
      diagnosisCode: [],
      diagnosisDescription: [],
      diagnosisIsDepricated: [],
    });

    this.procedureForm = this.fb.group({
      procedureId: [],
      procedureCode: [],
      procedureDescription: [],
      procedureIsDepricated: [],
    });

    this.medicationForm = this.fb.group({
      drugNo: [''],
      drugID: [''],
      drugName: [''],
    });
  }

  ngOnInit(): void {

    this.diagnosisService.getAllDiagnosis().subscribe((diagnosis) => {
      this.diagnosisDetails = diagnosis;
      this.dataSourceDiagnosis.data = this.diagnosisDetails;
      console.log('Diagnosis details: ',  this.dataSourceDiagnosis.data);
    });

    this.procedureService.getAllProcedure().subscribe((procedure) => {
      this.procedureDetails = procedure;
      this.dataSourceProcedure.data = this.procedureDetails
      console.log('Procedure details:',  this.dataSourceProcedure.data);
    });

    this.medicationService.getAllMedication().subscribe((response) => {
      this.medicationDetails = response;
      this.dataSourceMedication.data = this.medicationDetails;
    });

  
  }

  addDiagnosis(){
    console.log("Diagnosis form: " , this.diagnosisForm.value);
    this.diagnosisService.addDiagnosis(this.diagnosisForm.value).subscribe();
    window.location.reload();
  }

  addProcedure(){
    this.procedureService.addProcedure(this.procedureForm.value).subscribe();
    window.location.reload();
  }

  addMedication(){
    this.medicationService.addMedication(this.medicationForm.value).subscribe();
    window.location.reload();
  }

}
