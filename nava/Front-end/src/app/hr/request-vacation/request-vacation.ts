
export interface RequestVacation {
       requestVacationId:String ;
       description :string;
       vacationType:string;
       approvedBy :string;
       attachment :string;
       approve :number;
       sartDate:string;
       endDate:string;
       vacation:
       {vacationTypeId:String;},
       Employee:
       {employeeId:string}
}
