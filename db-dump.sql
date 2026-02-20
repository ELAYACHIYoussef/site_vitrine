--- AZYMARKET DATABASE DUMP ---
-- Generated on 02/17/2026 20:22:53

\c ecommerce_auth
--
-- PostgreSQL database dump
--

\restrict pnTbYaiVMwzZRLK6e5NVAc52Z4KDgCcAv5oiaiO7cCn45gmrlbHIR25dl613tS9

-- Dumped from database version 15.16
-- Dumped by pg_dump version 15.16

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

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS uk_r43af9ap4edm43mmtq01oddj6;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS uk_6dotkott2kjsp8vw4d0m25fb7;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    username character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, created_at, email, password, role, username) FROM stdin;
1	2026-02-17 19:06:45.26967	selmanim113@gmail.com	$2a$10$IC8oRNgOeb1UErIlJm5MmeAI9LQt5SacBLAoqvMmszC6GfCaOslOe	admin	MOMO
2	2026-02-17 19:08:39.252542	mohamed.selmani@gmail.com	$2a$10$vx08VDENGw0MLrI9VInwu.o5MDySI.sl6Fy.gghf2IRlFEjBNE5l.	client	wechh
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: users uk_6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- Name: users uk_r43af9ap4edm43mmtq01oddj6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_r43af9ap4edm43mmtq01oddj6 UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict pnTbYaiVMwzZRLK6e5NVAc52Z4KDgCcAv5oiaiO7cCn45gmrlbHIR25dl613tS9

\c ecommerce_catalog
--
-- PostgreSQL database dump
--

\restrict OHKb3xUw0JNxOLIrolJGJCmYcRNMHLRSMAGsEHYglMgRW8bx4T2iaPDj6fJFLWZ

-- Dumped from database version 15.16
-- Dumped by pg_dump version 15.16

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

ALTER TABLE IF EXISTS ONLY public.product_images DROP CONSTRAINT IF EXISTS fkqnq71xsohugpqwf3c9gxmsuy;
ALTER TABLE IF EXISTS ONLY public.product_colors DROP CONSTRAINT IF EXISTS fkqhu7cqni31911lmvx4fqmiw65;
ALTER TABLE IF EXISTS ONLY public.product_sizes DROP CONSTRAINT IF EXISTS fk4isa0j51hpdn7cx04m831jic4;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS uk_t8o6pivur7nn124jehx7cygw5;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.categories ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.products_id_seq;
DROP TABLE IF EXISTS public.products;
DROP TABLE IF EXISTS public.product_sizes;
DROP TABLE IF EXISTS public.product_images;
DROP TABLE IF EXISTS public.product_colors;
DROP SEQUENCE IF EXISTS public.categories_id_seq;
DROP TABLE IF EXISTS public.categories;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    description character varying(1000),
    icon character varying(255),
    label character varying(255),
    name character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: product_colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_colors (
    product_id bigint NOT NULL,
    color character varying(255)
);


ALTER TABLE public.product_colors OWNER TO postgres;

--
-- Name: product_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_images (
    product_id bigint NOT NULL,
    image_url character varying(255)
);


ALTER TABLE public.product_images OWNER TO postgres;

--
-- Name: product_sizes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_sizes (
    product_id bigint NOT NULL,
    size character varying(255)
);


ALTER TABLE public.product_sizes OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    caracteristiques text,
    category character varying(255),
    categorylabel character varying(255),
    created_at timestamp(6) without time zone,
    description character varying(2000),
    description_courte character varying(255),
    name character varying(255),
    price double precision,
    slug character varying(255),
    stock integer,
    thumbnail character varying(255),
    updated_at timestamp(6) without time zone,
    views integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, description, icon, label, name) FROM stdin;
1	Gadgets, téléphones, ordinateurs et plus.	Smartphone	Électronique	electronics
2	Vêtements, chaussures et accessoires.	Shirt	Mode	fashion
3	Décoration, meubles et jardin.	Home	Maison	home
4	Équipements sportifs et vêtements.	Activity	Sports	sports
5	Maquillage, soins et santé.	Heart	Beauté	beauty
6	Accessoires et pièces détachées.	Car	Automobile	automotive
\.


