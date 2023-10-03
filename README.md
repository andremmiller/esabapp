# Projeto ESAB
Projeto para disciplina de graduação

## Como iniciar
01. Clonar projeto
02. Entrar na pasta database e subir aplicação com docker compose (criará um container rodando mysql)
03. Entrar na pasta backend e subir a aplicação com docker compose (criará um container rodando a api em nodejs, conectada ao mysql)

## Setup provisorio DEV
Como o frontend ainda não está em imagem docker, deve-se configurar o arquivo global.js com a URL da API conforme o ambiente em que está sendo testado
No package.json, ajustar npm run serve com export/set, para os SOs linux/windows, respectivamente

## Possíveis erros
01. Frontend
Erro ao rodar npm run serve: opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ] 
Solução: Rodar comando no linux ==> export NODE_OPTIONS=--openssl-legacy-provider

## Andamento

** Frontend: componente Game criado com um formulario base
** Frontend: cadastro de usuario e autenticacao criados
** Backend: rota criada para upload de imagem de jogos

PS: ajustar backend no get de loans para retornar status e data de início

01. Frontend
-> Cadastros/edições
** Novo usuário OK
** Novo jogo OK
** Novo empréstimo OK
** Lista de empréstimos OK

**** Status de empréstimos:
        Solicitado (Solicitar com prazo)
        Vigente (Aceitar emprestimo)
        Finalizado (Confirmar devolução)
        Com pendência (via script, com atraso e geração de multa)
        Finalizado (Confirmar pagamento de multa)

-> Tela inicial:
Busca de todos os jogos na plataforma
** Barra de pesquisa
** Paginação

-> Menus possíveis (userdropdown)
** Meus jogos cadastrados
** Pedidos de empréstimo (meus jogos)
** Meus empréstimos
** Minhas pendências (multas e devoluções)

-> Dentro de um jogo (detalhe)
** Contato do dono
** Disponível ou não

-> Dentro de empréstimo
** Dados do jogo
** Dados do empréstimo
** Status do empréstimo
** Botões de ações


