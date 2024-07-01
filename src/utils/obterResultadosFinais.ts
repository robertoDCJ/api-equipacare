import { resultadoNaoFormatadoInterface } from "../interfaces";
import { filtrarModelos } from "./filtrarModelos";

export const obterResultadosFinais = (
  resultados: resultadoNaoFormatadoInterface[],
  marcas: number[]
) => {
  return marcas.map((marca) => filtrarModelos(resultados, marca));
};