--
-- Data for Name: product_colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_colors (product_id, color) FROM stdin;
1	Rouge
1	Bleu
1	Noir
2	Rouge
2	Bleu
2	Noir
3	Rouge
3	Bleu
3	Noir
4	Rouge
4	Bleu
4	Noir
5	Rouge
5	Bleu
5	Noir
6	Rouge
6	Bleu
6	Noir
7	Rouge
7	Bleu
7	Noir
8	Rouge
8	Bleu
8	Noir
9	Rouge
9	Bleu
9	Noir
10	Rouge
10	Bleu
10	Noir
11	Rouge
11	Bleu
11	Noir
12	Rouge
12	Bleu
12	Noir
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_images (product_id, image_url) FROM stdin;
1	https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80
1	https://images.unsplash.com/photo-1556656793-0275ccb990cd?auto=format&fit=crop&w=800&q=80
1	https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80
1	https://images.unsplash.com/photo-1533228124798-ad2332616bd5?auto=format&fit=crop&w=800&q=80
1	https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80
1	https://images.unsplash.com/photo-1580910051074-3eb6948d3c90?auto=format&fit=crop&w=800&q=80
2	https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80
2	https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80
2	https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80
2	https://images.unsplash.com/photo-1556656793-0275ccb990cd?auto=format&fit=crop&w=800&q=80
2	https://images.unsplash.com/photo-1524678606372-571d755b8d5a?auto=format&fit=crop&w=800&q=80
2	https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80
3	https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80
3	https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80
3	https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80
3	https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80
3	https://images.unsplash.com/photo-1521572008054-d62e33d0e746?auto=format&fit=crop&w=800&q=80
3	https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80
4	https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80
4	https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80
4	https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80
4	https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80
4	https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80
4	https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80
5	https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80
5	https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80
5	https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=800&q=80
5	https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80
5	https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&w=800&q=80
5	https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=800&q=80
6	https://images.unsplash.com/photo-1507473883581-209633381638?auto=format&fit=crop&w=800&q=80
6	https://images.unsplash.com/photo-1513506003013-d534d82a3965?auto=format&fit=crop&w=800&q=80
6	https://images.unsplash.com/photo-1596443686812-2f45229eeb36?auto=format&fit=crop&w=800&q=80
6	https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800&q=80
6	https://images.unsplash.com/photo-1510613426831-7b19280d4db0?auto=format&fit=crop&w=800&q=80
6	https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80
7	https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80
7	https://images.unsplash.com/photo-1575052814088-613568d90291?auto=format&fit=crop&w=800&q=80
7	https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=80
7	https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=800&q=80
7	https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=800&q=80
7	https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80
8	https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80
8	https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80
8	https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80
8	https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=800&q=80
8	https://images.unsplash.com/photo-1574680096141-1cddd32e38e1?auto=format&fit=crop&w=800&q=80
8	https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80
9	https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&w=800&q=80
9	https://images.unsplash.com/photo-1556228578-8d893d298717?auto=format&fit=crop&w=800&q=80
9	https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=800&q=80
9	https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80
9	https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80
9	https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80
10	https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80
10	https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80
10	https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80
10	https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&w=800&q=80
10	https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80
10	https://images.unsplash.com/photo-1616949755610-8c9ad0e2709d?auto=format&fit=crop&w=800&q=80
11	https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80
11	https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80
11	https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80
11	https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80
11	https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=800&q=80
11	https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=800&q=80
12	https://images.unsplash.com/photo-1585338107529-13f953b6f29f?auto=format&fit=crop&w=800&q=80
12	https://images.unsplash.com/photo-1558317374-a35c202f4366?auto=format&fit=crop&w=800&q=80
12	https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80
12	https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80
12	https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80
12	https://images.unsplash.com/photo-1549488344-c705018e83be?auto=format&fit=crop&w=800&q=80
\.


