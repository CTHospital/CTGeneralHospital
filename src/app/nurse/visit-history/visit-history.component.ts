import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/entities/appointments';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { PatientVisit } from 'src/app/entities/patient-visit';
import { User } from 'src/app/entities/user';
import { PatientVisitService } from 'src/app/services/patient-visit.service';
import { SchedulingService } from 'src/app/services/scheduling.service';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css']
})
export class VisitHistoryComponent implements OnInit {

  pId!:any;
  visitDetails:PatientVisit[] =[];
  appointmentDetails:Appointments[] = [];
  patientDetailsFromLogin!:PatientRegistration;
  userDetailsFromLogin!:User;
  isVisitAvailable:boolean =false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientVisitService:PatientVisitService,
    private schedulingService:SchedulingService
  ) { }

  ngOnInit(): void {

    this.userDetailsFromLogin = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    console.log("user Details from login: ", this.userDetailsFromLogin);

    if(this.userDetailsFromLogin.userRoleId.roleType === "Patient"){
      this.patientDetailsFromLogin = JSON.parse(sessionStorage.getItem('patientDetails') || '{}');
      console.log("PAtient Details from login: ", this.patientDetailsFromLogin);
      this.patientVisitService.getPatientVisitHistoryForPatient(this.patientDetailsFromLogin.patientId).subscribe(response =>{
        // this.visitDetails = response;
        // console.log("Visit History", this.visitDetails);
        response.forEach(element =>{
          console.log("Element data: " ,  element)
          this.visitDetails.push(element);
          // if(element.visitStatus === null){
          //   this.isVisitAvailable = true;
          // }
        })

      })

      console.log("visit details" , this.visitDetails)
      // if(this.visitDetails.length === 0){
      //   this.isVisitAvailable = true;
      // }else{
      //   this.isVisitAvailable = false;
      // }
     

    }
   
    if(this.userDetailsFromLogin.userRoleId.roleType === "Physician" || this.userDetailsFromLogin.userRoleId.roleType === "Nurse"){
      if (this.route.snapshot.paramMap.get('patientId') !== null) {
        this.pId = this.route.snapshot.paramMap.get('patientId');
        console.log('id from patient list', this.pId)
  
        this.patientVisitService.getPatientVisitHistoryForPatient(this.pId).subscribe(response =>{
          // this.visitDetails = response;
          // console.log("Visit History", this.visitDetails);
          response.forEach(element =>{
            console.log("Element data: " ,  element)
            this.visitDetails.push(element);
            // if(element.visitStatus === null){
            //   this.isVisitAvailable = true;
            // }
          })
  
        })
  
        console.log("visit details" , this.visitDetails)
        
  
        // this.visitDetails.forEach()
      }

      // if(this.visitDetails. === 0){
      //   this.isVisitAvailable = true;
      // }
      // else{
      //   this.isVisitAvailable = false;
      // }
      // this.isVisitAvailable = false;
    }
   
  }

  loadPrescription(appointmentId: any){

    console.log("inside load Prescription:" , appointmentId);
    
  }

}
