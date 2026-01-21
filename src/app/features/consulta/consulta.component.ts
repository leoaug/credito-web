import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreditoService } from '../../core/services/credito.service';
import { Credito } from '../../core/models/credito.model';

@Component({
  standalone: true,
  selector: 'app-consulta',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta.component.html'
})
export class ConsultaComponent {

  loading = signal(false);
  resultados = signal<Credito[]>([]);
  erro = signal<string | null>(null);
  form;

  constructor(
    private fb: FormBuilder,
    private service: CreditoService
  ) {
    this.form = this.fb.nonNullable.group({
      numeroNfse: [''],
      numeroCredito: ['']
    });
  }

  consultar() {
    if (this.loading()) return;

    this.erro.set(null);
    this.resultados.set([]);
    this.loading.set(true);

    const { numeroNfse, numeroCredito } = this.form.getRawValue();

    // Validação
    if (!numeroNfse && !numeroCredito) {
      this.erro.set('Informe o número da NFS-e ou do Crédito');
      this.loading.set(false);
      return;
    }

    if (numeroNfse && numeroCredito) {
      this.erro.set('Informe apenas um campo por vez');
      this.loading.set(false);
      return;
    }

    // Consulta por NFS-e
    if (numeroNfse) {
      this.service.buscarPorNfse(numeroNfse).subscribe({
        next: res => {
          this.resultados.set(res);
          this.loading.set(false);
        },
        error: () => {
          this.erro.set('Erro ao consultar por NFS-e');
          this.loading.set(false);
        }
      });
      return;
    }
    // Consulta por Crédito
    if (numeroCredito) {
      this.service.buscarPorCredito(numeroCredito).subscribe({
        next: res => {
          this.resultados.set(res ? [res] : []);
          this.loading.set(false);
        },
        error: () => {
          this.erro.set('Erro ao consultar por Numero Crédito');
          this.loading.set(false);
        }
      });
      return;
    }
  }
}
