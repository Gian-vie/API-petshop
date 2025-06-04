# 🐾 API de Adoção de Pets

Bem-vindo à API de Adoção de Pets! Este projeto visa fornecer uma plataforma robusta e amigável para conectar animais de estimação em busca de um lar com seus futuros tutores.

## 🎯 Objetivo

Desenvolver uma API RESTful para um sistema de adoção de animais de estimação, com as seguintes funcionalidades principais:

- Cadastro e gerenciamento de usuários e pets.
- Processo de adoção de pets com autenticação baseada em JWT.
- Disponibilização de ao menos uma rota pública.
- Estrutura de projeto com camadas bem definidas para melhor organização e manutenibilidade.

## ✨ Funcionalidades Principais

- 👤 **Gerenciamento de Usuários:** Cadastro, login, visualização, atualização e remoção de usuários.
- 🐶 **Gerenciamento de Pets:** Cadastro, listagem, busca, atualização e remoção de pets para adoção.
- 🤝 **Sistema de Adoção:** Permite que usuários adotem pets disponíveis.
- 🔐 **Autenticação e Autorização:** Segurança garantida com tokens JWT e controle de acesso baseado em papéis (roles).
- 🌐 **Rotas Públicas e Privadas:** Acesso diferenciado para funcionalidades específicas.

## 🛠️ Requisitos Funcionais

### 1. Padronização de Código 🧹

- **ESLint:** Configurado com regras recomendadas para Node.js para garantir a qualidade e consistência do código.
- **Prettier:** Utilizado para padronizar a formatação do código em todo o projeto.
- **Scripts NPM:**
  ```bash
  npm run lint # Executa o ESLint para verificar o código
  ```

### 2. Controle de Versão (GitHub) 🐙

- **Repositório:** Público no GitHub com nome sugestivo (ex: `api-adocao-pets`).
- **Commits:** Frequentes, com mensagens claras e significativas descrevendo as alterações.
- **README.md Completo:**
  - Descrição do projeto (este arquivo).
  - Tecnologias utilizadas.
  - Instruções de instalação e execução.
  - Estrutura do banco de dados.

### 3. Arquitetura da Aplicação 🏗️

A aplicação segue uma arquitetura em camadas para garantir a separação de responsabilidades e facilitar a manutenção.

```text
/src
├── config          # Configurações gerais (ex: banco de dados, JWT)
├── controllers     # Lógica de controle das requisições HTTP
├── database        # Scripts de criação do banco (SQL)
├── middlewares     # Funções de middleware (ex: validações, autenticação JWT)
├── models          # Camada de acesso aos dados (interação com o banco)
├── routes          # Definição das rotas da API
└── services        # Regras de negócio da aplicação
/tests              # Testes (ex: usando REST Client ou similar)
```

### 4. Banco de Dados e Entidades Obrigatórias 💾

- **Database:** `pets_db`
- **Entidades:**

  - **`users`**: Representa os usuários do sistema.
    | Campo | Tipo | Descrição |
    | :-------- | :----- | :----------------------------------- |
    | `id` | `INT` | Identificador único (auto incremento)|
    | `name` | `TEXT` | Nome completo |
    | `email` | `TEXT` | E-mail (único) |
    | `password`| `TEXT` | Senha (criptografada com bcrypt) |
    | `phone` | `TEXT` | Telefone de contato |
    | `role` | `TEXT` | Perfil do usuário (`admin` ou `adopter`) |

  - **`pets`**: Representa os animais disponíveis para adoção.
    | Campo | Tipo | Descrição |
    | :------------ | :----- | :----------------------------------------- |
    | `id` | `INT` | Identificador único (auto incremento) |
    | `name` | `TEXT` | Nome do pet |
    | `age` | `INT` | Idade aproximada em anos |
    | `species` | `TEXT` | Espécie (ex: `dog`, `cat`) |
    | `size` | `TEXT` | Porte (`small`, `medium`, `large`) |
    | `status` | `TEXT` | Situação (`available`, `adopted`) |
    | `description` | `TEXT` | Texto opcional com informações adicionais |

  - **`adoptions`**: Relaciona o usuário com o pet adotado.
    | Campo | Tipo | Descrição |
    | :-------------- | :------ | :-------------------------------------- |
    | `id` | `INT` | Identificador da adoção (auto incremento) |
    | `user_id` | `INT` | ID do usuário que realizou a adoção |
    | `pet_id` | `INT` | ID do pet adotado |
    | `adoption_date` | `DATE` | Data da adoção |

