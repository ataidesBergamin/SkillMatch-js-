// Objeto de Candidato
const candidato = {
  nome: "Pedro Silva",
  area: "Front-end",
  habilidades: ["HTML5", "CSS", "GitHub", "JavaScript"],
  tempoExperienciaMeses: 3,
};
// Array de Vagas
const vagas = [
  //vaga
  {
    vagaEmAberto: false,
    id: 1,
    empresa: "Tech Master",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: ["JavaScript", "React", "Node.js"],
    salario: 5000,
    modalidade: "Presencial",
  },
  //vaga
  {
    vagaEmAberto: false,
    id: 2,
    empresa: "New Tech",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: ["JavaScript", "CSS", "HTML5", "Logica de Programacao"],
    salario: 3600,
    modalidade: "Hibrida",
  },
  //vaga
  {
    vagaEmAberto: false,
    id: 3,
    empresa: "Inova Solucoes",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: ["CSS", "HTML5", "Logica de Programacao", "GitHub"],
    salario: 2800,
    modalidade: "Remota",
  },
  //vaga
  {
    vagaEmAberto: true,
    id: 4,
    empresa: "Exelencia Softwares",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: ["JavaScript", "React", "Node.js", "Ingles Intermediario"],
    salario: 8000,
    modalidade: "Hibrida",
  },
];

// Calcular qual a vaga é a mais compatível com as habilidades do candidato
function encontrarCompatibilidade(candidato, vagas) {
  let vagaCompativel = null;

  for (const vaga of vagas) {
    // Ignora vagas fechadas
    if (!vaga.vagaEmAberto) continue;

    let possuiNaVaga = [];
    let faltaNaVaga = [];
    // Verifica cada requisito da vaga
    for (const requisito of vaga.requisitos) {
      // Verifica se o candidato possui a habilidade exigida pela vaga
      if (candidato.habilidades.includes(requisito)) {
        possuiNaVaga.push(requisito);
      } else {
        faltaNaVaga.push(requisito);
      }
    }

    const percentualCompatibilidade =
      (possuiNaVaga.length / vaga.requisitos.length) * 100;

    if (
      vagaCompativel === null ||
      percentualCompatibilidade > vagaCompativel.percentualCompatibilidade
    ) {
      vagaCompativel = {
        vaga,
        percentualCompatibilidade,
        possuiNaVaga,
        faltaNaVaga,
      };
    }
  }

  return vagaCompativel;
}

const vagaCompativel = encontrarCompatibilidade(candidato, vagas);

if (vagaCompativel) {
  console.log("Vaga mais compatível para " + candidato.nome + ":");
  console.log(
    "Empresa: " +
      vagaCompativel.vaga.empresa +
      " \nCargo: " +
      vagaCompativel.vaga.cargo +
      " \nCompatibilidade: " +
      vagaCompativel.percentualCompatibilidade.toFixed(0) +
      "%",
  );
  console.log(
    "Habilidades encontradas: " + vagaCompativel.possuiNaVaga.join(", "),
  );
  console.log(
    "Habilidades faltantes: " + vagaCompativel.faltaNaVaga.join(", "),
  );
  let parametro = "";
  const percentual = vagaCompativel.percentualCompatibilidade;

  switch (true) {
    case percentual >= 80 && percentual <= 100:
      parametro = "Compatibilidade alta";
      break;
    case percentual >= 50 && percentual < 80:
      parametro = "Compatibilidade media";
      break;
    default:
      parametro = "Compatibilidade baixa";
  }
  console.log("Classificacao: " + parametro);
  console.log(
    "Recomendacção de estudo:" +
      "\nPriorize aprender: " +
      vagaCompativel.faltaNaVaga.join(", ") +
      ", pois são as habilidades exigidas pela vaga que o candidato ainda não possui.",
  );
} else {
  console.log("Nao ha vagas em aberto para analise.");
}
