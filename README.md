 <h1 align='center'>API Creation - Talker Manager</h1>
 <p align="center">
  <a href="#sobre-o-projeto">Sobre o Projeto</a> •
  <a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a> • 
  <a href="#como-executar-o-projeto">Como Executar o Projeto</a> • 
  <a href="#arquivos-desenvolvidos">Arquivos Desenvolvidos</a> • 
  <a href="#contato">Contato</a>
</p>
<h1 align='center'>
  <img src='https://github.com/carloshtbraga/Node-TalkerManager/blob/main/1200px-Node.js_logo.svg.png?raw=true' width="350" heigth="350"/>
</h1>


<h1 align='center'>Sobre o projeto</h1>

O Talker Manager é um projeto desenvolvido durante o curso de formação Trybe que tem como objetivo testar conhecimentos em comandos Node e criação de uma api restful robusta e que interage com o workbench.</p>

<p>Neste projeto foram desenvolvidas rotas para inserir, filtrar, buscar, atualizar e apagar informações do banco de dados, além de muita abstração para criação dos middlewares. O projeto também utilizou ferramentas como Docker e Workbench para gerenciar o banco de dados.</p>
<br>
<h1 align='center'>Tecnologias utilizadas</h1>

<ul>
  <li>MySQL</li>
  <li>Docker</li>
  <li>MySQL Workbench</li>
  <li>Node.Js</li>
  <li>express</li>
</ul>

<h1 align='center'>Como executar o projeto</h1>


<p align='center'>Antes de tudo, você precisa ter o Docker e o Docker Compose instalados na sua máquina.</p>

<p align='center'>Com tudo instalado, siga os passos abaixo para executar o projeto:</p>

```bash
# Clone o repositório
$ git clone https://github.com/seu-usuario/nome-do-repositorio.git

# Acesse o diretório do projeto
$ cd nome-do-repositorio

# Inicie o container com o MySQL
$ docker-compose up -d

# Acesse o MySQL Workbench
# Hostname: localhost
# Port: 3306
# Username: root
# Password: root

# Importe o arquivo .sql contido na pasta 'database' do projeto

# Pronto! Agora você já pode executar as queries contidas na pasta 'queries' do projeto.
```

<h1 align='center'>Arquivos Desenvolvidos</h1>

<ul>
  <li>Pasta routes (rotas do node)</li>
  <li>Pasta db</li>
  <li>Pasta middlewares</li>
  <li>Pasta Utils</li>
</ul>

<h1 align='center'>Faça um fork do projeto</h1>


Crie uma nova branch com a sua funcionalidade: git checkout -b my-feature
Faça commit das suas alterações: git commit -m 'feat: My new feature'
Faça push para a sua branch: git push origin my-feature
Abra um pull request para a branch principal do projeto

<h1 align='center'>Contato</h1>

<p align='center'>Para mais informações sobre o projeto, entre em contato comigo por meio das seguintes redes sociais:Para mais informações sobre o projeto, entre em contato comigo por meio das seguintes redes sociais:</p>

<ul>
  <li>E-mail: josegalvesg@gmail.com</li>
  <li>LinkedIn: https://www.linkedin.com/in/joseg-alves/</li>
  <li>joseg-alvesg-portfolio.vercel.app</li>
</ul>
