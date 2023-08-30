# Projeto ESAB
Projeto para disciplina de graduação

## Como iniciar
01. Clonar projeto
02. Entrar na pasta database e subir aplicação com docker compose (criará um container rodando mysql)
03. Entrar na pasta backend e subir a aplicação com docker compose (criará um container rodando a api em nodejs, conectada ao mysql)

## Possíveis erros
01. Frontend
Erro ao rodar npm run serve: opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ] 
Solução: Rodar comando no linux ==> export NODE_OPTIONS=--openssl-legacy-provider

## Andamento

** Frontend: componente Game criado com um formulario base
** Backend: rota criada para upload de imagem de jogos
** Alterar endereço do banco de dados no backend

01. Frontend
-> Cadastros/edições
** Novo usuário
** Novo jogo
** Novo empréstimo 

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