---

### 5. Autenticação e Autorização (JWT) 🔑

- **Login Endpoint:** `POST /login` para autenticação via e-mail e senha.
- **Token JWT:** Gerado após autenticação bem-sucedida.
- **Rotas Protegidas:** Utilização de middleware para validar o token JWT.
- **Controle de Acesso:** Verificação do `role` do usuário para acesso a endpoints restritos (ex: `admin` para cadastrar pets).

---

### 6. Implementação das Rotas 🛣️

#### Rotas Públicas (Não requerem login)

| Método | Rota              | Descrição                                              |
| :----- | :---------------- | :----------------------------------------------------- |
| `GET`  | `/pets/available` | Lista todos os pets com status `available` para adoção |
| `POST` | `/users`          | Cadastra um novo usuário (`adopter` ou `admin`)        |
| `POST` | `/login`          | Realiza login e retorna o token JWT                    |

#### Rotas Protegidas (Requerem token JWT)

##### Usuários 🧑‍🤝‍🧑

| Método   | Rota         | Descrição                 | Acesso                              |
| :------- | :----------- | :------------------------ | :---------------------------------- |
| `GET`    | `/users`     | Lista todos os usuários   | `admin`                             |
| `GET`    | `/users/:id` | Busca usuário por ID      | `admin` ou próprio `adopter` logado |
| `PUT`    | `/users/:id` | Atualiza dados do usuário | `admin` ou próprio `adopter` logado |
| `DELETE` | `/users/:id` | Remove um usuário         | `admin`                             |

##### Pets 🐕🐈

| Método   | Rota        | Descrição                                                    | Acesso  |
| :------- | :---------- | :----------------------------------------------------------- | :------ |
| `GET`    | `/pets`     | Lista todos os pets (inclusive os adotados)                  | `admin` |
| `GET`    | `/pets/:id` | Busca pet por ID                                             | `admin` |
| `POST`   | `/pets`     | Cadastra um novo pet                                         | `admin` |
| `PUT`    | `/pets/:id` | Atualiza os dados de um pet                                  | `admin` |
| `DELETE` | `/pets/:id` | Remove um pet do sistema (somente se `status` = `available`) | `admin` |

##### Adoções ❤️

| Método | Rota         | Descrição                         | Acesso    |
| :----- | :----------- | :-------------------------------- | :-------- |
| `GET`  | `/adoptions` | Lista todas as adoções realizadas | `admin`   |
| `POST` | `/adoptions` | Realiza a adoção de um pet        | `adopter` |

---

### 7. Regras de Negócio 📜

- **Usuário:**
  - Apenas usuários com `role: "admin"` podem visualizar ou editar outros usuários (exceto o próprio perfil).
  - O `role` padrão ao cadastrar é `"adopter"`.
  - A senha deve ser criptografada com `bcrypt`.
  - O próprio usuário pode pesquisar e editar seu perfil.
- **Login:**
  - A autenticação é feita com `email` e `password`.
  - Se as credenciais estiverem corretas, deve ser gerado um token JWT.
- **Pet:**
  - Apenas `admin` pode cadastrar, editar ou remover pets.
  - Pets são cadastrados com `status: "available"` por padrão.
  - Pets com `status: "adopted"` não podem ser readotados ou removidos.
- **Adoção:**
  - Apenas usuários com `role: "adopter"` podem adotar pets.
  - O pet precisa estar `available`.
  - Após a adoção, o status do pet muda para `adopted`.
  - Um usuário não pode adotar o mesmo pet mais de uma vez.
- **Segurança (JWT):**
  - O token JWT deve conter `userId` e `role`.
  - O token deve expirar (ex: em 1h).
  - Senhas nunca devem ser retornadas em respostas JSON.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js (ou framework similar)
- \[Nome do seu ORM/Driver de Banco de Dados, ex: Sequelize, Knex, node-postgres]
- PostgreSQL (ou o SGBD que você está usando)
- JSON Web Token (JWT)
- Bcrypt.js
- ESLint
- Prettier

## 📦 Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Gian-vie/API-petshop.git](https://github.com/Gian-vie/API-petshop.git)
    cd API-petshop
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
    - Crie um arquivo `.env` na raiz do projeto, baseado no arquivo `.env.example` (se houver).
    - Preencha com as configurações do banco de dados, segredo do JWT, etc.
4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A API estará disponível em `http://localhost:PORTA` (verifique a porta configurada).
