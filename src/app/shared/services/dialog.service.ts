import { Injectable, Optional } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(@Optional() private dialog: MatDialog) {}

  /**
   * Método para exibir um dialog
   * @param message Mensagem a ser exibida no dialog
   * @returns A referência do dialog aberto
   * @memberof DialogService
   */
  alert(message: string): MatDialogRef<any> {
    return this.dialog?.open(AlertDialogComponent, {
      width: '950px',
      data: message,
    });
  }

  /**
   * Método para exibir um dialog já com algumas configurações padrão,
   * para que não seja necessário informar repetidamente.
   * @template T Tipo do componente
   * @param component Componente a ser aberto no dialog
   * @param configs Configurações customizadas para abertura do dialog
   * @returns A referência do dialog aberto
   * @memberof DialogService
   */
  openGenericDialog<T>(
    component: ComponentType<T>,
    configs?: MatDialogConfig,
  ): MatDialogRef<any> {
    const baseOptions = {
      autoFocus: false,
      disableClose: true,
      minWidth: '90vw',
      minHeight: '80vh',
      panelClass: 'position-relative',
    };

    if (configs?.height) {
      baseOptions.minHeight = '';
    }

    if (configs?.width) {
      baseOptions.minWidth = '';
    }

    Object.assign(baseOptions, configs);

    return this.dialog?.open(component, {
      ...baseOptions,
    });
  }
}
