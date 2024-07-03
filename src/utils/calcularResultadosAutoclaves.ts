import { modeloAutoclave } from "../interfaces";
import { calcularAutoclaves } from "./calcularAutoclaves";
import { obterResultadosFinais } from "./obterResultadosFinais";
import { resultadosFinais } from "./resultadosFinais";

export const calcularResultadosAutoclaves = async (
  modelos: modeloAutoclave[],
  intervaloDePicoCME: any,
  volumeDiario: number,
  numeroAutoclaves: number
) => {
  const resultados: any[] = await Promise.all(
    modelos.map(async (modelo) => {
      let inputsCalcularModelos = {
        volumeDiarioDeMaterialLitros: volumeDiario,
        intervaloDePicoCME: intervaloDePicoCME,
        modelos: [modelo],
        numeroAutoclaves: numeroAutoclaves,
      };

      return await calcularAutoclaves(inputsCalcularModelos);
    })
  );

  const resultadosAchatados = resultados.flat().filter(Boolean);
  const resultadosFiltrados = obterResultadosFinais(
    resultadosAchatados,
    [1, 2, 3, 4, 5, 6]
  );
  const resultadosFiltradosAchatados = resultadosFiltrados.flat();

  const resultadoFinal = await resultadosFinais(resultadosFiltradosAchatados);

  return [numeroAutoclaves, resultadoFinal];
};
