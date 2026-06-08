import { Cl_mAspirante } from "../models/Cl_mAspirante.js";

export class Cl_vDirectiva {
  private tablaCuerpo: HTMLElement | null;
  private seccionDestacados: HTMLElement | null;

  constructor() {
    this.tablaCuerpo = document.getElementById("tablaCuerpoAspirantes");
    this.seccionDestacados = document.getElementById("contenedorDestacados");
  }

  /**
   * Renderiza el listado inicial antes de los cálculos analíticos
   */
  public mostrarResultadosSimples(aspirantesSimples: any[]): void {
    if (!this.tablaCuerpo) return;
    this.tablaCuerpo.innerHTML = ""; 
    
    if (this.seccionDestacados) {
      this.seccionDestacados.innerHTML = `<p class="text-muted text-center my-3"><em>Esperando cálculo...</em></p>`;
    }

    aspirantesSimples.forEach(asp => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td class="text-center"><strong>${asp.cedula}</strong></td>
        <td>${asp.nombreCompleto || asp.nombre}</td>
        <td colspan="6" class="text-center text-muted table-light">
          <em>Esperando cálculo analítico...</em>
        </td>
      `;
      this.tablaCuerpo!.appendChild(fila);
    });
  }

  /**
   * Procesa y rellena las columnas con los formatos CO calculados
   */
  public renderizerTablaFormatos(aspirantes: Cl_mAspirante[], notaMasAltaConcurso: number): void {
    if (!this.tablaCuerpo) return;
    this.tablaCuerpo.innerHTML = ""; 

    aspirantes.forEach((asp: any) => {
      const fila = document.createElement("tr");

      // Estilos visuales según condiciones del aspirante
      if (!asp.cumpleRequisitos || !asp.sePresento) {
        fila.className = "table-light text-muted font-italic";
      } else if (typeof asp.notaDefinitivaCO11 === "function" && asp.notaDefinitivaCO11() === notaMasAltaConcurso && notaMasAltaConcurso >= 16) {
        fila.className = "table-success font-weight-bold";
      }

      const nombreAspirante = asp.nombreCompleto || asp.nombre || "Sin Nombre";
      const veredictoTexto = typeof asp.obtenerVeredictoCO11 === "function" ? asp.obtenerVeredictoCO11(notaMasAltaConcurso) : "Procesado";

      fila.innerHTML = `
        <td class="text-center"><strong>${asp.cedula}</strong></td>
        <td>${nombreAspirante}</td>
        <td class="text-center font-weight-bold">${asp.cumpleRequisitos ? '🟢 SÍ' : '🔴 NO'}</td>
        <td class="text-end text-primary font-weight-bold">${typeof asp.porcCO7 === 'function' ? asp.porcCO7().toFixed(2) : '0.00'}%</td>
        <td class="text-end text-success font-weight-bold">${typeof asp.porcCO8 === 'function' ? asp.porcCO8().toFixed(2) : '0.00'}%</td>
        <td class="text-end text-warning font-weight-bold">${typeof asp.porcCO9 === 'function' ? asp.porcCO9().toFixed(2) : '0.00'}%</td>
        <td class="text-center table-dark font-weight-bold text-info">${typeof asp.notaDefinitivaCO11 === 'function' ? asp.notaDefinitivaCO11().toFixed(2) : '0.00'}</td>
        <td><small class="font-weight-bold">${veredictoTexto}</small></td>
      `;

      this.tablaCuerpo!.appendChild(fila);
    });

    this.actualizarDestacado(aspirantes, notaMasAltaConcurso);
  }

  /**
   * Actualiza el panel lateral derecho con el ganador
   */
  private actualizarDestacado(aspirantes: Cl_mAspirante[], notaMasAltaConcurso: number): void {
    if (!this.seccionDestacados) return;
    this.seccionDestacados.innerHTML = ""; 

    const ganadores = aspirantes.filter((a: any) => {
      const nota = typeof a.notaDefinitivaCO11 === 'function' ? a.notaDefinitivaCO11() : 0;
      return a.cumpleRequisitos && a.sePresento && nota === notaMasAltaConcurso && nota >= 16;
    });

    if (ganadores.length > 0) {
      const ganador: any = ganadores[0];
      const notaFinal = typeof ganador.notaDefinitivaCO11 === 'function' ? ganador.notaDefinitivaCO11() : 0;
      this.seccionDestacados.innerHTML = `
        <div class="text-center p-2">
          <h5 class="text-success font-weight-bold mb-1">🏆 SELECCIONADO</h5>
          <h6 class="text-dark font-weight-bold mb-2">${ganador.nombreCompleto || ganador.nombre}</h6>
          <div class="bg-success text-white rounded p-2 font-weight-bold fs-5">
            ${notaFinal.toFixed(2)} pts
          </div>
          <p class="text-muted small mt-2 mb-0">C.I. ${ganador.cedula}</p>
        </div>`;
    } else {
      this.seccionDestacados.innerHTML = `
        <div class="text-center py-3">
          <span class="fs-1">⚠️</span>
          <h6 class="text-danger font-weight-bold mt-2 mb-0">CONCURSO DECLARADO DESIERTO</h6>
          <small class="text-muted d-block mt-1">Ningún postulante elegible alcanzó el mínimo aprobatorio.</small>
        </div>`;
    }
  }

  /**
   * Renderiza las métricas globales del concurso en el contenedor de resultados
   */
  public mostrarEstadisticasGlobales(datos: { total: number; aprobados: number; reprobados: number }): void {
    if (!this.tablaCuerpo) return;

    const filaEstadisticas = document.createElement("tr");
    filaEstadisticas.className = "table-info text-dark font-weight-bold";
    filaEstadisticas.innerHTML = `
      <td colspan="2" class="text-start">📊 RESUMEN DEL CONCURSO:</td>
      <td class="text-center">Total: ${datos.total}</td>
      <td colspan="2" class="text-center text-success">Aprobados: ${datos.aprobados}</td>
      <td colspan="3" class="text-center text-danger">Reprobados: ${datos.reprobados}</td>
    `;
    this.tablaCuerpo.appendChild(filaEstadisticas);
  }
}
export { Cl_vDirectiva as ControlDirectiva };
