import { Employee } from "../employee/employee";

export interface TimeSheet {
  timeSheetId:string;
  attDay:string;
  attWeekDay:string;
  attMonth:string;
  attYear:string;
  overTimeHour:string;
  overTimeValue:string;
  attValue:string;
  attTotalValue:string;
  attHour:string;

 employees?:Employee[];
}
