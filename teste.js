class Pessoa {
  constructor(nome, area) {
    this.nome = nome;
    this.area = area;
  }

  resumo() {
    return `${this.nome} - Area: ${this.area}`;
  }
}

// Objeto de Vaga -----------------------------------------------------
class Vaga {
  constructor(
    empresa,
    cargo,
    requisitos,
    salario,
    modalidade,
    vagaEmAberto = true,
  ) {
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

class Candidato extends Pessoa {
  constructor(nome, area, habilidades, tempoExperienciaMeses) {
    super(nome, area);
    this.habilidades = habilidades;
    this.tempoExperienciaMeses = tempoExperienciaMeses;
  }

  calcularCompatibilidade(vaga) {
    const possuiNaVaga = vaga.requisitos.filter((r) =>
      this.habilidades.includes(r),
    );
    const faltaNaVaga = vaga.requisitos.filter(
      (r) => !this.habilidades.includes(r),
    );
    const percentualCompatibilidade = Math.round(
      (possuiNaVaga.length / vaga.requisitos.length) * 100,
    );

    return {
      vaga,
      percentualCompatibilidade,
      possuiNaVaga,
      faltaNaVaga,
    };
  }

  encontrarMelhorVaga(vagas) {
    const vagasAbertas = vagas.filter((v) => v.vagaEmAberto);
    if (vagasAbertas.length === 0) return null;

    return vagasAbertas
      .map((vaga) => this.calcularCompatibilidade(vaga))
      .reduce(
        (melhor, atual) =>
          !melhor ||
          atual.percentualCompatibilidade > melhor.percentualCompatibilidade
            ? atual
            : melhor,
        null,
      );
  }
}

// Exemplo de uso
const candidato = new Candidato(
  "John Doe",
  "TI",
  ["JavaScript", "CSS", "HTML5"],
  12,
);

const vagas = [
  new Vaga(
    "Tech Master",
    "Dev Front-end Jr",
    ["JavaScript", "React", "Node.js"],
    5000,
    "Presencial",
  ),
  new Vaga(
    "New Tech",
    "Dev Front-end Jr",
    ["JavaScript", "CSS", "HTML5"],
    3600,
    "Hibrida",
  ),
  new Vaga(
    "Inova Solucoes",
    "Dev Front-end Jr",
    ["GitHub", "CSS"],
    2800,
    "Remota",
    false,
  ),
];

const melhor = candidato.encontrarMelhorVaga(vagas);

if (melhor) {
  console.log(candidato.resumo());
  console.log("Melhor vaga:", melhor.vaga.descricao());
  console.log("Compatibilidade:", melhor.percentualCompatibilidade + "%");
  console.log("Possui:", melhor.possuiNaVaga.join(", "));
  console.log("Falta:", melhor.faltaNaVaga.join(", "));
} else {
  console.log("Nao ha vagas abertas.");
}
