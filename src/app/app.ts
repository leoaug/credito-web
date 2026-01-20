import { Component } from '@angular/core';
import { ConsultaComponent } from './features/consulta/consulta.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConsultaComponent],
  template: `<app-consulta />`
})

export class App {}
