import { UserRole } from "./user-role";
export class Employee {

     employeeId !: number;
	 title!:string;
	 firstName!:string;
	 lastName!:string;
	 gender!:string;
     dateOfBirth!:Date;
     dateOfJoining!:Date;
	 email!:string;
	 mobileNO!:string;
	 address!:string;
	 qualification!:string;
	 specialisation!:string;
     status!:string;
     userRole!:UserRole;
}
