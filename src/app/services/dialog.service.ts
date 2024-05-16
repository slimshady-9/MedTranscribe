import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  position: any;

  constructor(private dialog: MatDialog) { }

  openDialog(data: any){
    this.position = data;
    this.dialog.open(DialogComponent);
  }
}
