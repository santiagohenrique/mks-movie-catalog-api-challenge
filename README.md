# MKS Movie Catalog Challenge

## Descrição
- Esta é uma API RESTful desenvolvida em Nest.js para um catálogo de filmes, que utiliza TypeORM para interação com o banco de dados PostgreSQL, conforme solicitado pelo desafio proposto da MKS.

## Deploy
- A aplicação está hospedada no Railway. Acesse a documentação Swagger da aplicação [clicando aqui](https://mks-movie-catalog-api-challenge-production.up.railway.app/api#/).


<img src="https://github.com/santiagohenrique/mks-movie-catalog-api-challenge/assets/88721828/4f6ac9f4-c76c-4245-a94a-79f37f47ada7"  width="600px"/>

## Características
- Visualização de uma lista de filmes.
- Navegação entre páginas para visualizar mais filmes.
- CRUD completo para filmes, gêneros e usuários.

## Endpoints
### Movies:
- GET /movie: Lista todos os filmes.
- GET /movie/:id: Retorna um filme específico.
- POST /movie: Adiciona um novo filme.
- PUT /movie/:id: Atualiza um filme existente.
- DELETE /movie/:id: Remove um filme.

### Genres:
- GET /genre: Lista todos os gêneros.
- GET /genre/:id: Retorna um gênero específico.
- POST /genre: Adiciona um novo gênero.
- PUT /genre/:id: Atualiza um gênero existente.
- DELETE /genre/:id: Remove um gênero.

### Users:
- GET /user: Lista todos os usuários.
- GET /user/:id: Retorna um usuário específico.
- POST /user: Adiciona um novo usuário.
- PUT /user/:id: Atualiza um usuário existente.
- DELETE /user/:id: Remove um usuário.

### Auth:
- POST /auth/login: Receber um token de autenticação.

## Tecnologias Utilizadas
- Nest.js
- TypeScript
- TypeORM
- Docker
- Swagger
- PostgreSQL

## Como executar o programa
- Certifique-se de ter o Node.js e o npm (gerenciador de pacotes do Node.js) instalados em seu sistema.
- Clone o repositório.
- Instale as dependências com o comando `npm install`.
- Configure as variáveis de ambiente no seu arquivo '.env'.
- Execute `docker-compose up` para iniciar o ambiente Docker.
