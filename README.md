# Projeto ESAB
Projeto para disciplina de graduação

## Como iniciar
01. Clonar projeto
02. Entrar na pasta database e subir aplicação com docker compose (criará um container rodando mysql)
03. Entrar na pasta backend e subir a aplicação com docker compose (criará um container rodando a api em nodejs, conectada ao mysql)
04. Entrar na pasta frontend e subir a aplicação com docker compose (criará um container rodando nginx com o build do vuejs, se comunicando com a api com chamadas AJAX (axios))
   OBS: o frontend tem imagem configurada para fazer as chamadas para a API em localhost. Se necessário alterar, mudar global.js e gerar novo build do vuejs e da imagem docker
