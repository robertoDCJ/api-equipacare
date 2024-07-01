import { resultadoNaoFormatadoInterface } from "../interfaces/resultadoNaoFormatadoInterface";
import { filtrarModelosTest } from "./filtrarModelosTest";

export const obterResultadosFinaisTest = (
  resultados: resultadoNaoFormatadoInterface[],
  marcas: number[]
) => {
  return marcas.map((marca) => filtrarModelosTest(resultados, marca));
};
