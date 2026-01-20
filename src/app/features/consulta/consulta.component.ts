import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditoService } from '../../core/services/credito.service';
import { Credito } from '../../core/models/credito.model';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta.component.html'
})
export class ConsultaComponent {

  numeroNfse = '';
  numeroCredito = '';
  resultados: Credito[] = [];

  constructor(private service: CreditoService) {}

  buscar() {
    if (this.numeroNfse) {
      this.service.buscarPorNfse(this.numeroNfse)
        .subscribe(res => this.resultados = res);
    } else if (this.numeroCredito) {
      this.service.buscarPorCredito(this.numeroCredito)
        .subscribe(res => this.resultados = [res]);
    }
  }
}
