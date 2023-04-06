<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="API_MyPharma" />

  &#xa0;

  <a href="https://teste-api-mypharma.onrender.com/swagger/docs">Demo</a>
</div>

<h1 align="center">API_MyPharma</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/moisespompilio/API_MyPharma?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/moisespompilio/API_MyPharma?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/moisespompilio/API_MyPharma?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/moisespompilio/API_MyPharma?color=56BEB8">


 
</p>


<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/moisespompilio" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

O projeto segue os princípios do Clean Code e SOLID, além de se basear na arquitetura Clean Architecture. A estrutura do projeto está dividida em quatro pastas principais, sendo elas:

 - "application": contém os casos de uso (use cases), DTOs (Data Transfer Objects) e utilitários (utils) necessários para a lógica de negócios da aplicação.
 - "domain": contém as entidades e objetos de valor do negócio, que representam as regras de negócio e a lógica do domínio.
 - "infrastructure": contém a implementação dos adaptadores que permitem a comunicação da aplicação com as tecnologias externas, como bancos de dados, APIs externas, entre outros.
" - interfaces": contém as definições das interfaces de entrada e saída da aplicação, como APIs REST.

No projeto, foram aplicados os princípios do Clean Code e SOLID para garantir a legibilidade, manutenibilidade e escalabilidade do código. Foram utilizadas técnicas como a separação de responsabilidades, a criação de funções pequenas e coesas, a utilização de nomes claros e descritivos, e a escrita de testes automatizados.

Além disso, a arquitetura Clean Architecture foi utilizada para definir a estrutura do projeto e garantir que as regras de negócio e a lógica do domínio fossem independentes de tecnologias externas. Isso permite que a aplicação seja facilmente adaptável a novas tecnologias e mantenha a sua integridade mesmo com mudanças externas.

Em resumo, o projeto utiliza as melhores práticas de desenvolvimento de software, com foco na qualidade e na manutenibilidade do código. A arquitetura Clean Architecture e os princípios do Clean Code e SOLID foram fundamentais para atingir esses objetivos.

## :sparkles: Features ##

:heavy_check_mark: search por nome do produto;\
:heavy_check_mark: testes unitários;\
:heavy_check_mark: boas práticas clean code;
:heavy_check_mark: documentar o código;
:heavy_check_mark: filtro por categoria (ex: frios, laticínios);
:heavy_check_mark: ordenação (ex: menor preço, maior preço, nome);

## :rocket: Technologies ##

The following tools were used in this project:

- [Prisma](https://www.prisma.io/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/moisespompilio/API_MyPharma

# Access
$ cd API_MyPharma

# Install dependencies
$ npm i

# Build the projec
$npm run build

# Run the project
$ npm run start

# The server will initialize in the <http://localhost:3000>
```

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/moisespompilio" target="_blank">moises pompilio}</a>

&#xa0;

<a href="#top">Back to top</a>
