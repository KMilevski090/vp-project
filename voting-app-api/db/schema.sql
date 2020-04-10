create database votingApp;

create table users
(
  id bigserial not null
    constraint users_pkey
      primary key,
  email varchar(255),
  first_name varchar(255),
  last_name varchar(255),
  password varchar(255),
  picture_url varchar(255),
  username varchar(255)
);

alter table users owner to postgres;

create table polls
(
  id bigserial not null
    constraint polls_pkey
      primary key,
  date_created timestamp,
  question varchar(255),
  short_url varchar(255),
  users_id bigint not null references users(id)
);

alter table polls owner to postgres;

create table options
(
    id bigserial not null
        constraint options_pkey
            primary key,
    times_voted integer,
    value varchar(255),
    polls_id bigint references polls(id)
);

alter table options owner to postgres;

create table votes (
    id bigserial not null,
    ip_address text,
    options_id bigint references options(id),
    polls_id bigint references polls(id),
    date_created timestamp with time zone
);

alter table votes owner to postgres;

create table ips_voted
(
  id bigserial not null
    constraint ips_voted_pkey
      primary key,
  ip_address varchar(255)
);

alter table ips_voted owner to postgres;

create table polls_ips_voted
(
  polls_id bigint not null references polls(id),
  ips_voted_id bigint not null references ips_voted(id)
);

alter table polls_ips_voted owner to postgres;

INSERT INTO public.users (id, email, first_name, last_name, password, picture_url, username)
VALUES (1, 'adm@in', 'admin', 'admin', '$2a$10$bl7y9riW.nw6Vr5eoS9IS.EY.rMFtEs16MpnesrVKQICClfCfavoi', '', 'admin');

INSERT INTO public.polls (date_created, question, short_url, users_id)
VALUES ('2020-04-10 11:02:19.618234', 'Test 1', 'akOSV', 1);

INSERT INTO public.polls (date_created, question, short_url, users_id)
VALUES ('2020-04-10 11:02:19.618234', 'Test 2', 'mrkaE', 1);

INSERT INTO public.polls (date_created, question, short_url, users_id)
VALUES ('2020-04-10 11:02:19.618234', 'Test 3', 'smkeQ', 1);

INSERT INTO public.polls (date_created, question, short_url, users_id)
VALUES ('2020-04-10 11:02:19.618234', 'Test 4', 'loDMS', 1);

INSERT INTO public.polls (date_created, question, short_url, users_id)
VALUES ('2020-04-10 11:02:19.618234', 'Test 5', 'dmaLD', 1);

INSERT INTO public.polls (date_created, question, short_url, users_id)
VALUES ('2020-04-10 11:02:19.618234', 'Test 6', 'asdER', 1);

INSERT INTO public.polls (date_created, question, short_url, users_id)
VALUES ('2020-04-10 11:02:19.618234', 'Test 7', 'qqQQs', 1);

INSERT INTO public.polls (date_created, question, short_url, users_id)
VALUES ('2020-04-10 11:02:19.618234', 'Test 8', 'plskm', 1);

INSERT INTO public.options (times_voted, value, polls_id) VALUES (10, 'option 1', (select id from polls where question = 'Test 1'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (5, 'option 2', (select id from polls where question = 'Test 1'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (2, 'option 3', (select id from polls where question = 'Test 1'));

INSERT INTO public.options (times_voted, value, polls_id) VALUES (10, 'option 1', (select id from polls where question = 'Test 2'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (10, 'option 2', (select id from polls where question = 'Test 2'));

INSERT INTO public.options (times_voted, value, polls_id) VALUES (3, 'option 1', (select id from polls where question = 'Test 3'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (3, 'option 2', (select id from polls where question = 'Test 3'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (3, 'option 3', (select id from polls where question = 'Test 3'));

INSERT INTO public.options (times_voted, value, polls_id) VALUES (0, 'option 1', (select id from polls where question = 'Test 4'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (5, 'option 2', (select id from polls where question = 'Test 4'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (0, 'option 3', (select id from polls where question = 'Test 4'));

INSERT INTO public.options (times_voted, value, polls_id) VALUES (1, 'option 1', (select id from polls where question = 'Test 5'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (2, 'option 2', (select id from polls where question = 'Test 5'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (3, 'option 3', (select id from polls where question = 'Test 5'));

INSERT INTO public.options (times_voted, value, polls_id) VALUES (1, 'option 1', (select id from polls where question = 'Test 6'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (123, 'option 2', (select id from polls where question = 'Test 6'));

INSERT INTO public.options (times_voted, value, polls_id) VALUES (11, 'option 1', (select id from polls where question = 'Test 7'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (22, 'option 2', (select id from polls where question = 'Test 7'));

INSERT INTO public.options (times_voted, value, polls_id) VALUES (1, 'option 1', (select id from polls where question = 'Test 8'));
INSERT INTO public.options (times_voted, value, polls_id) VALUES (0, 'option 2', (select id from polls where question = 'Test 8'));
