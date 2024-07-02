import { modeloLavadora, resultadoNaoFormatadoInterface } from "../interfaces";

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

    const minutosDisponiveisDiariamenteSomandoEquipamentos =
      60 * 24 * quantidadeDeTermos;

    const percentualDeUltilizacao =
      (demandaTempoDia / minutosDisponiveisDiariamenteSomandoEquipamentos) *
      100;

    resultadoTodosModelos.push({
      nomeModelo,
      preco,
      marcaId,
      percentualDeUltilizacao,
    });
  });

  return resultadoTodosModelos;
};
