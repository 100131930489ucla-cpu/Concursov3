export class Cl_mConcurso {
    aspirantes = [];
    constructor() { }
    agregar(aspirante) {
        this.aspirantes.push(aspirante);
    }
    obtenerMaximaCalificacion() {
        let max = 0;
        for (let i = 0; i < this.aspirantes.length; i++) {
            const asp = this.aspirantes[i];
            if (asp.cumpleRequisitos && asp.notaExamenEscrito >= 10) {
                const nota = asp.notaDefinitivaCO11();
                if (nota > max)
                    max = nota;
            }
        }
        return max;
    }
    obtenerAspirantes() { return this.aspirantes; }
}
//# sourceMappingURL=Cl_mConcurso.js.map