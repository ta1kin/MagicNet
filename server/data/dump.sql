--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-29 15:36:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 68831)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4847 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 851 (class 1247 OID 68844)
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'Admin',
    'Guest'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 68876)
-- Name: Config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Config" (
    id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    theme text DEFAULT 'light'::text NOT NULL,
    lang text DEFAULT 'ru'::text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."Config" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 68875)
-- Name: Config_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Config_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Config_id_seq" OWNER TO postgres;

--
-- TOC entry 4849 (class 0 OID 0)
-- Dependencies: 220
-- Name: Config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Config_id_seq" OWNED BY public."Config".id;


--
-- TOC entry 223 (class 1259 OID 68888)
-- Name: Docs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Docs" (
    id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    name text NOT NULL,
    data bytea NOT NULL,
    size integer NOT NULL,
    date bigint NOT NULL,
    mimetype text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."Docs" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 68887)
-- Name: Docs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Docs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Docs_id_seq" OWNER TO postgres;

--
-- TOC entry 4850 (class 0 OID 0)
-- Dependencies: 222
-- Name: Docs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Docs_id_seq" OWNED BY public."Docs".id;


--
-- TOC entry 219 (class 1259 OID 68862)
-- Name: Info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Info" (
    id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    "sphereDef" text NOT NULL,
    direction text NOT NULL,
    name text DEFAULT 'Не задано'::text NOT NULL,
    about text DEFAULT 'Не задано'::text NOT NULL,
    nickname text DEFAULT 'Не задано'::text NOT NULL,
    phone text DEFAULT 'Не задано'::text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."Info" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 68861)
-- Name: Info_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Info_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Info_id_seq" OWNER TO postgres;

--
-- TOC entry 4851 (class 0 OID 0)
-- Dependencies: 218
-- Name: Info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Info_id_seq" OWNED BY public."Info".id;


--
-- TOC entry 217 (class 1259 OID 68850)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'Guest'::public."Role" NOT NULL,
    "isVerify" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 68849)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 4852 (class 0 OID 0)
-- Dependencies: 216
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 215 (class 1259 OID 68832)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4668 (class 2604 OID 68879)
-- Name: Config id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Config" ALTER COLUMN id SET DEFAULT nextval('public."Config_id_seq"'::regclass);


--
-- TOC entry 4672 (class 2604 OID 68891)
-- Name: Docs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Docs" ALTER COLUMN id SET DEFAULT nextval('public."Docs_id_seq"'::regclass);


--
-- TOC entry 4662 (class 2604 OID 68865)
-- Name: Info id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Info" ALTER COLUMN id SET DEFAULT nextval('public."Info_id_seq"'::regclass);


--
-- TOC entry 4658 (class 2604 OID 68853)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 4839 (class 0 OID 68876)
-- Dependencies: 221
-- Data for Name: Config; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Config" (id, created_at, updated_at, theme, lang, user_id) FROM stdin;
1	2024-11-29 12:34:47.444	2024-11-29 12:34:47.444	light	ru	1
\.


--
-- TOC entry 4841 (class 0 OID 68888)
-- Dependencies: 223
-- Data for Name: Docs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Docs" (id, created_at, updated_at, name, data, size, date, mimetype, user_id) FROM stdin;
\.


--
-- TOC entry 4837 (class 0 OID 68862)
-- Dependencies: 219
-- Data for Name: Info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Info" (id, created_at, updated_at, "sphereDef", direction, name, about, nickname, phone, user_id) FROM stdin;
1	2024-11-29 12:34:47.436	2024-11-29 12:34:47.436	It специалист	Программист	Не задано	Не задано	Не задано	Не задано	1
\.


--
-- TOC entry 4835 (class 0 OID 68850)
-- Dependencies: 217
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, created_at, updated_at, email, password, role, "isVerify") FROM stdin;
1	2024-11-29 12:34:47.42	2024-11-29 12:35:18.111	Rick-Sanches2020@yandex.ru	$argon2id$v=19$m=65536,t=3,p=4$gL8Waz79NDg2YG+KbAFHiQ$6h8jZVC95RbNZlAyyGWUj9mG2RsNRUzhjSJ4cGORg6U	Guest	t
\.


--
-- TOC entry 4833 (class 0 OID 68832)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ec7a36ed-5720-4dc9-9c98-579647e1d32b	607fba91af070c01908aaa1cabb6ddf8cba2630d7ecebc4d7a5da75a1f902578	2024-11-29 15:33:07.327067+03	20241129123307_	\N	\N	2024-11-29 15:33:07.270826+03	1
\.


--
-- TOC entry 4853 (class 0 OID 0)
-- Dependencies: 220
-- Name: Config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Config_id_seq"', 1, true);


--
-- TOC entry 4854 (class 0 OID 0)
-- Dependencies: 222
-- Name: Docs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Docs_id_seq"', 1, false);


--
-- TOC entry 4855 (class 0 OID 0)
-- Dependencies: 218
-- Name: Info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Info_id_seq"', 1, true);


--
-- TOC entry 4856 (class 0 OID 0)
-- Dependencies: 216
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- TOC entry 4683 (class 2606 OID 68886)
-- Name: Config Config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Config"
    ADD CONSTRAINT "Config_pkey" PRIMARY KEY (id);


--
-- TOC entry 4686 (class 2606 OID 68896)
-- Name: Docs Docs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Docs"
    ADD CONSTRAINT "Docs_pkey" PRIMARY KEY (id);


--
-- TOC entry 4680 (class 2606 OID 68874)
-- Name: Info Info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Info"
    ADD CONSTRAINT "Info_pkey" PRIMARY KEY (id);


--
-- TOC entry 4678 (class 2606 OID 68860)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4675 (class 2606 OID 68840)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4684 (class 1259 OID 68899)
-- Name: Config_user_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Config_user_id_key" ON public."Config" USING btree (user_id);


--
-- TOC entry 4681 (class 1259 OID 68898)
-- Name: Info_user_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Info_user_id_key" ON public."Info" USING btree (user_id);


--
-- TOC entry 4676 (class 1259 OID 68897)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4688 (class 2606 OID 68905)
-- Name: Config Config_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Config"
    ADD CONSTRAINT "Config_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4689 (class 2606 OID 68910)
-- Name: Docs Docs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Docs"
    ADD CONSTRAINT "Docs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4687 (class 2606 OID 68900)
-- Name: Info Info_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Info"
    ADD CONSTRAINT "Info_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4848 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-11-29 15:36:55

--
-- PostgreSQL database dump complete
--

