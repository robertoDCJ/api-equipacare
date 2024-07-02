import { PrismaClient } from "@prisma/client";
import { modeloLavadora } from "../interfaces";
import { calcularLavadoras } from "./calcularLavadoras";
import { obterResultadosFinais } from "./obterResultadosFinais";
import { resultadosFinais } from "./resultadosFinais";

const prisma = new PrismaClient();

export const calcularResultadosLavadoras = async (
  estimativaVolumeTotalDiarioMaterial: number,
  cirurgiasPorDia: number,
  numeroleitosUTI: number,
  quantidadeDeTermos: number,
  modelos: modeloLavadora[]
) => {
  const resultados: any[] = await Promise.all(
    modelos.map(async (modelo) => {
      return await calcularLavadoras(
        estimativaVolumeTotalDiarioMaterial,
        cirurgiasPorDia,
        numeroleitosUTI,
        quantidadeDeTermos,
        [modelo]
      );
    })
  );

  const resultadosAchatados = resultados.flat().filter(Boolean);
  const resultadosFiltrados = obterResultadosFinais(
    resultadosAchatados,
    [1, 2, 3, 4, 5, 6]
  );

  const resultadosFiltradosAchatados = resultadosFiltrados.flat();

  const resultadoFinal = await resultadosFinais(resultadosFiltradosAchatados);

  return [quantidadeDeTermos, resultadoFinal];
};
