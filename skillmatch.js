// Objeto de Candidato
const candidato = {
  nome: "Pedro Silva",
  area: "Front-end",
  habilidades: ["JavaScript", "React", "Node.js"],
  tempoExperienciaMeses: 3,
};

// Array de Vagas
const vagas = [
  {
    id: 1,
    empresa: "Tech Master",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: ["JavaScript", "React", "Node.js"],
    salario: 5000,
    modalidade: "Presencial",
  },
  {
    id: 2,
    empresa: "New Tech",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: ["JavaScript", "CSS", "HTML5", "Logica de Programacao"],
    salario: 3600,
    modalidade: "Hibrida",
  },
  {
    id: 3,
    empresa: "Inova Solucoes",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: ["CSS", "HTML5", "Logica de Programacao", "GitHub"],
    salario: 2800,
    modalidade: "Remota",
  },
  {
    id: 4,
    empresa: "Exelencia Softwares",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: ["JavaScript", "React", "GitHub", "Ingles Intermediario"],
    salario: 8000,
    modalidade: "Hibrida",
  },
];

// Calcular quais vagas sao compativeis com as habilidades do candidato

function calcularCompatibilidade(candidato, vagas) {
  // recebe as habilidades do candidato ou seja o arry:["JavaScript", "React", "Node.js"]
  const habilidadesCandidato = candidato.habilidades;
  // array para armazenar as vagas que sao  100% compativeis com o candidato
  const vagasCompativeis = [];

  for (const vaga of vagas) {
    let requisitosAtendidos = 0;

    for (const requisito of vaga.requisitos) {
      if (habilidadesCandidato.includes(requisito)) {
        requisitosAtendidos++;
      }
    }

    if (requisitosAtendidos === vaga.requisitos.length) {
      vagasCompativeis.push(vaga);
    }
  }

  return vagasCompativeis;
}

const vCompativeis = calcularCompatibilidade(candidato, vagas);

console.log("Vagas compativeis para o candidato " + candidato.nome + ":");

for (const vaga of vCompativeis) {
  console.log("- " + vaga.empresa + " | " + vaga.cargo);
}

if (vCompativeis.length === 0) {
  console.log("Nenhuma vaga totalmente compativel encontrada.");
}
