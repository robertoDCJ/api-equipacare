import { modeloLavadora } from "../interfaces";
import { resultadoNaoFormatadoInterface } from "../interfaces/resultadoNaoFormatadoInterface";

export const calcularLavadoras = (
  estimativaVolumeTotalDiarioMaterial: number,
  cirurgiasPorDia: number,
  numeroleitosUTI: number,
  quantidadeDeTermos: number,
  modelos: modeloLavadora[]
) => {
  const resultadoTodosModelos: resultadoNaoFormatadoInterface[] = [];

  modelos.forEach((modelo) => {
    const nomeModelo = modelo.name;
    const marcaId = modelo.marcaId;
    const preco = modelo.preco;

    const capacidadeProcessamentoUEInstrumentos =
      modelo.capacidadeDeCargaDeBandejasDeInstrumentos /
      modelo.numerodeBandejasPorUE;

    const numeroCiclosNecessariosDiariamenteParaIntrumentos =
      estimativaVolumeTotalDiarioMaterial /
      capacidadeProcessamentoUEInstrumentos;

    const tempoNecessarioParaProcessarADemandaDeInstrumentosMin =
      numeroCiclosNecessariosDiariamenteParaIntrumentos *
      (modelo.tempoMedioCicloInstrumentosComCargaMaxima +
        modelo.interveloMedioEntreCiclosMIn);

    const quantidadeTraqueiasPorDiaCirurgia =
      cirurgiasPorDia * modelo.quantidadeDeTraqueiasPorCirurgia;

    const quantidadeTraqueiasPorDiaUTI =
      numeroleitosUTI * modelo.quantidadeTraqueiasPorLeitoUTIDia;

    const quantidadeTraqueiasPorDiaTOTAL =
      quantidadeTraqueiasPorDiaCirurgia + quantidadeTraqueiasPorDiaUTI;

    const quantidadeCiclosNecessariosDiariamenteParaAssistVent =
      quantidadeTraqueiasPorDiaTOTAL / modelo.capacidadeDeCargaTraqueias;
    const tempoMedioCicloAssistenciaVentilatoriaComCargaMaxima =
      modelo.tempoMedioCicloAssistenciaVentilatoriaComCargaMaxMin;

    const tempoNecessarioParaProcessarDemandaDeAssistVent =
      quantidadeCiclosNecessariosDiariamenteParaAssistVent *
      (tempoMedioCicloAssistenciaVentilatoriaComCargaMaxima +
        modelo.interveloMedioEntreCiclosMIn);

    const demandaTempoDia =
      tempoNecessarioParaProcessarADemandaDeInstrumentosMin +
      tempoNecessarioParaProcessarDemandaDeAssistVent;

    // const QuantidadeDeTermos = quantidadeDeTermos;

    const minutosDisponiveisDiariamenteSomandoEquipamentos =
      60 * 24 * quantidadeDeTermos;

    const percentualDeUltilizacao =
      (demandaTempoDia / minutosDisponiveisDiariamenteSomandoEquipamentos) *
      100;

    // const percentualFormatado = formatarPercentual(
    //   percentualUtilizacaoCapacidadeMaxima
    // );
    resultadoTodosModelos.push({
      nomeModelo,
      preco,
      marcaId,
      percentualDeUltilizacao,
    });
    // return {
    //   nomeModelo,
    //   preco,
    //   marcaId,
    //   percentualUtilizacao,
    // };
  });

  // const resultadosAchatados = resultadoLavadoras.flat().filter(Boolean);
  // const resultadoFiltrados = obterResultadosFinais(resultadosAchatados, [
  //   "A",
  //   "B",
  //   "C",
  //   "D",
  //   "E",
  //   "F",
  // ]);

  // const resultadoFinal = resultadoFiltrados.flat();

  // return { quantidadeDeTermos, resultadoFinal };
  return resultadoTodosModelos;
};
