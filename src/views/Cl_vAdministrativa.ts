export class Cl_vAdministrativa {
  private formulario: HTMLFormElement | null;
  private tablaCarga: HTMLElement | null;

  constructor() {
    this.formulario = document.getElementById("formRegistroAspirante") as HTMLFormElement;
    this.tablaCarga = document.getElementById("tablaCargaLocal");
  }

  /**
   * Extrae los valores del formulario y los mapea EXACTAMENTE
   * a las llaves numéricas y de texto definidas en tu esquema de MockAPI
   */
  public obtenerDatosFormulario() {
    const cedulaInput = (document.getElementById("txtCedula") as HTMLInputElement).value;
    const nombreInput = (document.getElementById("txtNombre") as HTMLInputElement).value;
    const cumpleRequisitos = (document.getElementById("chkRequisitos") as HTMLInputElement).checked;
    const asistencia = (document.getElementById("chkAsistencia") as HTMLInputElement).checked;

    // --- PROCESAMIENTO CO-5: SUMATORIA DE SUB-CRITERIOS A VALOR ÚNICO ---
    // Los totales se calculan usando valores validados y acotados más abajo.

    // --- PROCESAMIENTO CO-8 & CO-10 (CONOCIMIENTO Y APTITUDES) ---
    const clampInputValue = (id: string, max: number, min = 0): number => {
      const input = document.getElementById(id) as HTMLInputElement | null;
      if (!input) return min;
      let value = Number(input.value);
      if (Number.isNaN(value)) value = min;
      if (value > max) value = max;
      if (value < min) value = min;
      input.value = String(value);
      return value;
    };

    const examenEscrito = clampInputValue("numExamenEscrito", 20, 0);
    const examenOral = clampInputValue("numExamenOral", 20, 0);

    const numPostEspecialidad = clampInputValue("numPostEspecialidad", 25);
    const numPostOtros = clampInputValue("numPostOtros", 20);
    const numCursosAmp = clampInputValue("numCursosAmp", 6);
    const numReconTesis = clampInputValue("numReconTesis", 5);
    const postgrado = numPostEspecialidad + numPostOtros + numCursosAmp + numReconTesis;

    const numTituloProm = clampInputValue("numTituloProm", 25);
    const numPrepAsis = clampInputValue("numPrepAsis", 10);
    const numActOtras = clampInputValue("numActOtras", 3);
    const numDiplSob = clampInputValue("numDiplSob", 5);
    const numDiplOtros = clampInputValue("numDiplOtros", 3);
    const numReconInv = clampInputValue("numReconInv", 3);
    const numReconExt = clampInputValue("numReconExt", 3);
    const pregrado = numTituloProm + numPrepAsis + numActOtras + numDiplSob + numDiplOtros + numReconInv + numReconExt;

    const numLibrosEd = clampInputValue("numLibrosEd", 15);
    const numLibrosSinEd = clampInputValue("numLibrosSinEd", 12);
    const numArtInd = clampInputValue("numArtInd", 10);
    const numArtNoInd = clampInputValue("numArtNoInd", 6);
    const numArtNoArb = clampInputValue("numArtNoArb", 4);
    const numArtOtros = clampInputValue("numArtOtros", 3);
    const numMemCong = clampInputValue("numMemCong", 10);
    const numPonencias = clampInputValue("numPonencias", 6);
    const numPatentes = clampInputValue("numPatentes", 15);
    const produccion = numLibrosEd + numLibrosSinEd + numArtInd + numArtNoInd + numArtNoArb + numArtOtros + numMemCong + numPonencias + numPatentes;

    const numDocInvest = clampInputValue("numDocInvest", 12);
    const numPremDoc = clampInputValue("numPremDoc", 8);
    const numExpObj = clampInputValue("numExpObj", 6);
    const numExpOtras = clampInputValue("numExpOtras", 3);
    const numPremProf = clampInputValue("numPremProf", 4);
    const numDirInst = clampInputValue("numDirInst", 6);
    const numPasObj = clampInputValue("numPasObj", 4);
    const numPasOtras = clampInputValue("numPasOtras", 2);
    const experiencia = numDocInvest + numPremDoc + numExpObj + numExpOtras + numPremProf + numDirInst + numPasObj + numPasOtras;

    const crit_1 = clampInputValue("crit_1", 5, 0);
    const crit_2 = clampInputValue("crit_2", 5, 0);
    const crit_3 = clampInputValue("crit_3", 5, 0);
    const crit_4 = clampInputValue("crit_4", 5, 0);
    const crit_5 = clampInputValue("crit_5", 5, 0);

    const sumaAptitudes = crit_1 + crit_2 + crit_3 + crit_4 + crit_5;

    // Retornamos el objeto plano idéntico al Schema de tu MockAPI
    return {
      cedula: cedulaInput,
      nombreCompleto: nombreInput,
      cumpleRequisitos: cumpleRequisitos ? 1 : 0,
      sePresento: asistencia ? 1 : 0,
      postgradoRaw: postgrado,
      pregradoRaw: pregrado,
      produccionRaw: produccion,
      experienciaRaw: experiencia,
      subCO5_postgradoEspecialidad: numPostEspecialidad,
      subCO5_postgradoOtros: numPostOtros,
      subCO5_cursosAmpliacion: numCursosAmp,
      subCO5_reconocimientosTesis: numReconTesis,
      subCO51_tituloPromedio: numTituloProm,
      subCO51_preparadorAsistente: numPrepAsis,
      subCO51_actividadOtrasAreas: numActOtras,
      subCO51_diplomaSobresaliente: numDiplSob,
      subCO51_diplomaOtros: numDiplOtros,
      subCO51_reconocimientoInvest: numReconInv,
      subCO51_reconocimientoExt: numReconExt,
      subCO52_librosEditorial: numLibrosEd,
      subCO52_librosSinEditorial: numLibrosSinEd,
      subCO52_articulosArbitradosInd: numArtInd,
      subCO52_articulosArbitradosNoInd: numArtNoInd,
      subCO52_articulosNoArbitrados: numArtNoArb,
      subCO52_articulosOtros: numArtOtros,
      subCO52_memoriasCongreso: numMemCong,
      subCO52_ponencias: numPonencias,
      subCO52_patentes: numPatentes,
      subCO53_docenciaInvest: numDocInvest,
      subCO53_premiosDocencia: numPremDoc,
      subCO53_expProfesionalObjeto: numExpObj,
      subCO53_expProfesionalOtras: numExpOtras,
      subCO53_premiosProfesionales: numPremProf,
      subCO53_direccionInstitutos: numDirInst,
      subCO53_pasantiasObjeto: numPasObj,
      subCO53_pasantiasOtras: numPasOtras,
      crit_1,
      crit_2,
      crit_3,
      crit_4,
      crit_5,
      notaEscrita: examenEscrito,
      notaOral: examenOral,
      aptitudGlobal: sumaAptitudes / 5
    };
  }

  public cargarFormulario(data: any): void {
    this.mostrarFormulario();
    const setValue = (id: string, value: any) => {
      const input = document.getElementById(id) as HTMLInputElement | null;
      if (!input) return;
      input.value = value !== undefined && value !== null ? String(value) : "";
    };

    setValue("txtCedula", data.cedula ?? data.cedula);
    setValue("txtNombre", data.nombreCompleto ?? data.nombre ?? "");
    setValue("numPostgradoRaw", data.postgradoRaw ?? data.postgrado ?? "");
    setValue("numPostEspecialidad", data.subCO5_postgradoEspecialidad ?? data.numPostEspecialidad ?? "");
    setValue("numPostOtros", data.subCO5_postgradoOtros ?? data.numPostOtros ?? "");
    setValue("numCursosAmp", data.subCO5_cursosAmpliacion ?? data.numCursosAmp ?? "");
    setValue("numReconTesis", data.subCO5_reconocimientosTesis ?? data.numReconTesis ?? "");
    setValue("numPregradoRaw", data.pregradoRaw ?? data.pregrado ?? "");
    setValue("numTituloProm", data.subCO51_tituloPromedio ?? data.numTituloProm ?? "");
    setValue("numPrepAsis", data.subCO51_preparadorAsistente ?? data.numPrepAsis ?? "");
    setValue("numActOtras", data.subCO51_actividadOtrasAreas ?? data.numActOtras ?? "");
    setValue("numDiplSob", data.subCO51_diplomaSobresaliente ?? data.numDiplSob ?? "");
    setValue("numDiplOtros", data.subCO51_diplomaOtros ?? data.numDiplOtros ?? "");
    setValue("numReconInv", data.subCO51_reconocimientoInvest ?? data.numReconInv ?? "");
    setValue("numReconExt", data.subCO51_reconocimientoExt ?? data.numReconExt ?? "");
    setValue("numProduccionRaw", data.produccionRaw ?? data.produccion ?? "");
    setValue("numLibrosEd", data.subCO52_librosEditorial ?? data.numLibrosEd ?? "");
    setValue("numLibrosSinEd", data.subCO52_librosSinEditorial ?? data.numLibrosSinEd ?? "");
    setValue("numArtInd", data.subCO52_articulosArbitradosInd ?? data.numArtInd ?? "");
    setValue("numArtNoInd", data.subCO52_articulosArbitradosNoInd ?? data.numArtNoInd ?? "");
    setValue("numArtNoArb", data.subCO52_articulosNoArbitrados ?? data.numArtNoArb ?? "");
    setValue("numArtOtros", data.subCO52_articulosOtros ?? data.numArtOtros ?? "");
    setValue("numMemCong", data.subCO52_memoriasCongreso ?? data.numMemCong ?? "");
    setValue("numPonencias", data.subCO52_ponencias ?? data.numPonencias ?? "");
    setValue("numPatentes", data.subCO52_patentes ?? data.numPatentes ?? "");
    setValue("numExperienciaRaw", data.experienciaRaw ?? data.experiencia ?? "");
    setValue("numDocInvest", data.subCO53_docenciaInvest ?? data.numDocInvest ?? "");
    setValue("numPremDoc", data.subCO53_premiosDocencia ?? data.numPremDoc ?? "");
    setValue("numExpObj", data.subCO53_expProfesionalObjeto ?? data.numExpObj ?? "");
    setValue("numExpOtras", data.subCO53_expProfesionalOtras ?? data.numExpOtras ?? "");
    setValue("numPremProf", data.subCO53_premiosProfesionales ?? data.numPremProf ?? "");
    setValue("numDirInst", data.subCO53_direccionInstitutos ?? data.numDirInst ?? "");
    setValue("numPasObj", data.subCO53_pasantiasObjeto ?? data.numPasObj ?? "");
    setValue("numPasOtras", data.subCO53_pasantiasOtras ?? data.numPasOtras ?? "");
    setValue("numExamenEscrito", data.notaEscrita ?? data.notaEscrito ?? data.notaExamenEscrita ?? "");
    setValue("numExamenOral", data.notaOral ?? data.notaOralPractico ?? "");
    const juradoTotal = data.aptitudGlobal ?? data.notaAptitud ?? (
      (Number(data.crit_1 || data.crit1 || data.matrizJuradoA?.[0] || data.matrizJurado?.[0] || data.jurado?.[0] || 0)) +
      (Number(data.crit_2 || data.crit2 || data.matrizJuradoA?.[1] || data.matrizJurado?.[1] || data.jurado?.[1] || 0)) +
      (Number(data.crit_3 || data.crit3 || data.matrizJuradoA?.[2] || data.matrizJurado?.[2] || data.jurado?.[2] || 0)) +
      (Number(data.crit_4 || data.crit4 || data.matrizJuradoA?.[3] || data.matrizJurado?.[3] || data.jurado?.[3] || 0)) +
      (Number(data.crit_5 || data.crit5 || data.matrizJuradoA?.[4] || data.matrizJurado?.[4] || data.jurado?.[4] || 0))
    );
    setValue("numTotalJurado", juradoTotal ?? "");
    const totalJuradoWrapper = document.getElementById("totalJuradoWrapper") as HTMLElement | null;
    if (totalJuradoWrapper) {
      totalJuradoWrapper.classList.remove("d-none");
    }
    setValue("crit_1", data.crit_1 ?? data.crit1 ?? data.matrizJuradoA?.[0] ?? data.matrizJurado?.[0] ?? data.jurado?.[0] ?? 0);
    setValue("crit_2", data.crit_2 ?? data.crit2 ?? data.matrizJuradoA?.[1] ?? data.matrizJurado?.[1] ?? data.jurado?.[1] ?? 0);
    setValue("crit_3", data.crit_3 ?? data.crit3 ?? data.matrizJuradoA?.[2] ?? data.matrizJurado?.[2] ?? data.jurado?.[2] ?? 0);
    setValue("crit_4", data.crit_4 ?? data.crit4 ?? data.matrizJuradoA?.[3] ?? data.matrizJurado?.[3] ?? data.jurado?.[3] ?? 0);
    setValue("crit_5", data.crit_5 ?? data.crit5 ?? data.matrizJuradoA?.[4] ?? data.matrizJurado?.[4] ?? data.jurado?.[4] ?? 0);

    const chkRequisitos = document.getElementById("chkRequisitos") as HTMLInputElement | null;
    const chkAsistencia = document.getElementById("chkAsistencia") as HTMLInputElement | null;
    if (chkRequisitos) chkRequisitos.checked = data.cumpleRequisitos === 1 || data.cumpleRequisitos === "1" || data.cumpleRequisitos === true;
    if (chkAsistencia) chkAsistencia.checked = data.sePresento === 1 || data.sePresento === "1" || data.sePresento === true;
  }

  public agregarAlHistorialLocal(cedula: string | number, nombre: string, exitoso: boolean): void {
    if (!this.tablaCarga) return;
    if (this.tablaCarga.innerHTML.includes("Esperando ingresos...")) {
      this.tablaCarga.innerHTML = "";
    }

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><strong>${cedula}</strong></td>
      <td>${nombre}</td>
      <td>
        <span class="badge ${exitoso ? 'bg-success' : 'bg-danger'}">
          ${exitoso ? 'Sincronizado ✅' : 'Error ❌'}
        </span>
      </td>
    `;
    this.tablaCarga.appendChild(fila);
  }

  public limpiarFormulario(): void {
    if (!this.formulario) {
      this.formulario = document.getElementById("formRegistroAspirante") as HTMLFormElement | null;
    }
    if (this.formulario) {
      this.formulario.reset();
      const resetFields = [
        "numPostgradoRaw",
        "numPregradoRaw",
        "numProduccionRaw",
        "numExperienciaRaw",
        "numTotalJurado",
        "numExamenEscrito",
        "numExamenOral",
        "crit_1",
        "crit_2",
        "crit_3",
        "crit_4",
        "crit_5"
      ];
      resetFields.forEach((id) => {
        const input = document.getElementById(id) as HTMLInputElement | null;
        if (input) {
          input.value = "";
        }
      });
      const totalJuradoWrapper = document.getElementById("totalJuradoWrapper") as HTMLElement | null;
      if (totalJuradoWrapper) {
        totalJuradoWrapper.classList.add("d-none");
      }
    }
  }

  public mostrarFormulario(): void {
    if (!this.formulario) {
      this.formulario = document.getElementById("formRegistroAspirante") as HTMLFormElement | null;
    }
    if (this.formulario) {
      this.formulario.classList.remove("d-none");
      this.formulario.style.display = "";
    }
  }
}