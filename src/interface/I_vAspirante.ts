export interface IAspirante {
  // Identificación Básica
  cedula: number;
  nombre: string;

  // --- SUBREQUISITOS REALES DE MÉRITOS (Baremos) ---
  // Formato CO-5: Postgrado (Máx 35 pts)
  subCO5_postgradoEspecialidad: number; // máx 25
  subCO5_postgradoOtros: number;        // máx 20
  subCO5_cursosAmpliacion: number;      // máx 6
  subCO5_reconocimientosTesis: number;  // máx 5

  // Formato CO-5.1: Pregrado (Máx 30 pts)
  subCO51_tituloPromedio: number;       // máx 25
  subCO51_preparadorAsistente: number;  // máx 10
  subCO51_actividadOtrasAreas: number;  // máx 3
  subCO51_diplomaSobresaliente: number; // máx 5
  subCO51_diplomaOtros: number;         // máx 3
  subCO51_reconocimientoInvest: number; // máx 3
  subCO51_reconocimientoExt: number;    // máx 3

  // Formato CO-5.2: Producción Científica (Máx 15 pts)
  subCO52_librosEditorial: number;      // máx 15
  subCO52_librosSinEditorial: number;   // máx 12
  subCO52_articulosArbitradosInd: number; // máx 10
  subCO52_articulosArbitradosNoInd: number; // máx 6
  subCO52_articulosNoArbitrados: number; // máx 4
  subCO52_articulosOtros: number;       // máx 3
  subCO52_memoriasCongreso: number;     // máx 10
  subCO52_ponencias: number;            // máx 6
  subCO52_patentes: number;             // máx 15

  // Formato CO-5.3: Experiencia Académica y Profesional (Máx 20 pts)
  subCO53_docenciaInvest: number;       // máx 12
  subCO53_premiosDocencia: number;      // máx 8
  subCO53_expProfesionalObjeto: number; // máx 6
  subCO53_expProfesionalOtras: number;  // máx 3
  subCO53_premiosProfesionales: number; // máx 4
  subCO53_direccionInstitutos: number;  // máx 6
  subCO53_pasantiasObjeto: number;      // máx 4
  subCO53_pasantiasOtras: number;       // máx 2

  // --- PRUEBAS DE CONOCIMIENTO (CO-8) y APTITUD (CO-10) ---
  notaExamenEscrito: number;       // Escrito (0-20 pts)
  notaExamenOralPractico: number;  // Oral/Práctico (0-20 pts)

  // Formato CO-10: Matriz de Aptitudes de los 3 Jurados (9 aspectos, escala 1-5)
  matrizJuradoA: number[]; 
  matrizJuradoB: number[]; 
  matrizJuradoC: number[]; 

  // Controles del Comité
  cumpleRequisitos: boolean; 
  sePresento: boolean;       
}