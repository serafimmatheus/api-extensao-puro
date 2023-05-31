# SOBRE O APP

GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possíver obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possivel o usuario obter seu historico de check-ins;
- [ ] Deve ser possivel o usuario buscar academia proximas;
- [ ] Deve ser possivel o usuario buscar academia pelo nome;
- [ ] Deve ser possivel o usuario realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [ ] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário nao deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário nao pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário nao pode ser validado ate 20 minutos apos criado;
- [ ] O usuário so pode fazer check-in se nao estiver perto (100m) da academia;
- [ ] O usuário so pode ser validado ppr administradores;
- [ ] A academia so pode ser cadastrada por administradores;

## RNFs (Requisitos nao funcionais)

- [ ] A senha do usuário precisa esta criptografada;
- [ ] Os dados da aplicacao precisam estar persistidos em um bando PostgresSql;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario de ser identificado por um jwt (json web token);

bibliotecas instaladas
1 - npm init -y
2 - npm i typescript @types/node tsx tsup -D
3 - npx tsc --init
4 - npm i fastify
4.1 - npm i --save-dev @types/fastify-cors
4.2 - npm i fastify-cors
5 - npm i dotenv
6 - npm i zod
6 - npm i @rocketseat/eslint-config -D
7 - npx eslint --init
8 - npm i prisma -D
9 - npx prisma init
10 - npm i @prisma/client
11 - npm i bcryptjs && npm i -D @types/bcryptjs
12 - npm i vitest vite-tsconfig-paths -D
13 - npm i jsonwebtoken && npm i -D @types/jsonwebtoken
14 - npm i dayjs
15 - npm i @fastify/jwt

## comandos do prisma

1 - npx prisma generate
2 - npx prisma migrate dev
3 - npx prisma studio

## para iniciar um docker

docker run --name "nome-do-container-do-docker" -e POSTGRESQL_USERNAME=serafim -e POSTGRESQL_PASSWORD=123456 -e POSTGRESQL_DATABASE=nomeDoBancoDeDados -p 5432:5432 bitnami/postgresql

criar um arquivo docker-compose.yml para passar o codigo acima para dentro do arquivo docker-compose.yml

e para rodar o docker -> docker compose up -d
e para parar o docker -> docker compose stop
e para parar deletar todos os conteiner -> docker compose down

## Versoes

versao do nodeJs - v20.2.0
versao do npm - 9.6.6.
