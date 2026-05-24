# SkillMatch JS

Simulador de compatibilidade entre candidatos e vagas de tecnologia.

## Objetivo

O SkillMatch JS compara as habilidades informadas por uma pessoa candidata com os requisitos de vagas ficticias. A partir dessa comparacao, o sistema calcula o percentual de compatibilidade com cada vaga e identifica qual oportunidade combina melhor com o perfil informado.

O projeto tambem gera uma recomendacao de estudo, mostrando quais habilidades ainda faltam para a pessoa candidata se aproximar das vagas de Front-end.

## Como a internet funciona

A internet e uma rede mundial de computadores conectados que trocam informacoes entre si. Quando uma pessoa acessa um site, o navegador atua como cliente e envia uma requisicao para um servidor.

De forma simples, o processo acontece assim:

1. A pessoa digita o endereco de um site no navegador.
2. O navegador usa o DNS para encontrar onde esse site esta hospedado.
3. O navegador envia uma requisicao HTTP ou HTTPS para o servidor.
4. O servidor responde enviando arquivos como HTML, CSS, JavaScript, imagens e outros recursos.
5. O navegador interpreta esses arquivos e monta a pagina que aparece na tela.

Neste projeto, o arquivo `develop.html` representa a pagina aberta no navegador. Ele carrega o arquivo `skillmatch.js`, que contem a logica do sistema.

Como o projeto roda localmente com Live Server, os arquivos sao servidos a partir da propria maquina. O navegador executa o JavaScript, simula a busca dos dados da pessoa candidata e exibe os resultados no console.

## Como funciona

O sistema simula uma busca pelos dados da pessoa candidata usando uma `Promise`. Esses dados representam uma resposta ficticia que poderia vir de uma API, banco de dados ou outro servico externo.

Os dados simulados incluem:

- nome da pessoa candidata;
- area desejada;
- habilidades;
- tempo de experiencia em meses.

Depois disso, o programa:

- filtra as vagas em aberto;
- filtra vagas relacionadas a Front-end;
- compara as habilidades do candidato com os requisitos das vagas;
- calcula o percentual de compatibilidade;
- classifica a compatibilidade como sendo baixa, media ou alta;
- lista habilidades encontradas e habilidades faltantes;
- recomenda habilidades para estudo.

Os resultados aparecem no console do navegador.

## Simulacao de busca com Promise

A `Promise` e usada para representar uma operacao assincrona, ou seja, uma tarefa que pode demorar para responder. No projeto, ela simula a busca dos dados da pessoa candidata.

Com essa simulacao, o fluxo fica mais parecido com um sistema real:

1. O programa inicia a busca dos dados.
2. A `Promise` aguarda um tempo simulado.
3. Se os dados forem encontrados, a Promise retorna as informacoes da pessoa candidata.
4. Se os dados nao forem encontrados, a Promise retorna um erro.
5. A funcao `async` usa `await` para esperar o resultado antes de criar o objeto da classe `Candidato`.

Mesmo com os dados vindo de uma busca simulada, a classe `Candidato` continua sendo usada para organizar as informacoes dentro do sistema.

## Como executar

Este projeto foi feito para rodar no navegador.

1. Abra a pasta do projeto no VS Code.
2. Instale ou use a extensao Live Server.
3. Abra o arquivo `develop.html`.
4. Clique com o botao direito e escolha `Open with Live Server`.
5. Clique com o botao direito na pagina web e selecione `Inspecionar`.
6. Selecione o `console` do navegador para ver os resultados.

## Arquivos principais

- `develop.html`: carrega o arquivo JavaScript no navegador.
- `skillmatch.js`: contem as classes, dados das vagas, funcoes de entrada, calculo de compatibilidade e recomendacao de estudo.
- `README.md`: documentacao do projeto.

## Conceitos usados

Este projeto pratica conceitos importantes de JavaScript:

- variaveis e constantes;
- arrays e objetos;
- classes;
- heranca;
- metodos estaticos;
- funcoes;
- callback;
- closure;
- promises;
- `async` e `await`;
- estruturas condicionais;
- `switch`;
- loops com `for...of`;
- manipulacao de strings com `trim`, `toLowerCase` e `split`;
- metodos de array como `map`, `filter`, `reduce`, `some`, `flat` e `join`;
- tratamento simples de erros com `try...catch`;
- simulacao de busca de dados;
- exibicao de resultados com `console.log`.

## Callback no projeto

A funcao `monitorarVagas` possui uma funcao interna chamada `meuFilter`, criada para praticar o conceito de callback.

Ela recebe uma lista e uma funcao de regra:

```js
function meuFilter(lista, callback) {
  const resultado = [];

  for (const item of lista) {
    if (callback(item)) {
      resultado.push(item);
    }
  }

  return resultado;
}
```

Essa funcao funciona de forma parecida com o metodo `filter`: o callback decide se cada item deve entrar ou nao no novo array.

Exemplo usado no projeto:

```js
const vagasAlvoExato = meuFilter(vagasEmAberto, (vaga) =>
  vaga.cargo.toLowerCase().includes(areaDesejadaNormalizada),
);
```

## Uso do for...of

O `for...of` foi usado para percorrer os itens de uma lista de forma simples. No projeto, ele aparece dentro da funcao `meuFilter`, passando por cada item do array recebido.

```js
for (const item of lista) {
  if (callback(item)) {
    resultado.push(item);
  }
}
```

Nesse caso, cada `item` da `lista` e enviado para o callback. Se o callback retornar `true`, o item e adicionado ao array `resultado`.

## Estrutura dos dados

As vagas sao representadas pela classe `Vaga`, com informacoes como:

- empresa;
- cargo;
- requisitos;
- salario;
- modalidade;
- status da vaga.

Tambem existe a classe `VagasFrontEnd`, que herda de `Vaga` e possui um metodo para filtrar vagas relacionadas a Front-end.

## Status do projeto

Projeto em desenvolvimento para estudo e pratica de JavaScript.
