CREATE DATABASE safetypush
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\connect safetypush;

CREATE EXTENSION Postgis;

CREATE TABLE public.channel
(
    id serial NOT NULL,
    name text,
    CONSTRAINT id PRIMARY KEY (id)
);

CREATE TABLE public.subscriber
(
    id serial NOT NULL,
    location geography,
    endpoint text,
    p256dh text,
    auth text,
    CONSTRAINT subscriber_pkey PRIMARY KEY (id)
);

CREATE TABLE public.message
(
    id serial NOT NULL,
    affected geometry,
    channel integer,
    title text,
    push_body text,
    body text,
    geojson jsonb,
    expired boolean,
    CONSTRAINT message_pkey PRIMARY KEY (id),
    CONSTRAINT channel_fk FOREIGN KEY (channel)
        REFERENCES public.channel (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

INSERT INTO public.channel (name) VALUES ('fargo');
INSERT INTO public.channel (name) VALUES ('weather');
INSERT INTO public.channel (name) VALUES ('road');
INSERT INTO public.channel (name) VALUES ('fire');
INSERT INTO public.channel (name) VALUES ('police');
