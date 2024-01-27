<h3 align="center">
  Api NestJS
</h3>

<p align="center">
  <a href="#memo-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-executar-o-projeto">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-ativando-a-bifrost">Ativando a Bifrost</a>
</p>

## :memo: Sobre o projeto
Aplicação para gerenciamento de despesas. Como o intuito era desenvolver um projeto simples que atendesse os requisitos foi utilizado o **sqlite** e a **estrutura de testes** consome o mesmo banco utilizado para desenvolvimento ao invés de usar um banco mockado.

#### Tecnologias utilizadas
- TypeScript
- [Bun](https://bun.sh/)
- [Eslint](https://eslint.org/)
- [NestJS](https://github.com/arb/celebrate)
- [NodeJS](https://pt-br.reactjs.org/)

## :rocket: Como executar o projeto
Pré-requisitos: bun instalado e as variáveis de ambiente que vão ser adicionadas no arquivo `.env`.

#### Executando o servidor
```bash
# Clone este repositório
git clone https://github.com/hiroyamaguch/onfly-api.git

# Acesse a pasta do projeto no terminal/cmd
cd onfly-api

# Instale as dependências
$ bun install

# Execute o projeto
$ bun start:dev

# O servidor vai estar rodando no endereço http://localhost:3000
```
