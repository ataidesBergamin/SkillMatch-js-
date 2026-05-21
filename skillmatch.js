// Opção de entrada de dados dos candidatos
// Inicar

/* const message = print(
  "Bem-vindo ao SkillMatch! Vamos encontrar a vaga mais compatível para cada candidato.",
);
print("Digite o nome do candidato:");
const nome = prompt("Digite o nome do candidato:");
print("Digite a área de atuação:");
const area = prompt("Digite a área de atuação:");
print("Digite as habilidades (separadas por vírgula):");
const habilidades = prompt(
  "Digite as habilidades (separadas por vírgula):",
).split(",");
print("Digite o tempo de experiência (em meses):");
const tempoExperienciaMeses = parseInt(
  prompt("Digite o tempo de experiência (em meses):"),
); */
// Objeto de Candidato
class Candidato {
  constructor(nome, area, habilidades, tempoExperienciaMeses) {
    this.nome = nome;
    this.area = area;
    this.habilidades = habilidades;
    this.tempoExperienciaMeses = tempoExperienciaMeses;
    /*  this.skills = [];
    this.requisites = []; */
  }
}
/* const candidato = new Candidato(nome, area, habilidades, tempoExperienciaMeses); */
const candidato = new Candidato(
  "John Doe",
  "TI",
  ["JavaScript", "CSS", "HTML5"],
  12,
);

// Array de Vagas
const vagas = [
  //vaga
  {
    vagaEmAberto: true,
    id: 1,
    empresa: "Tech Master",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: [
      "JavaScript",
      "React",
      "Node.js",
      "Arrays",
      "Funcoes",
      "Objetos",
    ],
    salario: 5000,
    modalidade: "Presencial",
  },
  //vaga
  {
    vagaEmAberto: true,
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
    requisitos: [
      "JavaScript",
      "HTML5",
      "CSS",
      "GitHub",
      "React",
      "Node.js",
      "Ingles Intermediario",
    ],
    salario: 8000,
    modalidade: "Hibrida",
  },
];

// Calcular qual a vaga é a mais compatível com as habilidades do candidato
function encontrarCompatibilidade(candidato, vagas) {
  let vagaCompativel = null;

  for (const vaga of vagas) {
    if (!vaga.vagaEmAberto) continue;
    // calcula quais habilidades o candidato possui e quais faltam para cada vaga
    const { possuiNaVaga, faltaNaVaga } = vaga.requisitos.reduce(
      (acumulador, requisito) => {
        if (candidato.habilidades.includes(requisito)) {
          acumulador.possuiNaVaga.push(requisito);
        } else {
          acumulador.faltaNaVaga.push(requisito);
        }
        return acumulador;
      },
      { possuiNaVaga: [], faltaNaVaga: [] },
    );
    // calcula o percentual de compatibilidade com base nas habilidades que o candidato possui em relação aos requisitos da vaga
    const percentualCompatibilidade =
      (possuiNaVaga.length / vaga.requisitos.length) * 100;
    // Cria um objeto para armazenar as informações da vaga e a compatibilidade calculada
    const compativel = {
      vaga,
      percentualCompatibilidade,
      possuiNaVaga,
      faltaNaVaga,
    };
    vagaCompativel =
      !vagaCompativel ||
      compativel.percentualCompatibilidade >
        vagaCompativel.percentualCompatibilidade
        ? compativel
        : vagaCompativel;
    /*  if (
      !vagaCompativel ||
      compativel.percentualCompatibilidade >
        vagaCompativel.percentualCompatibilidade
    ) {
      vagaCompativel = compativel;
    } */
  }
  return vagaCompativel;
}
const vagaCompativel = encontrarCompatibilidade(candidato, vagas);
// Classificar a compatibilidade em alta, média ou baixa com base no percentual calculado
let parametro = "";
const percentual = vagaCompativel.percentualCompatibilidade;
switch (true) {
  case percentual >= 80 && percentual <= 100:
    parametro = "Compatibilidade alta";
    break;
  case percentual >= 50 && percentual < 80:
    parametro = "Compatibilidade média";
    break;
  default:
    parametro = "Compatibilidade baixa";
}
// Saida esperada
if (vagaCompativel) {
  console.log("Vaga mais compatível para " + candidato.nome + ":");
  console.log(
    "Empresa: " +
      vagaCompativel.vaga.empresa +
      " \nCargo: " +
      vagaCompativel.vaga.cargo +
      " \nCompatibilidade: " +
      vagaCompativel.percentualCompatibilidade.toFixed(0) +
      "%" +
      "\nHabilidades encontradas: " +
      vagaCompativel.possuiNaVaga.join(", ") +
      "\nHabilidades faltantes: " +
      vagaCompativel.faltaNaVaga.join(", ") +
      "\nClassificação: " +
      parametro,
  );
} else {
  console.log("Nao há vagas em aberto para analise.");
}
// Recomendação de estudo
function monitorarVagas(vagas) {
  //agrupa todas as habilidades exigidas pelas vagas, remove as repetidas e filtra apenas as que o candidato ainda não possui
  const monitoramento = vagas
    .map((vaga) => vaga.requisitos) // cria array de arrays
    .flat() // vira um array unico de requisitos
    .filter((hab, i, arr) => arr.indexOf(hab) === i) // remove repetidas
    .filter((hab) => !candidato.habilidades.includes(hab)); // so as que nao possui
  return monitoramento;
}
const habilidadesParaEstudar = monitorarVagas(vagas);
console.log(
  "Recomendação de estudo:" +
    "\nPriorize aprender: " +
    habilidadesParaEstudar.join(", ") +
    ", pois são as habilidades exigidas pelo mercado para as vagas de Desenvolvedor Front-end.",
);
/*  alert("Habilidades encontradas: " + possuiNaVaga.join(", "));
alert("Habilidades faltantes: " + faltaNaVaga.join(", "));
} */
