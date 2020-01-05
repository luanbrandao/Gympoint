<div align="center">
    <img width="200px" src="../icon.png">
    <h1 align="center">
        Aplicação Gympoint API
    </h1>
</div>

# Gympoint API


## :wrench: Tecnologias
:red_circle: Node

## :wrench: Ferramentas
:large_orange_diamond: Sucrase

:large_orange_diamond: Nodemon

:large_orange_diamond: ESLint

:large_orange_diamond: Prettier

:large_orange_diamond: EditorConfig;

:large_orange_diamond: Sequelize

:large_orange_diamond: Nodemailer

:large_orange_diamond: Sentry

## Banco Dedos
:paperclip: PostgreSQL

:paperclip: Redis

## :ballot_box_with_check: Execucanto o projeto
:heavy_check_mark: Fazer o clone do projeto

:heavy_check_mark: executar o comando yarn dentro da pasta da api

:heavy_check_mark: criar um container do postgre
```
docker run --name database  -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres:11
```

:heavy_check_mark: criar um bando de dados dentro do container 'database' com o nome
de gympoint


:heavy_check_mark: criar um container do redis

```
docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine
```


:heavy_check_mark: Criar as tabelas:
```
yarn sequelize db:migrate       
```


:heavy_check_mark: Inserir os dados default:
```
yarn sequelize db:seed:all    
```



:heavy_check_mark: rodar a api:
```
yarn dev
```


:heavy_check_mark: rodar a pilha:
```
yarn queue
```

## 🗒️ Licença
Esse projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---
Feito com ♥ by Luan Brandão
