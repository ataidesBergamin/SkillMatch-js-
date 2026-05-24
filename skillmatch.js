//------------------------------- Inicio -----------------------------------
// Opção de entrada de dados dos candidatos - (executa somente via Live Server)
function iniciar() {
  return new Promise((resolve, reject) => {
    // remove espaços extras no inicio e no fim das palavras
    const nomeInput = prompt("Digite o nome do candidato:");
    // se nome for nulo retora um erro
    if (nomeInput === null) return reject(new Error("Entrada cancelada."));
    const nome = nomeInput.trim();
    if (!nome) return reject(new Error("Nome inválido."));

    const areaInput = prompt("Digite a área de atuação:");
    if (areaInput === null) return reject(new Error("Entrada cancelada."));
    const area = areaInput.trim().toLowerCase();
    if (!area) return reject(new Error("Área inválida."));

    const habilidadesInput = prompt(
      "Digite as habilidades (separadas por vírgula):",
    );
    if (habilidadesInput === null)
      return reject(new Error("Entrada cancelada."));
    const habilidades = habilidadesInput
      .split(",")
      .map((habilidade) => habilidade.trim().toLowerCase())
      .filter((habilidade) => habilidade.length > 0) // remove items vazios
      .filter((hab, i, arr) => arr.indexOf(hab) === i); // remove habilidades duplicadas
    if (!habilidades.length) return reject(new Error("Habilidades inválidas."));

    const experienciaInput = prompt(
      "Digite o tempo de experiência (em meses):",
    );
    if (experienciaInput === null)
      return reject(new Error("Entrada cancelada."));
    const tempoExperienciaMeses = Number(experienciaInput.trim());
    if (
      Number.isNaN(tempoExperienciaMeses) ||
      tempoExperienciaMeses < 0 ||
      !Number.isInteger(tempoExperienciaMeses)
    ) {
      return reject(new Error("Tempo de experiência inválido."));
    }

    resolve({ nome, area, habilidades, tempoExperienciaMeses });
  });
}
async function criarCandidato() {
  // se a função iniciar falhar cai direto no catch para tratamento de erro
  try {
    const dados = await iniciar();
    return new Candidato(
      dados.nome,
      dados.area,
      dados.habilidades,
      dados.tempoExperienciaMeses,
    );
  } catch (erro) {
    console.log(erro.message);
    return null;
  }
}

