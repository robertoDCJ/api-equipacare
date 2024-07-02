export interface modeloAutoclave {
  id: number;
  name: string;
  marcaId: number;
  volumeTotalDaCamaraLitros: number;
  volumeUtilDaCamaraLitros: number;
  tempoTotalMedioDoCicloInclindoSecagemMin: number;
  tempoDeCargaEDescargaMin: number;
  tempoDoCicloConsiderandoCargaEDescargaMin?: number;
  tempoParaTesteDiarioDeBDMin: number;
  tempoParaProcedimentoDiarioDeAquecimentoMin: number;
  tempoDisponivelDiarioMin?: number;
  preco: number;
}
