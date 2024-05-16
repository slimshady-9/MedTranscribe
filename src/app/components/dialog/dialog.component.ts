import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/services/dialog.service';

export interface PeriodicElement {
  position: number
  Disease: string;
  Symptoms: string;
  date: string;
  action: any;
  Tests: string;
  Prescription: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, Symptoms: 'Stomach Ache', Disease: 'Food Poisoning', Tests: 'NA', Prescription: 'Azithromycin', date: '24/2/2024', action: '' },
  {position: 2, Symptoms: 'Stomach Ache', Disease: 'Food Poisoning',Tests: 'Blood Test', Prescription: 'Loperamide . Bismuth subsalicylate', date: '14/1/2024', action: '' },
  {position: 3, Symptoms: 'Fever, Cough', Disease: 'Covid 19', Tests: 'RT-PCR, CT Scan', Prescription: ' Paxlovid',date: '18/6/2023', action: '' },
  {position: 4, Symptoms: 'Fever, Cough', Disease: 'Covid 19',Tests: 'None', Prescription: 'Remdesivir, Tocilizumab', date: '14/5/2023', action: '' }

];

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  dataSource = ELEMENT_DATA;
  @Output() close: EventEmitter<void> = new EventEmitter<void>;

  constructor(private dialogService: DialogService, private _snackBar: MatSnackBar){};
  position = this.dialogService.position;
  data={
    "Patient_ID": "1",
    "Name": "Che",
    "Age": "18",
    "Gender": "Male",
    "Weight": "171.55",
    "Date": "24/2/2024",
    "Symptoms": "Stomach Ache",
    "Disease": "Food Poisoning",
    "Tests": "NA",
    "Prescription": "Azithromycin"
}

  onDownload(){
    let text = 'past_record';

    const jsonString = JSON.stringify(this.data , null ,2);
    const blob = new Blob([jsonString] , {type:'application/json'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = text + ".json";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url); 
    this._snackBar.open('Successfully Download', 'Ok', {
      duration: 3000
    });
  }
}