// Objeto de Candidato -----------------------------------------------------
class Candidato {
  constructor(nome, area, habilidades, tempoExperienciaMeses) {
    this.nome = nome;
    this.areaDesejada = area;
    this.habilidades = habilidades;
    this.tempoExperienciaMeses = tempoExperienciaMeses;
  }
}
// Exemplo de uso com dados de entrada
/* let candidato; */
// espera a entrada dos dados para dar sequeincia ao fluxo
async function executarComEntradaReal() {
  const vagasAbertas = Vaga.filtrarVagasEmAberto(vagas);
  const vagasFrontEnd = VagasFrontEnd.filtrarVagasFrontEnd(vagas).filter(
    (vaga) => vaga.vagaEmAberto,
  );
  const candidato = await criarCandidato();
  if (!candidato) return;
  console.log("Candidato carregado:", candidato.nome);
  // Redefinição da Closure para um Objeto de Candidato
  // execução da função encontrarCompatibilidade()
  const calcularCompatibilidade = encontrarCompatibilidade(
    candidato,
    vagasAbertas,
  );
  const vagaCompativel = calcularCompatibilidade();
  // execução das funçãos
  // Calculo para compatibilidade baixa, media ou alta
  calcCompatib(vagaCompativel, candidato);
  // Indicação de estudo
  const recomendacaoExpandida = monitorarVagas(vagasFrontEnd, candidato);
  console.log(
    "Recomendação de estudo!" +
      "\nPara atuar na vaga que o candidato deseja, ele deve aprender as seguintes habilidades:\n" +
      "Requisitos em vagas que o candidato deseja atuar mas não possui estas habilidades:\n" +
      recomendacaoExpandida.habilidadesAlvoExato.join(" - ") +
      "\nRequisitos de habilidades em vagas relacionadas à área de atuação:\n" +
      recomendacaoExpandida.habilidadesAreaRelacionada.join(" - "),
  );
  //Analise dos requisitos nas vagas em aberto
  requisitosVagas(vagas, candidato);
}
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
  static filtrarVagasEmAberto(vagas) {
    return vagas.filter((vaga) => vaga.vagaEmAberto);
  }
}
// Herança da classe vaga
class VagasFrontEnd extends Vaga {
  constructor({
    empresa,
    cargo,
    requisitos,
    salario,
    modalidade,
    vagaEmAberto = true,
  }) {
    super({
      empresa,
      cargo,
      requisitos,
      salario,
      modalidade,
      vagaEmAberto,
    });
  }
  // filtra so vagas Front-end
  static filtrarVagasFrontEnd(vagas) {
    return vagas.filter((vaga) =>
      vaga.cargo.toLowerCase().includes("front-end"),
    );
  }
}
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
    cargo: "Estagiário Front-end Junior",
    requisitos: ["CSS", "HTML5", "Logica de Programacao", "GitHub"],
    salario: 2800,
    modalidade: "Remota",
  }),
  new Vaga({
    vagaEmAberto: true,
    empresa: "Exelencia Softwares",
    cargo: "Desenvolvedor Back-end Junior",
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
  new Vaga({
    vagaEmAberto: true,
    empresa: "Pixel Labs",
    cargo: "Estagiario Front-end",
    requisitos: ["HTML5", "CSS", "JavaScript", "GitHub", "Responsividade"],
    salario: 1800,
    modalidade: "Presencial",
  }),
  new Vaga({
    vagaEmAberto: false,
    empresa: "Data Forge",
    cargo: "Desenvolvedor Back-end Junior",
    requisitos: [
      "Node.js",
      "Express",
      "SQL",
      "APIs REST",
      "GitHub",
      "Logica de Programacao",
    ],
    salario: 5200,
    modalidade: "Hibrida",
  }),
  new Vaga({
    vagaEmAberto: true,
    empresa: "Cloud Vision",
    cargo: "Desenvolvedor Full Stack Pleno",
    requisitos: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "SQL",
      "GitHub",
    ],
    salario: 9500,
    modalidade: "Remota",
  }),
];
// Calcular a compatibilidade -----------------------------------------------------
// Calcula qual vaga é a mais compatível com as habilidades do candidato
// Closure
function encontrarCompatibilidade(candidato, vagasAbertas) {
  let vagaCompativel = null; // Valor guardado
  return function () {
    for (const vaga of vagasAbertas) {
      // calcula quais habilidades o candidato possui e quais faltam para cada vaga
      const { possuiNaVaga, faltaNaVaga } = vaga.requisitos.reduce(
        (acumulador, requisito) => {
          if (candidato.habilidades.includes(requisito.toLowerCase())) {
            acumulador.possuiNaVaga.push(requisito);
          } else {
            acumulador.faltaNaVaga.push(requisito);
          }
          return acumulador;
        },
        // recebimento de resultados da interação do Reduce
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
    // Comparacão com estrutura if para saber qual vaga é a mais compatível com as habilidades do candidato
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

// Retorna requisitos e Percentual de compatibilidade
// Percore todas as vagas em aberto e retorna os requisitos e a conpatibilidade de cada vaga
function requisitosVagas(vagasAbertas, candidato) {
  const habilidadesNormalizadas = candidato.habilidades.map((habilidade) =>
    habilidade.trim().toLowerCase(),
  );
  for (const analise of vagasAbertas) {
    console.log(
      "Requisitos da vaga - " +
        analise.cargo +
        ", na empresa - " +
        analise.empresa +
        ", em aberto:\n" +
        analise.requisitos.join(" | "),
      "\nO candidato não possui certas habilidades para esta vaga:\n" +
        analise.requisitos
          .filter(
            (req) =>
              !habilidadesNormalizadas.includes(req.trim().toLowerCase()),
          )
          .join(" | "),
      "\nO percentual de compatibilidade para esta vaga é de: " +
        Math.round(
          (analise.requisitos.filter((req) =>
            habilidadesNormalizadas.includes(req.trim().toLowerCase()),
          ).length /
            analise.requisitos.length) *
            100,
        ) +
        "%",
    );
  }
}

// Calculo da compatibilidade percentual ------------------------------------------------------
function calcCompatib(vagaCompativel, candidato) {
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
    console.log("Vaga mais compatível para " + candidato.nome);
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
        vagaCompativel.possuiNaVaga.join(" - ") +
        "\nHabilidades faltantes: " +
        vagaCompativel.faltaNaVaga.join(" - ") +
        "\nClassificação: " +
        parametro,
    );
  } else {
    console.log("Nao há vagas em aberto para analise.");
  }
}
// Recomendação de estudo ---------------------------------------------------
function monitorarVagas(vagasFrontEnd, candidato) {
  // Criar função de Callback ----------------------------------------------------
  function meuFilter(lista, callback) {
    const resultado = [];

    for (const item of lista) {
      if (callback(item)) {
        resultado.push(item);
      }
    }

    return resultado;
  }
  // Formatação das palavras da área desejada
  // uso do trim para remover espaços extras e do toLowerCase transformar tudo em minúsculo
  const areaDesejadaNormalizada = candidato.areaDesejada.toLowerCase().trim();
  // uso do split para dividir a string em palavras e do filter para remover palavras curtas (menos de 3 caracteres)
  const palavrasDaArea = meuFilter(
    areaDesejadaNormalizada.split(/\s+/),
    (palavra) => palavra.length > 2,
  );
  // validaçao vaga em aberto
  const vagasEmAberto = vagasFrontEnd;
  // filtro para vagas que correspondem exatamente à área desejada do candidato
  const vagasAlvoExato = meuFilter(vagasEmAberto, (vaga) =>
    vaga.cargo.toLowerCase().includes(areaDesejadaNormalizada),
  );
  // uso do some para verificar se alguma das palavras da área desejada está presente no cargo da vaga
  const vagasRelacionadas = meuFilter(vagasEmAberto, (vaga) => {
    const cargoNormalizado = vaga.cargo.toLowerCase();
    return palavrasDaArea.some((palavra) => cargoNormalizado.includes(palavra));
  });

  const extrairHabilidadesFaltantes = (listaDeVagas) =>
    listaDeVagas
      .map((vaga) => vaga.requisitos) // extrai os requisitos de cada vaga em varios arrays
      .flat() // junta os arrays em um único array
      .filter((hab, i, arr) => arr.indexOf(hab) === i) // remove requisitos duplicados
      // filtra apenas os requisitos que o candidato ainda não possui
      .filter((hab) => !candidato.habilidades.includes(hab));
  // remove as habilidades  já presentes nas vagas de alvo exato para evitar redundância na recomendação de estudo
  const habilidadesAlvoExato = extrairHabilidadesFaltantes(vagasAlvoExato);
  const habilidadesAreaRelacionadaBruta =
    extrairHabilidadesFaltantes(vagasRelacionadas);
  const habilidadesAreaRelacionada = habilidadesAreaRelacionadaBruta.filter(
    (hab) => !habilidadesAlvoExato.includes(hab),
  );
  return {
    // Objeto de resultados e seus atributos
    habilidadesAlvoExato,
    habilidadesAreaRelacionada,
    vagasAlvoExato,
    vagasAreaRelacionada: vagasRelacionadas,
  };
}

executarComEntradaReal();
