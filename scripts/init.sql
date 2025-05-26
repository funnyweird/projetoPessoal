DROP TABLE IF EXISTS "Users";

CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  "Nome" VARCHAR,
  "Email" VARCHAR,
  "Senha" VARCHAR,
  "Criado_em" VARCHAR
);

DROP TABLE IF EXISTS "Tasks";

CREATE TABLE "Tasks" (
  id SERIAL PRIMARY KEY,
  "Título" VARCHAR,
  "Descrição" VARCHAR,
  "Status" VARCHAR,
  "Prazo" VARCHAR,
  "User_id" INTEGER,
  "Criado_em" VARCHAR
);

ALTER TABLE "Tasks" ADD FOREIGN KEY ("User_id") REFERENCES "Users"(id);