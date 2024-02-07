## Dictionary API - Developed with :heart: by Hellshi
This is a challenge by Coodesh

Uma api pensada para tornar a busca em dicionários: fácil, rápida, escalável e resiliente.


### Framework: NestJs;
Escolhi o framework NestJs visando a maior celeridade no processo de desenvolvimento, uma vez que seus princípios base são a arquitetura modular escalibilidade de aplicações, o que vai ao encontro de todas as características de um software resiliente. 

Além disso, o NestJs apresenta um excelente suporte à integração de decorators e middlewares, o que corresponde perfeitemante aos desafios que foram propostos para o desenvolvimento proposto para os endpoints `/entries/en/:word` e `/user/me/history`. Ao analisar calmamente estes requisitos, logo me surgiu a ideia de realizá-los através de decorators (os quais podem ser encontrados no caminho src/common/decorators), já que outro tipo de implementação poderia afetar a legibilidade do código, e me forçar a adicionar algum comentário que explicitasse o motivo de haver uma chamada de cache e uma chamada de histórico na mesma função que faz proxy para o serviço externo.

### ORM: Typeorm
O TypeOrm é um um dos Orms mais populares para desenvolvimento javscript, entretanto, minha decisão por ele dentre tantos outros que vem ganhando notoriedade, se baseou em 2 aspectos
- A facilidade de integração com o NestJs (uma vez que o framework apresenta um suporte muito maior a este ORM em comparação a Prisma e Sequelize, por exemplo)
- Flexibilidade de implementação. 
Utilizando o typeorm em sua versão 0.3 eu fui capaz de implementar um padrão de repositories que me permite centralizar todos os repositories da minha aplicação num Catalog, o que elimina a necessidade de importar cada uma da entidades e cada uma das entidades e cada um dos repositories individuais nos módulos que os utilizassem; com isso, fui capaz de agilizar muito o desenvolvimento do projeto.
Além disso, a implementação do Catalog em conjunto com o base repository me permitiu reutilizar diversos métodos genéricos ente MongoDb e Postgres, o que deixou o código mais limpo de fácil compreensão

### Bancos (MongoDb e Postgres): 
Optei pela utilização de dois bancos de dados visanto atender aos requisitos
- `Como usuário, devo ser capaz de favoritar e desfavoritar palavras`, 
- `Salvar em cache o resultado das requisições a API`.
- `Como usuário, devo ser capaz de guardar no histórico palavras já visualizadas`, 
#### Postgres
O primeiro requisito sugere que existe relacionamento do tipo N:N envolvendo o usuário e as palavras, uma vez que as palavras poderiam ser favoritadas e desfavoritadas de acordo com um endpoint. Tal endpoint receberia apenenas a referência da palavra a ser favoritada, dessa forma, achei por bem salvar a lista de palavras, o usuário e seus respectivos relacionamentos num banco SQL.
Portanto, optei por manter tais registros através de um banco de dados relacional de excelente suporte, relisiliência e ótima comunidade, o que me fez optar pelo postgres;
![alt text](public/db_model.png)
#### MongoDb
Os outros dois requisitos, sugerem um gerenciamento um pouco menos fino dos dados, uma vez que, dados de cache não são perenes, e o histórico apresentará inúmeras inserções ao longo da utilização da api. Assim, faz sentido pensar que tais dados devam ser mantidos num banco Não-Relacional. Uma vez que, apresentam pouca relação com os dados supracitados do Postgres. 
Portanto, optei pelo MongoDB, pela sua altíssima escalabilidade horizonta, seu alto poder de consulta (visto que o utilizei em um projeto anterior onde ele era capaz de buscar através de milhões de dados em pouco tempo) e sua indexação flexível que me permitiu utilizá-lo tanto para o armazenamento de histórico quanto para o cacheamento das buscas.



## Rodando a Api
Em busca de facilitar o teste da aplicação para a equipe, deixei o .env disponível no repositório. 

A aplicação pode ser iniciada pelo docker utilizando o comando:  
``` bash 
docker-compose up --build -d 
```
Este comando irá iniciar a aplicação e criar os containers para a utilização dos bancos de dados.

**Nota: ao se utilizar a api fora do container Docker, as variáveis:**
``POSTGRES_URL=postgres://dictionaryapi:dictionaryapi@postgres:5432/dictionaryapi
MONGODB_URL=mongodb://mongodb:27017/dictionaryapi
``

**devem ser substituídas por:**
``POSTGRES_URL=postgres://dictionaryapi:dictionaryapi@localhost:5432/dictionaryapi
MONGODB_URL=mongodb://localhost:27017/dictionaryapi
``

Nas configurações do typeorm o sychronize será utilizado caso o NODE_ENV seja 'development', dessa forma, gerando todas as tabelas sql necessárias para o bom funcionamento da aplicação.

Visando um aumento na praticidade e também imaginando um caso de uso real, achei por bem criar uma tabela chamada "migration_status" que checa se a migração das palavras do dicionário já ocorreu, em não tendo ocorrido, as palavras serão migratas automaticamente (e apenas na primeira iniciação da aplicação) utilizando os pacotes fs e axios para: importar os dados, reparti-los em chuncks e migrá-los da maneira mais ágil possível. O usuário poderá acompanhar o andamento da migração atráves dos logs [MIGRATION] que serão apresentados no terminal do container docker.

Uma vez que a migração tenha sido finalizada, a api está pronta para ser utilizada.


## Stay in touch
- Autora: Hellem Cristina dos Santos Lima
- [Email](hcslimaa@gmail.com)
- [Linkedin](https://www.linkedin.com/in/hellem-lima-813344213/)
