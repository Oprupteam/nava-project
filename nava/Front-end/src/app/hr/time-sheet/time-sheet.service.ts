import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TimeSheet } from './time-sheet';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {
  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  public getTimeSheets(): Observable<TimeSheet[]>{
    return this.http.get<TimeSheet[]>(`${this.apiServerUrl}/TimeSheet/all`);
  }



  public getEmployees(): Observable<TimeSheet[]>{
    return this.http.get<TimeSheet[]>(`${this.apiServerUrl}/TimeSheet/all`);
  }

  public addTimeSheet(timeSheet: TimeSheet): Observable<TimeSheet>{


    return this.http.post<TimeSheet>(`${this.apiServerUrl}/timeSheet/add`, timeSheet);
  }

  public updateTimeSheet(timeSheet: TimeSheet): Observable<TimeSheet>{
    return this.http.put<TimeSheet>(`${this.apiServerUrl}/timeSheet/update`, timeSheet);
  }

  public deleteTimeSheet(timeSheetId: number): Observable<TimeSheet>{
    return this.http.delete<TimeSheet>(`${this.apiServerUrl}/timesheet/delete/${timeSheetId}`);
  }

  // public getTimeSheetByEmployeeId(employeeId:number): Observable<Sheet[]>{

  //  return this.http.get<Sheet[]>(`${this.apiServerUrl}/TimeSheet/TimeSheet/${employeeId}`);
  // }

  // public getTimeSheetofEmployeeAttDate(employeeId:number,attDate:string): Observable<Sheet[]>{

  //   return this.http.get<Sheet[]>(`${this.apiServerUrl}/TimeSheet/sheet/${employeeId}/${attDate}`);
  //  }


  //  public getTimeSheetofEmployeeBetween(employeeId:number,attDate1:string,attDate2:string): Observable<TimeSheet[]>{
  //
  //   return this.http.get<TimeSheet[]>(`${this.apiServerUrl}/TimeSheet/sheetbetween/${employeeId}/${attDate1}/${attDate2}`);
  //  }
  public getSheetofEmployeeS(employeeId:number,attDay:number,attMonth:number,attYear:number): Observable<TimeSheet[]>{

    //alert(`${this.apiServerUrl}/TimeSheet/employeeSheet/${employeeId}/${attDay}/${attMonth}/${attYear}`)
    return this.http.get<TimeSheet[]>(`${this.apiServerUrl}/timeSheet/employeeSheet/${employeeId}/${attDay}/${attMonth}/${attYear}`);
   }

   public getTotalSalEmployeeS(employeeId:number): Observable<TimeSheet[]>{

    //alert(`${this.apiServerUrl}/contractDetail/totalSal/${employeeId}`)
    return this.http.get<TimeSheet[]>(`${this.apiServerUrl}/contractDetail/totalSal/${employeeId}`);
   }

}
