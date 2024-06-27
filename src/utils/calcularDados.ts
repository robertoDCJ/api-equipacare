import { calcularDadosInterface } from "../interfaces";

export const calcularDados = ({
  numeroSalasCirurgicas,
  numeroCirurgiasSalaDia,
  numeroLeitosUTI,
  numeroLeitosInternacao,
  numeroLeitosRPA,
  numeroLeitosObservacao,
  numeroLeitosHospitalDia,
}: calcularDadosInterface) => {
  const numeroDeCirurgiasPorDia =
    numeroSalasCirurgicas * numeroCirurgiasSalaDia;
  const volumeTotalDiarioCirurgias = 1.5 * numeroDeCirurgiasPorDia;
  const volumeTotalDiarioUTIs = 0.5 * numeroLeitosUTI;
  const numeroLeitosGeral =
    numeroLeitosInternacao +
    numeroLeitosRPA +
    numeroLeitosObservacao +
    numeroLeitosHospitalDia;
  const volumeTotalDiarioInternacao = 0.05 * numeroLeitosGeral;
  const estimativaVolumeTotalDiarioPorMaterial =
    volumeTotalDiarioInternacao +
    volumeTotalDiarioUTIs +
    volumeTotalDiarioCirurgias;
  const estimativaDeVolumeTotalDiarioUE =
    estimativaVolumeTotalDiarioPorMaterial * 2;
  const estimativaDeVolumeTotalDiarioLitros = Math.ceil(
    estimativaDeVolumeTotalDiarioUE * 54
  );

  return {
    estimativaDeVolumeTotalDiarioLitros,
    estimativaVolumeTotalDiarioPorMaterial,
    numeroDeCirurgiasPorDia,
  };
};
