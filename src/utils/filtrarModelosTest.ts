import { resultadoNaoFormatadoInterface } from "../interfaces/resultadoNaoFormatadoInterface";

export const filtrarModelosTest = (
  resultados: resultadoNaoFormatadoInterface[],
  marca: number
) => {
  const resultadoModelos = resultados
    .filter(
      (item: resultadoNaoFormatadoInterface) =>
        item.marcaId === marca && item.percentualDeUltilizacao < 90
    )
    .sort((a: any, b: any) => b.percentualFormatado - a.percentualFormatado);

  const resultadoFinal = resultadoModelos.slice(0, 2);
  return resultadoFinal;
};
