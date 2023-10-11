# Projeto ESAB
Projeto para disciplina de graduação

## Como iniciar
01. Clonar projeto
02. Entrar na pasta database e subir aplicação com docker compose (criará um container rodando mysql)
03. Entrar na pasta backend e subir a aplicação com docker compose (criará um container rodando a api em nodejs, conectada ao mysql)

## Setup provisorio DEV
Como o frontend ainda não está em imagem docker, deve-se configurar o arquivo global.js com a URL da API conforme o ambiente em que está sendo testado
No package.json, ajustar npm run serve com export/set, para os SOs linux/windows, respectivamente
Se for mexer no backend, rodar npm run dev na pasta /backend, em vez de subir container. Nesse caso, atentar-se para o host do banco de dados, pois nao estará mais acessível pelo hostname do docker.

## Possíveis erros
01. Frontend
Erro ao rodar npm run serve: opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ] 
Solução: Rodar comando no linux ==> export NODE_OPTIONS=--openssl-legacy-provider (alterado como parametro no package.json; export no linux, set no windows)

## Andamento
Criar função para envio de email
** Adicionado container de mailserver para subir junto ao database
-> Disparar email quando
1. OK Empréstimo solicitado
2. OK Empréstimo aceito/recusado
3. OK Devolução confirmada
4. OK Multa gerada
5. OK Pagamento confirmado

Criar página para detalhe de um empréstimo
-> Informações para exibir:
1. OK Imagem e dados do jogo
2. OK Datas
3. OK Status
4. OK Multas associadas
5. OK Botões para o dono do jogo (os mesmos disponíveis na tabela)

Criar restrição para jogos indisponíveis
1. OK No backend, fazer validação para empréstimos com status vigente na data da indicada ao adicionar empréstimo

Adicionar upload de imagem de jogo
1. OK Criar função no backend para adicionar imagem
2. OK Adicionar campo no formulário e ajustar envio

## Ajustes finais
1. OK Remover logo do title
2. OK Remover informações no rodapé
3. OK Personalizar tela de login
4. OK Ajustar display das datas
5. Ajustes nos botões lista de "Meus jogos"
6. Ajuste na tela de upload de imagem



