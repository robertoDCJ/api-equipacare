import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { modeloAutoclave, modeloLavadora, reqInterface } from "../interfaces";
import * as calculos from "../utils";

const prisma = new PrismaClient();

// Pega todos os modelos de autoclaves ao rodar o projeto
let autoclaves: modeloAutoclave[] = [];

export const calcular = async (req: Request, res: Response) => {
  const getAllAutoclaves = async (): Promise<void> => {
    autoclaves = [];

    try {
      let response = await prisma.autoclaves.findMany();

      response.forEach((item) => {
        autoclaves.push({
          id: item.id,
          name: item.name,
          preco: item.preco,
          marcaId: item.marcaId,
          volumeTotalDaCamaraLitros: item.volumeTotalDaCamaraLitros,
          volumeUtilDaCamaraLitros: item.volumeUtilDaCamaraLitros,
          tempoTotalMedioDoCicloInclindoSecagemMin:
            item.tempoTotalMedioDoCicloInclindoSecagemMin,
          tempoDeCargaEDescargaMin: item.tempoDeCargaEDescargaMin,
          tempoParaTesteDiarioDeBDMin: item.tempoParaTesteDiarioDeBDMin,
          tempoParaProcedimentoDiarioDeAquecimentoMin:
            item.tempoParaProcedimentoDiarioDeAquecimentoMin,
        });
      });
      // autoclaves.push(response);

      console.log("*** autoclaves obtidas com sucesso", autoclaves);
    } catch (error) {
      console.error("Erro ao obter autoclaves:", error);
    }
  };
  // getAllAutoclaves();
  // .then(async () => {
  //   await prisma.$disconnect();
  // })
  // .catch(async (e) => {
  //   console.log(e);
  //   await prisma.$disconnect();
  //   process.exit(1);
  // });

  // Pega todos os modelos de lavadoras termo ao rodar o projeto
  let lavadoras: modeloLavadora[] = [];

  const getAllLavadoras = async (): Promise<void> => {
    lavadoras = [];

    try {
      let response = await prisma.lavadorasTermo.findMany();

      response.forEach((item) => {
        lavadoras.push({
          id: item.id,
          name: item.name,
          preco: item.preco,
          marcaId: item.marcaId,
          volumeTotalCamaraLitros: item.volumeTotalCamaraLitros,
          capacidadeDeCargaDeBandejasDeInstrumentos:
            item.capacidadeDeCargaDeBandejasDeInstrumentos,
          capacidadeDeCargaTraqueias: item.capacidadeDeCargaTraqueias,
          intervaloMedioEntreCiclosMin: item.intervaloMedioEntreCiclosMin,
          tempoMedioCicloInstrumentosComCargaMaximaMin:
            item.tempoMedioCicloInstrumentosComCargaMaximaMin,
          tempoMedioCicloAssistenciaVentilatoriaComCargaMaximaMin:
            item.tempoMedioCicloAssistenciaVentilatoriaComCargaMaximaMin,
          numerodeBandejasPorUE: item.numerodeBandejasPorUE,
          interveloMedioEntreCiclosMIn: item.interveloMedioEntreCiclosMIn,
          quantidadeDeTraqueiasPorCirurgia:
            item.quantidadeDeTraqueiasPorCirurgia,
          quantidadeTraqueiasPorLeitoUTIDia:
            item.quantidadeTraqueiasPorLeitoUTIDia,
          tempoMedioCicloAssistenciaVentilatoriaComCargaMaxMin:
            item.tempoMedioCicloAssistenciaVentilatoriaComCargaMaxMin,
          tempoMedioCicloInstrumentosComCargaMaxima:
            item.tempoMedioCicloInstrumentosComCargaMaxima,
        });
      });

      // lavadoras.push(response);

      console.log("*** lavadoras obtidas com sucesso", lavadoras);
    } catch (error) {
      console.error("Erro ao obter lavadoras:", error);
    }
  };
  // getAllLavadoras();
  // .then(async () => {
  //   await prisma.$disconnect();
  // })
  // .catch(async (e) => {
  //   console.log(e);
  //   await prisma.$disconnect();
  //   process.exit(1);
  // });

  await getAllLavadoras();
  await getAllAutoclaves();
  try {
    //Recebe os inputs do usuario
    const {
      numeroSalasCirurgicas,
      numeroCirurgiasSalaDia,
      intervaloDePicoCME,
      numeroLeitosUTI,
      numeroLeitosInternacao,
      numeroLeitosRPA,
      numeroLeitosObservacao,
      numeroLeitosHospitalDia,
    }: reqInterface = req.body;

    // Calcula o Volume Diário de Material em Litros usando os inputs passados pelo usuario
    const volumeDiario = calculos.calcularDados({
      numeroSalasCirurgicas,
      numeroCirurgiasSalaDia,
      intervaloDePicoCME,
      numeroLeitosUTI,
      numeroLeitosInternacao,
      numeroLeitosRPA,
      numeroLeitosObservacao,
      numeroLeitosHospitalDia,
    });

    // ----- CALCULO AUTOCLAVES -----

    // Uni todos os modelos das Autoclaves
    const todosModelosAutoclaves = autoclaves.flat();

    // Acha a quantidade minima de autoclaves e ja traz os dois melhores modelos de cada marca
    let resultadosAutoclaves;
    let numeroDeAutoclaves = 2;

    while (true) {
      resultadosAutoclaves = await calculos.calcularResultadosAutoclaves(
        todosModelosAutoclaves,
        intervaloDePicoCME,
        volumeDiario.estimativaDeVolumeTotalDiarioLitros,
        numeroDeAutoclaves
      );

      if (resultadosAutoclaves.flat().length === 13) {
        break;
      }
      numeroDeAutoclaves++;
    }

    // ----- CALCULO LAVADORAS TERMO -----

    const todosModelosLavadoras = lavadoras.flat();

    let resultadoLavadoras;
    let numeroDeLavadoras: number = 1;

    while (true) {
      resultadoLavadoras = await calculos.calcularResultadosLavadoras(
        volumeDiario.estimativaVolumeTotalDiarioPorMaterial,
        volumeDiario.numeroDeCirurgiasPorDia,
        numeroLeitosUTI,
        numeroDeLavadoras,
        todosModelosLavadoras
      );

      if (
        resultadoLavadoras.flat().length > 5 &&
        resultadoLavadoras.flat().length < 12
      ) {
        break;
      }

      numeroDeLavadoras++;
    }

    // return res.status(200).json(resultadoLavadoras);
    return res.status(200).json([resultadosAutoclaves, resultadoLavadoras]);
  } catch (error) {
    console.error(
      "Ocorreu um erro ao tentar realizar o calculo. Tente novamente mais tarde.",
      error
    );
    res.status(500).send(error);
  }
};
