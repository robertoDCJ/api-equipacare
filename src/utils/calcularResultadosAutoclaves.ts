import { PrismaClient } from "@prisma/client";
import { modeloAutoclave } from "../interfaces";
import { calcularAutoclaves } from "./calcularAutoclaves";
import { obterResultadosFinaisTest } from "./obterResultadosFinaisTest";

const prisma = new PrismaClient();

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
  const resultadosFiltrados = obterResultadosFinaisTest(
    resultadosAchatados,
    [1, 2, 3, 4, 5, 6]
  );
  const resultadosFiltradosAchatados = resultadosFiltrados.flat();

  const resultadosFinais = await Promise.all(
    resultadosFiltradosAchatados.map(async (item) => {
      const marca = await prisma.marcas.findUnique({
        where: {
          id: item.marcaId,
        },
      });

      const itemSlice = {
        marca: marca?.name,
        modelo: item.nomeModelo,
        preco: item.preco,
      };
      return await itemSlice;
    })
  );

  return [numeroAutoclaves, resultadosFinais];
};
