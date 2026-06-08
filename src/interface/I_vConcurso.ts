import { IAspirante } from "./I_vAspirante.js"; // 🔥 Importamos el participante real

export interface IConcurso {
    cargo: string;                   // "Analista de Innovación"
    empresa: string;                 // "Global Innovators Corp."
    listaAspirantes: IAspirante[];   // 🔥 El arreglo limpio usando las notas reales
}