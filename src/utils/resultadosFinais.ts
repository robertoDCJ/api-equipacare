import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export const resultadosFinais = async (resultadosFiltradosAchatados: any[]) => {
  const resultado = await Promise.all(
    resultadosFiltradosAchatados.map(async (item) => {
      const marca = await prisma.marcas.findUnique({
        where: {
          id: item.marcaId,
        },
        cacheStrategy: { ttl: 60 },
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
