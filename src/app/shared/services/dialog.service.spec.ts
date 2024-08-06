import { TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { DialogService } from './dialog.service';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-dialog',
  template: `<h1>It's work</h1>`,
})
class TestDialogComponent {}

describe('DialogService', () => {
  let service: DialogService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDialogComponent],
      imports: [MatDialogModule],
      providers: [DialogService, MatDialog],
    });
    service = TestBed.inject(DialogService);
    dialog = TestBed.inject(MatDialog);
  });

  it('Deve criar', () => {
    expect(service).toBeTruthy();
  });

  it('Deve abrir um dialog de alerta', () => {
    const dialogRef: MatDialogRef<any> = {} as MatDialogRef<any>;
    jest.spyOn(dialog, 'open').mockReturnValue(dialogRef);

    const message = 'This is an alert message';
    const result = service.alert(message);

    expect(dialog.open).toHaveBeenCalledWith(AlertDialogComponent, {
      width: '950px',
      data: message,
    });
    expect(result).toBe(dialogRef);
  });

  it('Deve abrir um dialog genérico', () => {
    const dialogRef: MatDialogRef<any> = {} as MatDialogRef<any>;
    jest.spyOn(dialog, 'open').mockReturnValue(dialogRef);

    const component = TestDialogComponent;
    const configs = {
      width: '500px',
      height: '500px',
    };
    const result = service.openGenericDialog(component, configs);

    expect(dialog.open).toHaveBeenCalledWith(component, {
      autoFocus: false,
      disableClose: true,
      minWidth: '',
      minHeight: '',
      panelClass: 'position-relative',
      ...configs,
    });
    expect(result).toBe(dialogRef);
  })
});
