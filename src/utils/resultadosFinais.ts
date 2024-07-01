import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resultadosFinais = async (resultadosFiltradosAchatados: any[]) => {
  const resultado = await Promise.all(
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
  return await resultado;
};
