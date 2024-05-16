import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  isUserLoggedIn = new Subject<boolean>();
  isUserLoggedIn_1: boolean = false;
 
  constructor(private http: HttpClient) {
    // this.isUserLoggedIn.subscribe(res=>{
    //   this.isUserLoggedIn_1=res;
    // })
  }
 
  getPieChartData(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/piedata');
  }
 
  getAllPatientData(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/get_excel_data');
  }
 
  getTopTenPatientData(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/topten');
  }
 
  getLineChartData(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/linechart');
  }
 
  getAdmissionTypeCount(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/admitcount');
  }
 
  getParticularPatientData(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:5000/get_single_patient/` + id);
  }
 
  getBarChartData(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/bardata');
  }
  uploadAudioFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('audio_file', file, file.name);
    //Add your own API link 
    return this.http.post('', formData);
  }
  sendDataToServer(data: any) {
    //Add your own API link 
    return this.http.post<any>(``, data);
}
}