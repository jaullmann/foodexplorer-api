![image](https://github.com/user-attachments/assets/94b52da4-73db-431b-849a-d9c8852fe34c)

<h1>Food Explorer - Rest API (Front-end)</h1>

<p>Aplicação backend (API) de projeto de site de e-commerce, desenvolvido em ReactJS para conclusão do curso Explorer da Rocketseat.</p>

<h2>Guia de utilização</h2>
<ol>
  <li>Criar o arquivo ".env" no diretório raiz, com uma hash de sua escolha atribuída à variável "AUTH_SECRET" - conforme arquivo de exemplo ".env.example";</li>
  <li>Definir a validade máxima do token JWT no arquivo "src/configs/auth.js", linha 4 (tempo definido por padrão: 24h);"</li>
  <li>A partir do diretório raiz, executar o comando "npm i" no terminal para instalar todos os pacotes necessários;</li>
</ol>

<h2>Criação do banco de dados e tabelas necessárias</h2>
<p>Caso esteja rodando a aplicação pela primeira vez, ou queira recriar o banco de dados e todas as suas tabelas, executar os comandos que seguem abaixo. 
<strong>Atenção: todos os dados salvos da aplicação serão perdidos.</strong></p>
<ol>
  <li>No mesmo diretório raiz, executar o comando "npm run dev" em ambiente de desenvolvimento, para criação do banco de dados da aplicação;</li>
  <li>Suspender a execução da API (ctrl + C), e rodar na sequência o comando "npm run migrate:latest", para geração de todas as tabelas necessárias dentro do banco de dados criado na etapa anterior;</li>
  <li>No arquivo "src/server.js", entre as linhas 19-28, definir os endereçcos https ou http de origem permitidos para executar a aplicação front-end (endereço local ou online), e a porta, se necessário;</li>
  <li>Todos os arquivos de imagens de produtos *.png e *.jpg são gravados na pasta "tmp/uploads". Caso esteja recriando o banco de dados, acessar o diretório da imagem e fazer a exclusão manual de todos 
    os arquivos que eventualmente estejam salvos nesse local.</li>
</ol>

<p>O esquema visual do banco de dados pode ser encontrado no arquivo "docs/database schema.jpg"</p>

<p>Link da aplicação online: <b>https://foodexplorer2024.netlify.app/</b></p>
<p>Usuário de teste: <b>user@email.com</b> - usuário admin: <b>admin@email.com</b></p>
<p>Senha: 1234 (ambos os casos)</p>

<p>Autor: Jorge Alencar Ullmann - jaullmann@gmail.com</p>