--
-- Data for Name: product_sizes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_sizes (product_id, size) FROM stdin;
1	S
1	M
1	L
1	XL
2	S
2	M
2	L
2	XL
3	S
3	M
3	L
3	XL
4	S
4	M
4	L
4	XL
5	S
5	M
5	L
5	XL
6	S
6	M
6	L
6	XL
7	S
7	M
7	L
7	XL
8	S
8	M
8	L
8	XL
9	S
9	M
9	L
9	XL
10	S
10	M
10	L
10	XL
11	S
11	M
11	L
11	XL
12	S
12	M
12	L
12	XL
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, caracteristiques, category, categorylabel, created_at, description, description_courte, name, price, slug, stock, thumbnail, updated_at, views) FROM stdin;
1	\N	electronics	Électronique	2026-02-17 19:03:58.347616	Description détaillée du produit Smartphone X Pro. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Un smartphone ultra puissant pour les pros.	Smartphone X Pro	999	smartphone-x-pro	50	https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.347652	0
2	\N	electronics	Électronique	2026-02-17 19:03:58.371986	Description détaillée du produit Casque Audio Sans Fil. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Son immersif et réduction de bruit active.	Casque Audio Sans Fil	199	wireless-headphones	50	https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.372013	0
3	\N	fashion	Mode	2026-02-17 19:03:58.376838	Description détaillée du produit T-shirt Coton Bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Confortable et écologique.	T-shirt Coton Bio	29.99	organic-tshirt	50	https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.376862	0
4	\N	fashion	Mode	2026-02-17 19:03:58.381805	Description détaillée du produit Sneakers Urbaines. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Style moderne pour la ville.	Sneakers Urbaines	89.99	urban-sneakers	50	https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.381829	0
5	\N	home	Maison	2026-02-17 19:03:58.388076	Description détaillée du produit Canapé 3 Places. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Confort maximal pour votre salon.	Canapé 3 Places	499	sofa-3-seater	50	https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.3881	0
6	\N	home	Maison	2026-02-17 19:03:58.393132	Description détaillée du produit Lampe de Bureau LED. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Éclairage ajustable et économique.	Lampe de Bureau LED	39.99	led-desk-lamp	50	https://images.unsplash.com/photo-1507473883581-209633381638?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.393163	0
7	\N	sports	Sports	2026-02-17 19:03:58.397947	Description détaillée du produit Tapis de Yoga. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Antidérapant et durable.	Tapis de Yoga	25	yoga-mat	50	https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.397971	0
8	\N	sports	Sports	2026-02-17 19:03:58.403658	Description détaillée du produit Haltères 5kg. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Pour vos exercices de musculation.	Haltères 5kg	40	dumbbells-5kg	50	https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.403683	0
9	\N	beauty	Beauté	2026-02-17 19:03:58.408557	Description détaillée du produit Crème Hydratante Bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Pour une peau douce et nourrie.	Crème Hydratante Bio	35	organic-moisturizer	50	https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.408583	0
10	\N	beauty	Beauté	2026-02-17 19:03:58.413369	Description détaillée du produit Parfum Floral. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Une fragrance délicate et longue durée.	Parfum Floral	75	floral-perfume	50	https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.413394	0
12	\N	automotive	Automobile	2026-02-17 19:03:58.421002	Description détaillée du produit Aspirateur Voiture Portable. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Puissant et compact.	Aspirateur Voiture Portable	45.99	car-vacuum	50	https://images.unsplash.com/photo-1585338107529-13f953b6f29f?auto=format&fit=crop&w=800&q=80	2026-02-17 19:03:58.421027	0
11	\N	automotive	Automobile	2026-02-17 19:03:58.417437	Description détaillée du produit Support Téléphone Voiture. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Universel et facile à installer.	Support Téléphone Voiture	15.99	car-phone-holder	49	https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80	2026-02-17 19:09:09.606294	1
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 12, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: categories uk_t8o6pivur7nn124jehx7cygw5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT uk_t8o6pivur7nn124jehx7cygw5 UNIQUE (name);


--
-- Name: product_sizes fk4isa0j51hpdn7cx04m831jic4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sizes
    ADD CONSTRAINT fk4isa0j51hpdn7cx04m831jic4 FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: product_colors fkqhu7cqni31911lmvx4fqmiw65; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_colors
    ADD CONSTRAINT fkqhu7cqni31911lmvx4fqmiw65 FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: product_images fkqnq71xsohugpqwf3c9gxmsuy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT fkqnq71xsohugpqwf3c9gxmsuy FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- PostgreSQL database dump complete
--

\unrestrict OHKb3xUw0JNxOLIrolJGJCmYcRNMHLRSMAGsEHYglMgRW8bx4T2iaPDj6fJFLWZ

