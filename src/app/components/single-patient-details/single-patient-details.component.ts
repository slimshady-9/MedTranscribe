import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';
import { PatientService } from 'src/app/services/patient.service';
import { MatTableModule } from '@angular/material/table';

import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { DialogService } from 'src/app/services/dialog.service';


export interface PeriodicElement {
  name: string;
  position: number;
  date: string;
  action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Online', date: '24/2/2024', action: '' },
  { position: 2, name: 'Visit 1', date: '14/1/2024', action: '' },
  { position: 3, name: 'Report 2',date: '18/6/2023', action: '' },
  { position: 4, name: 'Report 1', date: '14/5/2024', action: '' },
];


@Component({
  selector: 'app-single-patient-details',
  templateUrl: './single-patient-details.component.html',
  styleUrls: ['./single-patient-details.component.scss'],

})
export class SinglePatientDetailsComponent implements OnInit {

  @ViewChild('fileInput') fileInput?:ElementRef;
  singlePatientData: any;
  selectedFile: File | null = null;
  audioData: any;
  displayedColumns: string[] = ['position','name','date','action'];
  dataSource = ELEMENT_DATA;
  isConverted = false;
  reportData: any;
  textInput: string = '';
  diseaseInfo: any = null;
  fileText = 'Choose File';
  file?: File;
  isRecord = false;
  uploadClick = false;
  extractData = false;
  converted =false;
  specificData:any;

  title ='audiorecord';
  record: any;
  recording = false;
  url: any;
  error: any;
 
 
  constructor(private patientService: PatientService, private route: ActivatedRoute, private http: HttpClient, private domSanitizer: DomSanitizer,private dialog:DialogService) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');

    // Check if the 'id' parameter exists before trying to convert it to a number
    if (idParam !== null && idParam !== undefined) {
      const id = +idParam; // '+' converts string to number
      this.patientService.getParticularPatientData(id).subscribe((data: any) => {
        this.singlePatientData = data[0]; // Assuming the response is a single patient data object
      });
    } else {
      console.error('ID parameter is null or undefined');
      // Handle the case when the 'id' parameter is not available
    }
  }

  
  openDialog(data: any){
    this.dialog.openDialog(data);
  }
  // onSubmit() {
  //   if (this.textInput.trim() !== '') {
  //     this.patientService.analyzeText(this.textInput).subscribe(
  //       (response) => {
  //         this.diseaseInfo = response;
  //       },
  //       (error) => {
  //         console.error('Error analyzing text:', error);
  //       }
  //     );
  //   }
  // }
  onFile(event:any){
    let file = event.target.files[0];

    if(file){
      this.fileText = file.name;
      this.file = file;
    }
  }
  openFilePicker(){
    this.fileInput?.nativeElement.click();
  }
  download(){
    
  }

  sendDataToServer() {
    this.patientService.sendDataToServer({ text: this.reportData.message }).subscribe(
      response => {
        // Handle success response
        if(this.specificData){
          this.specificData = response
        }
        this.converted = true;
        console.log(this.specificData)
      },
      error => {
        // Handle error
        console.error(error);
      }
    );
  }
  onFileSelected(event: any) {
    this.uploadClick = true;
    const files = this.file;
 
    if (files) {
      this.patientService.uploadAudioFile(files).subscribe(
        response => {
          // Handle success response
          console.log(response);
          this.isConverted = true;
          if (response) {
            this.reportData = response;
          }

 
        },
        error => {
          // Handle error
          console.error(error);
        }
      );
    }
  }
  extractedData(){
    this.extractData = true;
    this.patientService.sendDataToServer({ text: this.reportData.message }).subscribe(
      response => {
        
        if(response){
          this.converted = true
          this.specificData = response
        }
        console.log(this.specificData)

      },
      error => {
        // Handle error
        console.error(error);
      }
    );
  }






  onRecord(){
    this.isRecord = true;
  }
  onUpload(){
    this.isRecord = false;
  }




  sanitize(url:string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
 
  startRecording(){
    this.recording = true;
    let mediaconstraints ={
      video:false,
      audio:true,
    }
    navigator.mediaDevices.getUserMedia(mediaconstraints).then(this.successCallback.bind(this),this.errorCallback.bind(this));
  }
 
  successCallback(stream: any){
    var options ={
      mimeType: 'audio/wav',
    };
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream,{mimeType: 'audio/wav',});
    this.record.record();
  }
 
  stopRecording(){
    this.recording= false;
    this.record.stop(this.processRecording.bind(this));
  }
 
  processRecording(blob:any){
    this.url = URL.createObjectURL(blob);
    console.log('blob',blob);
    console.log('url',this.url);
  }
 
  errorCallback(){
    this.error = 'Can not play audio in your browser';
  }
}