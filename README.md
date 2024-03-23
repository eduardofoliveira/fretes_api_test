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
