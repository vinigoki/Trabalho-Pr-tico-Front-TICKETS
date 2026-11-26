# ShowTickets

Projeto acadêmico de Desenvolvimento Web: protótipo de um site para explorar eventos musicais e simular a compra de ingressos.

## Identificação do trabalho

- **Disciplina:** Desenvolvimento Web
- **Tecnologias:** HTML5, CSS3 e JavaScript
- **Professora:** Janainny Carvalho
- **Integrantes:**
  - Vinícius Gonçalves
  - Gabrielle Regis Macedo
  - Victor Metzger

## Funcionalidades

- Catálogo de eventos musicais.
- Pesquisa por nome, local ou categoria.
- Filtros de categorias.
- Adicionar e remover ingressos do carrinho.
- Alterar quantidades.
- Cálculo de subtotal, desconto e total.
- Cupom `SHOW10` com 10% de desconto.
- Finalização de compra simulada.

> **Importante:** este é um protótipo acadêmico. A finalização é apenas uma simulação no navegador: não há pagamento real, backend, banco de dados ou emissão de ingressos.

## Tecnologias

- **HTML5 (`index.html`):** estrutura semântica, navegação, formulários, tabela e conteúdo.
- **CSS3 (`style.css`):** identidade visual Dark / Neon, layout, efeitos e responsividade.
- **JavaScript (`script.js`):** catálogo, pesquisa, filtros, manipulação do DOM, eventos e carrinho.

## Estrutura do projeto

```text
ShowTickets/
├── index.html
├── style.css
├── script.js
├── imagens/
│   └── README.txt
├── docs/
│   └── explicacao-do-projeto.md
├── .gitignore
└── README.md
```

## Como executar

1. Extraia o arquivo ZIP.
2. Abra a pasta do projeto no VS Code.
3. Abra o arquivo `index.html` no navegador ou use a extensão Live Server.
4. Pesquise eventos, adicione ingressos, teste o cupom `SHOW10` e finalize a compra demonstrativa.

Não é necessário instalar PHP ou configurar servidor backend.

## Como criar o repositório no GitHub

1. Acesse [https://github.com](https://github.com) e entre na sua conta.
2. Clique em **New repository**.
3. Nome sugerido: `ShowTickets`.
4. Descrição: `Projeto acadêmico de Desenvolvimento Web com HTML5, CSS3 e JavaScript`.
5. Selecione **Public**, caso a professora precise acessar o repositório.
6. Não marque a opção de criar README, pois este projeto já possui um.
7. Clique em **Create repository**.

No terminal do VS Code, aberto dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "Versão inicial do ShowTickets"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ShowTickets.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub e use a URL exibida pelo próprio GitHub.

### Enviar alterações depois

```bash
git add .
git commit -m "Descreva a alteração"
git push
```

## Imagens

As imagens dos eventos são URLs externas do Unsplash definidas nos objetos do catálogo em `script.js`. É necessária conexão com a internet para carregá-las. A pasta `imagens/` está reservada para imagens locais que o grupo queira adicionar.
