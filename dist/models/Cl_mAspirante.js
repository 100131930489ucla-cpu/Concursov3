export class Cl_mAspirante {
    // Inicialización CO-5
    calificacionFinal() {
        throw new Error("Method not implemented.");
    }
    cedula;
    nombre;
    // CO-5
    subCO5_postgradoEspecialidad;
    subCO5_postgradoOtros;
    subCO5_cursosAmpliacion;
    subCO5_reconocimientosTesis;
    // CO-5.1
    subCO51_tituloPromedio;
    subCO51_preparadorAsistente;
    subCO51_actividadOtrasAreas;
    subCO51_diplomaSobresaliente;
    subCO51_diplomaOtros;
    subCO51_reconocimientoInvest;
    subCO51_reconocimientoExt;
    // CO-5.2
    subCO52_librosEditorial;
    subCO52_librosSinEditorial;
    subCO52_articulosArbitradosInd;
    subCO52_articulosArbitradosNoInd;
    subCO52_articulosNoArbitrados;
    subCO52_articulosOtros;
    subCO52_memoriasCongreso;
    subCO52_ponencias;
    subCO52_patentes;
    // CO-5.3
    subCO53_docenciaInvest;
    subCO53_premiosDocencia;
    subCO53_expProfesionalObjeto;
    subCO53_expProfesionalOtras;
    subCO53_premiosProfesionales;
    subCO53_direccionInstitutos;
    subCO53_pasantiasObjeto;
    subCO53_pasantiasOtras;
    notaExamenEscrito;
    notaExamenOralPractico;
    aptitudGlobal;
    postgradoRaw;
    pregradoRaw;
    produccionRaw;
    experienciaRaw;
    matrizJuradoA;
    matrizJuradoB;
    matrizJuradoC;
    cumpleRequisitos;
    sePresento;
    constructor(data) {
        this.cedula = Number(data.cedula);
        this.nombre = data.nombre || data.nombreCompleto || "";
        this.cumpleRequisitos = typeof data.cumpleRequisitos === "undefined" ? true : Boolean(data.cumpleRequisitos);
        this.sePresento = typeof data.sePresento === "undefined" ? true : Boolean(data.sePresento);
        this.postgradoRaw = Number(data.postgradoRaw || 0);
        this.pregradoRaw = Number(data.pregradoRaw || 0);
        this.produccionRaw = Number(data.produccionRaw || 0);
        this.experienciaRaw = Number(data.experienciaRaw || 0);
        this.notaExamenEscrito = Number(data.notaEscrita || data.notaExamenEscrito || 0);
        this.notaExamenOralPractico = Number(data.notaOral || data.notaExamenOralPractico || 0);
        this.aptitudGlobal = Number(data.aptitudGlobal || data.notaAptitud || 0);
        // Inicialización CO-5
        this.subCO5_postgradoEspecialidad = Number(data.subCO5_postgradoEspecialidad || 0);
        this.subCO5_postgradoOtros = Number(data.subCO5_postgradoOtros || 0);
        this.subCO5_cursosAmpliacion = Number(data.subCO5_cursosAmpliacion || 0);
        this.subCO5_reconocimientosTesis = Number(data.subCO5_reconocimientosTesis || 0);
        // Inicialización CO-5.1
        this.subCO51_tituloPromedio = Number(data.subCO51_tituloPromedio || 0);
        this.subCO51_preparadorAsistente = Number(data.subCO51_preparadorAsistente || 0);
        this.subCO51_actividadOtrasAreas = Number(data.subCO51_actividadOtrasAreas || 0);
        this.subCO51_diplomaSobresaliente = Number(data.subCO51_diplomaSobresaliente || 0);
        this.subCO51_diplomaOtros = Number(data.subCO51_diplomaOtros || 0);
        this.subCO51_reconocimientoInvest = Number(data.subCO51_reconocimientoInvest || 0);
        this.subCO51_reconocimientoExt = Number(data.subCO51_reconocimientoExt || 0);
        // Inicialización CO-5.2
        this.subCO52_librosEditorial = Number(data.subCO52_librosEditorial || 0);
        this.subCO52_librosSinEditorial = Number(data.subCO52_librosSinEditorial || 0);
        this.subCO52_articulosArbitradosInd = Number(data.subCO52_articulosArbitradosInd || 0);
        this.subCO52_articulosArbitradosNoInd = Number(data.subCO52_articulosArbitradosNoInd || 0);
        this.subCO52_articulosNoArbitrados = Number(data.subCO52_articulosNoArbitrados || 0);
        this.subCO52_articulosOtros = Number(data.subCO52_articulosOtros || 0);
        this.subCO52_memoriasCongreso = Number(data.subCO52_memoriasCongreso || 0);
        this.subCO52_ponencias = Number(data.subCO52_ponencias || 0);
        this.subCO52_patentes = Number(data.subCO52_patentes || 0);
        // Inicialización CO-5.3
        this.subCO53_docenciaInvest = Number(data.subCO53_docenciaInvest || 0);
        this.subCO53_premiosDocencia = Number(data.subCO53_premiosDocencia || 0);
        this.subCO53_expProfesionalObjeto = Number(data.subCO53_expProfesionalObjeto || 0);
        this.subCO53_expProfesionalOtras = Number(data.subCO53_expProfesionalOtras || 0);
        this.subCO53_premiosProfesionales = Number(data.subCO53_premiosProfesionales || 0);
        this.subCO53_direccionInstitutos = Number(data.subCO53_direccionInstitutos || 0);
        this.subCO53_pasantiasObjeto = Number(data.subCO53_pasantiasObjeto || 0);
        this.subCO53_pasantiasOtras = Number(data.subCO53_pasantiasOtras || 0);
        // Pruebas y matrices de jurados
        this.matrizJuradoA = data.matrizJuradoA || [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.matrizJuradoB = data.matrizJuradoB || [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.matrizJuradoC = data.matrizJuradoC || [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    // --- CÁLCULOS DE MÉRITOS SIN REDUCE (USANDO CICLOS FOR REALES) ---
    totalCO5() {
        if (this.postgradoRaw > 0) {
            return Math.min(this.postgradoRaw, 35);
        }
        const suma = this.subCO5_postgradoEspecialidad + this.subCO5_postgradoOtros +
            this.subCO5_cursosAmpliacion + this.subCO5_reconocimientosTesis;
        return Math.min(suma, 35);
    }
    totalCO51() {
        if (this.pregradoRaw > 0) {
            return Math.min(this.pregradoRaw, 30);
        }
        const suma = this.subCO51_tituloPromedio + this.subCO51_preparadorAsistente +
            this.subCO51_actividadOtrasAreas + this.subCO51_diplomaSobresaliente +
            this.subCO51_diplomaOtros + this.subCO51_reconocimientoInvest + this.subCO51_reconocimientoExt;
        return Math.min(suma, 30);
    }
    totalCO52() {
        if (this.produccionRaw > 0) {
            return Math.min(this.produccionRaw, 15);
        }
        const suma = this.subCO52_librosEditorial + this.subCO52_librosSinEditorial +
            this.subCO52_articulosArbitradosInd + this.subCO52_articulosArbitradosNoInd +
            this.subCO52_articulosNoArbitrados + this.subCO52_articulosOtros +
            this.subCO52_memoriasCongreso + this.subCO52_ponencias + this.subCO52_patentes;
        return Math.min(suma, 15);
    }
    totalCO53() {
        if (this.experienciaRaw > 0) {
            return Math.min(this.experienciaRaw, 20);
        }
        const suma = this.subCO53_docenciaInvest + this.subCO53_premiosDocencia +
            this.subCO53_expProfesionalObjeto + this.subCO53_expProfesionalOtras +
            this.subCO53_premiosProfesionales + this.subCO53_direccionInstitutos +
            this.subCO53_pasantiasObjeto + this.subCO53_pasantiasOtras;
        return Math.min(suma, 20);
    }
    // CO-6: Sumatoria consolidada
    totalCO6_puntos100() {
        return this.totalCO5() + this.totalCO51() + this.totalCO52() + this.totalCO53();
    }
    notaCO6_escala20() {
        return this.totalCO6_puntos100() / 5;
    }
    // CO-7: Acta de credenciales (10%)
    porcCO7() {
        return this.notaCO6_escala20() * 0.10;
    }
    // CO-8: Conocimientos promedio (60%)
    notaCO8() {
        return (this.notaExamenEscrito + this.notaExamenOralPractico) / 2;
    }
    porcCO8() {
        return this.notaCO8() * 0.60;
    }
    // CO-10: Aptitud global directa si está disponible
    notaCO10() {
        if (this.aptitudGlobal > 0) {
            return this.aptitudGlobal;
        }
        let sumaA = 0;
        for (let i = 0; i < this.matrizJuradoA.length; i++) {
            sumaA += this.matrizJuradoA[i];
        }
        let sumaB = 0;
        for (let i = 0; i < this.matrizJuradoB.length; i++) {
            sumaB += this.matrizJuradoB[i];
        }
        let sumaC = 0;
        for (let i = 0; i < this.matrizJuradoC.length; i++) {
            sumaC += this.matrizJuradoC[i];
        }
        const promA = sumaA / (this.matrizJuradoA.length || 1);
        const promB = sumaB / (this.matrizJuradoB.length || 1);
        const promC = sumaC / (this.matrizJuradoC.length || 1);
        const promedioEscala1a5 = (promA + promB + promC) / 3;
        return (promedioEscala1a5 / 5) * 20;
    }
    // CO-9: Acta de Aptitudes (30%)
    porcCO9() {
        return this.notaCO10() * 0.30;
    }
    // CO-11: Veredicto Integrado
    notaDefinitivaCO11() {
        if (!this.cumpleRequisitos || !this.sePresento)
            return 0;
        return this.porcCO7() + this.porcCO8() + this.porcCO9();
    }
    obtenerVeredictoCO11(notaGanadora) {
        if (!this.cumpleRequisitos)
            return "No cumple con los requisitos exigidos en la convocatoria.";
        if (!this.sePresento)
            return "No se presentó al proceso de selección.";
        if (this.notaCO8() < 15)
            return "No seleccionado en la Prueba de Conocimiento por no alcanzar la nota mínima exigida.";
        const notaFinal = this.notaDefinitivaCO11();
        if (notaFinal < 16)
            return "No seleccionado por no alcanzar la nota mínima aprobatoria en las pruebas.";
        if (notaFinal === notaGanadora && notaFinal >= 16)
            return "Seleccionado por obtener la mayor calificación.";
        return "Seleccionado.";
    }
}
//# sourceMappingURL=Cl_mAspirante.js.map