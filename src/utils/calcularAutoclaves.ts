import {
  calcularAutoclavesInterface,
  resultadoNaoFormatadoInterface,
} from "../interfaces";

export const calcularAutoclaves = async ({
  volumeDiarioDeMaterialLitros,
  intervaloDePicoCME,
  modelos,
  numeroAutoclaves,
}: calcularAutoclavesInterface) => {
  const resultadoTodosModelos: resultadoNaoFormatadoInterface[] = [];

  modelos.forEach((modelo) => {
    const nomeModelo = modelo.name;
    const preco = modelo.preco;
    const marcaId = modelo.marcaId;
    const volumeQuePrecisaraSerProcessadoNoIntervaloDePicoLitros =
      volumeDiarioDeMaterialLitros * 0.9;
    const intervaloDiarioDePicoMinutos =
      intervaloDePicoCME * 60 -
      (modelo.tempoParaTesteDiarioDeBDMin +
        modelo.tempoParaProcedimentoDiarioDeAquecimentoMin);
    const numeroMaximoDeCiclosDuranteIntervaloDePico =
      ((intervaloDiarioDePicoMinutos /
        (modelo.tempoDeCargaEDescargaMin +
          modelo.tempoTotalMedioDoCicloInclindoSecagemMin)) *
        100) /
      100;
    const capacidadeDeProcessamentoNoIntervaloDePico =
      numeroAutoclaves * // Numero de Autoclaves, verificar se será preciso alterar
      modelo.volumeUtilDaCamaraLitros *
      numeroMaximoDeCiclosDuranteIntervaloDePico;
    const percentualDeUltilizacao =
      (volumeQuePrecisaraSerProcessadoNoIntervaloDePicoLitros /
        capacidadeDeProcessamentoNoIntervaloDePico) *
      100;
    // const percentualFormatado = formatarPercentual(percentualDeUltilizacao);

    resultadoTodosModelos.push({
      nomeModelo,
      preco,
      marcaId,
      percentualDeUltilizacao,
    });
  });

  return resultadoTodosModelos;
};
