-- Database: todo_app

-- DROP DATABASE IF EXISTS todo_app;

CREATE DATABASE todo_app
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE todo_app
    IS 'database for todo application';

-- Table: public.board

-- DROP TABLE IF EXISTS public.board;

CREATE TABLE board
(
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL DEFAULT nextval('board_id_seq'::regclass),
    name text COLLATE pg_catalog."default",
    CONSTRAINT board_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS board
    OWNER to postgres;
	

-- Table: public.todo

-- DROP TABLE IF EXISTS public.todo;
	

CREATE TABLE IF NOT EXISTS todo
(
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL DEFAULT nextval('todo_id_seq'::regclass),
    description text COLLATE pg_catalog."default",
    status boolean,
    "boardId" integer,
    CONSTRAINT todo_pkey PRIMARY KEY (id),
    CONSTRAINT todo_fkey FOREIGN KEY ("boardId")
        REFERENCES public.board (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS todo
    OWNER to postgres;
