//------------------------------- Inicio -----------------------------------
// Opção de entrada de dados dos candidatos - (executa somente via Live Server)
/* function iniciar(callback) {
  const nome = prompt("Digite o nome do candidato:");
  const area = prompt("Digite a área de atuação:");
  const habilidades = prompt("Digite as habilidades (separadas por vírgula):")
    .split(",")
    .map((habilidade) => habilidade.trim());
  const tempoExperienciaMeses = parseInt(
    prompt("Digite o tempo de experiência (em meses):"),
    10,
  );
  if (callback) {
    callback({ nome, area, habilidades, tempoExperienciaMeses });
  }
} */

// Objeto de Candidato -----------------------------------------------------
class Pessoa {
  constructor(nome, area) {
    this.nome = nome;
    this.areaDesejada = area;
  }

  resumo() {
    return `${this.nome} - Área Desejada: ${this.areaDesejada}`;
  }
}
// Herança da classe Pessoa
class Candidato extends Pessoa {
  constructor(nome, area, habilidades, tempoExperienciaMeses) {
    super(nome, area);
    this.habilidades = habilidades;
    this.tempoExperienciaMeses = tempoExperienciaMeses;
  }
}
// Exemplo de uso para candidato
const candidato = new Candidato(
  "John Doe",
  "TI",
  ["JavaScript", "CSS", "HTML5", "GitHub", "React", "Node.js", "Python"],
  12,
);
// Exemplo de uso com dados de entrada
/* let candidato;
iniciar((dados) => {
  candidato = new Candidato(
    dados.nome,
    dados.area,
    dados.habilidades,
    dados.tempoExperienciaMeses,
  );
}); */

/* alert("Teste de integração candidato: " + candidato.resumo()); */

// Objeto de Vagas -----------------------------------------------------
class Vaga {
  constructor({
    empresa,
    cargo,
    requisitos,
    salario,
    modalidade,
    vagaEmAberto = true,
  }) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
    this.vagaEmAberto = vagaEmAberto;
  }

  descricao() {
    return `${this.empresa} | ${this.cargo} | ${this.modalidade}`;
  }
}
// alert("Teste de integração vaga: " + vaga.descricao());

// Exemplo de uso paravagas
const vagas = [
  new Vaga({
    vagaEmAberto: true,
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
  }),
  new Vaga({
    vagaEmAberto: true,
    empresa: "New Tech",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: [
      "JavaScript",
      "CSS",
      "HTML5",
      "Logica de Programacao",
      "GitHub",
      "Designer Web ",
    ],
    salario: 3600,
    modalidade: "Hibrida",
  }),
  new Vaga({
    vagaEmAberto: false,
    empresa: "Inova Solucoes",
    cargo: "Desenvolvedor Front-end Junior",
    requisitos: ["CSS", "HTML5", "Logica de Programacao", "GitHub"],
    salario: 2800,
    modalidade: "Remota",
  }),
  new Vaga({
    vagaEmAberto: true,
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
  }),
];

// Calcular a compatibilidade -----------------------------------------------------
// Calcula qual vaga é a mais compatível com as habilidades do candidato
// Closure
function encontrarCompatibilidade(candidato, vagas) {
  let vagaCompativel = null; // Valor guardado
  return function () {
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
      // calcula o percentual de compatibilidade com base nas habilidades encontradas e faltantes
      const percentualCompatibilidade = Math.round(
        (possuiNaVaga.length / vaga.requisitos.length) * 100,
      );
      // Cria um objeto para armazenar as informações da vaga e a compatibilidade calculada
      const melhorVaga = {
        vaga,
        percentualCompatibilidade,
        possuiNaVaga,
        faltaNaVaga,
      };
      // Operador ternário: faz a comparação entre a vaga atual e a vaga mais compatível encontrada até o momento
      vagaCompativel =
        !vagaCompativel ||
        melhorVaga.percentualCompatibilidade >
          vagaCompativel.percentualCompatibilidade
          ? melhorVaga
          : vagaCompativel;
    }
    /*  if (
      !vagaCompativel ||
      compativel.percentualCompatibilidade >
        vagaCompativel.percentualCompatibilidade
      ) {
      vagaCompativel = compativel;
      } */

    return vagaCompativel;
  };
}
// Redefinição da Closure para um Objeto de Candidato
const calcularCompatibilidade = encontrarCompatibilidade(candidato, vagas);
const vagaCompativel = calcularCompatibilidade();

// Calculo da compatibilidade percentual ------------------------------------------------------
if (vagaCompativel) {
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
  // Saída detalhada da vaga mais compatível encontrada
  console.log("Vaga mais compatível para " + candidato.nome + ":");
  console.log(
    "Empresa: " +
      vagaCompativel.vaga.empresa +
      " \nCargo: " +
      vagaCompativel.vaga.cargo +
      " \nModalidade: " +
      vagaCompativel.vaga.modalidade +
      " \nSalario proposto: R$ " +
      vagaCompativel.vaga.salario +
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

// Recomendação de estudo ----------------------------------------------------
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
