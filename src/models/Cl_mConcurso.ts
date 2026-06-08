import { Cl_mAspirante } from "./Cl_mAspirante.js";

export class Cl_mConcurso {
  private aspirantes: Cl_mAspirante[] = [];

  constructor() {}

  public agregar(aspirante: Cl_mAspirante): void {
    this.aspirantes.push(aspirante);
  }

  public obtenerMaximaCalificacion(): number {
    let max = 0;
    for (let i = 0; i < this.aspirantes.length; i++) {
      const asp = this.aspirantes[i];
      if (asp.cumpleRequisitos && asp.notaExamenEscrito >= 10) {
        const nota = asp.notaDefinitivaCO11();
        if (nota > max) max = nota;
      }
    }
    return max;
  }

  public obtenerAspirantes(): Cl_mAspirante[] { return this.aspirantes; }
}