-- Tabela de usuários
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100),
    criado_em DATE
);

-- Tabela de tarefas
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    titulo VARCHAR(100),
    descricao TEXT,
    status VARCHAR(20),
    prazo DATE,
    user_id INTEGER,
    criado_em DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
