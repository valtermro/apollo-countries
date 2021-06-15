# Uma aplicação utilizando [reactjs](https://reactjs.org/), [graphql](https://graphql.org/) e  [apollo client](https://www.apollographql.com/docs/react/)

## Recursos

Mostra uma lista de cards com informações de países do mundo.  
Pode-se navegar para uma página com mais detalhes sobre um determinado país.  
Na página de detalhes, é possível editar as informações do país. As alterações são salvas localmente utilizando o gerenciador de estado do *apollo client*.  

## Experimente

### Online

O sistema pode ser acesso em [apollocountries.herokuapp.com](http://apollocountries.herokuapp.com/).

### Localmente

Clone esse repositório e execute os seguintes comandos na pasta do projeto:

```
npm install
npm start
```

### Executando os testes

Para executar a suíte de testes:
```
npm test
```

O comando acima inicia os testes em modo "watch". Use CTRL+C para sair.


Para ver informações sobre a cobertura de testes:
```
npm test -- --coverage --watchAll=false
```
