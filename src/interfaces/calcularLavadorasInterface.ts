import { modeloLavadora } from "./ModeloLavadora";

export interface calcularLavadorasInterface {
  estimativaVolumeTotalDiarioMaterial: number;
  cirurgiasPorDia: number;
  numeroleitosUTI: number;
  quantidadeDeTermos: number;
  modelos: modeloLavadora[];
}
