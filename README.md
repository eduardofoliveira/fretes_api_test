# API para Fretes - Dev Test

Para iniciar o projeto execute os comandos:

1º para instalar todos os pacotes
```npm install``` ou ```yarn``` se você utilizar yarn como gerenciador de pacotes

2º copiar o arquivo ```.env.example``` para ```.env``` e preencher com as configurações necessárias

3º executar as migrations para conectar e criar as tabelas no banco de dados
```npx knex migrate:latest --env production```

4° para executar:
```yarn start```

5° se estiver tudo OK, para configurar para subir sempre que reiniciar o servidor:
```npm install -g pm2```
```pm2 startup```
```pm2 start --name api-fretes dist/index.js```
```pm2 save```

# Desenvolvimento

Para o desenvolvimento

Comando para iniciar o knex
```npx knex init -x ts```

Comando para criar migration
```npx knex migrate:make migration_name -x ts```

Comando executar a migration
```npx knex migrate:latest```

Comando executar a migration em ambiente selecionado
```npx knex migrate:latest --env production```

Fazer rollback da ultima migration
```npx knex migrate:rollback```

Fazer rollback geral
```npx knex migrate:rollback --all```

# Docker Compose

Executar o comando abaixo, pode precisar executar com sudo se necessário para ter permissão de escrita

-- Importante preencher o .env ou passar os parametros .env.example quando executar o container

Há um parametro POSTGRES_CONN_STRING no docker-compose.yaml
```docker build -t fretes_api .```

```
version:  '3.9'

services:
	postgres:
		image:  postgres
		container_name:  postgres
		restart:  always
		environment:
			-  POSTGRES_USER=postgres_user
			-  POSTGRES_PASSWORD=postgres_password
			-  POSTGRES_DB=fretes
		ports:
			-  5432:5432
		volumes:
			-  ./data/postgres:/var/lib/postgresql/data

	api:
		image:  fretes_api
		container_name:  fretes_api
		restart:  always
		environment:
			-  POSTGRES_CONN_STRING=postgres://postgres_user:postgres_password@postgres:5432/fretes
		ports:
			-  3000:3000
		depends_on:
			-  postgres
```
