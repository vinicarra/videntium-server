const sql = `
create table v_user (
\tid serial primary key,
\tname text not null,
\temail text not null,
\tbirth_date date not null,
\tprofile_picture text,
\tdisabled boolean not null default false,
\tunique (email),
\tcreated_at timestamp with time zone default CURRENT_TIMESTAMP not null,
\tupdated_at timestamp with time zone default CURRENT_TIMESTAMP not null
);

-- User refresh tokens
create table v_user_token (
\tid serial primary key,
\tuser_id integer not null,
\trefresh_token text not null,
\texpire_date timestamp not null,
\trevoked boolean not null,
\tconstraint fk_user foreign key(user_id) references v_user(id),
\tcreated_at timestamp with time zone default CURRENT_TIMESTAMP not null,
\tupdated_at timestamp with time zone default CURRENT_TIMESTAMP not null
);

-- Roles names
-- user
-- admin
create table v_role (
\tid serial primary key,
\tname text not null,
\tcreated_at timestamp with time zone default CURRENT_TIMESTAMP not null,
\tupdated_at timestamp with time zone default CURRENT_TIMESTAMP not null
);

create table v_user_role (
\tid serial primary key,
\tuser_id integer not null,
\trole_id integer not null,
\tconstraint fk_user foreign key(user_id) references v_user(id),
\tconstraint fk_role foreign key(role_id) references v_role(id),
\tcreated_at timestamp with time zone default CURRENT_TIMESTAMP not null,
\tupdated_at timestamp with time zone default CURRENT_TIMESTAMP not null
);

-- Media
create table v_media(
\tid serial primary key,
\turl text not null,
\tintro_start integer,
\tintro_end integer,
\toutro_start integer,
\tcreated_at timestamp with time zone default CURRENT_TIMESTAMP not null,
\tupdated_at timestamp with time zone default CURRENT_TIMESTAMP not null
);

-- Content type
-- 1 = movie
-- 2 = tv show (with seasons)
-- 3 = documentary
create table v_show (
\tid serial primary key,
\tmedia_id integer,
\tname text not null,
\tdescription text not null,
\tbg_image text,
\tcontent_type smallint not null,
\tdisabled boolean not null default false,
\tconstraint fk_media foreign key(media_id) references v_media(id),
\tcreated_at timestamp with time zone default CURRENT_TIMESTAMP not null,
\tupdated_at timestamp with time zone default CURRENT_TIMESTAMP not null
);

-- Genre
create table v_genre(
\tid serial primary key,
\tname text not null,
\tcreated_at timestamp with time zone default CURRENT_TIMESTAMP not null,
\tupdated_at timestamp with time zone default CURRENT_TIMESTAMP not null
);

-- Genre-show relation
create table v_show_genre(
\tid serial primary key,
\tshow_id integer not null,
\tgenre_id integer not null,
\tconstraint fk_show foreign key(show_id) references v_show(id),
\tconstraint fk_genre foreign key(genre_id) references v_genre(id),
\tcreated_at timestamp with time zone default CURRENT_TIMESTAMP not null,
\tupdated_at timestamp with time zone default CURRENT_TIMESTAMP not null
);

-- Season
create table v_season(
\tid serial,
\tshow_id integer not null,
\tpos smallint check (pos > 0) not null,
\tconstraint fk_show foreign key(show_id) references v_show(id),
\tprimary key(id, show_id, pos),
\tdisabled boolean not null default false,
\tunique (id),
\tcreated_at timestamp with time zone default CURRENT_TIMESTAMP not null,
\tupdated_at timestamp with time zone default CURRENT_TIMESTAMP not null
);

-- Episode
create table v_episode(
\tid serial,
\tseason_id integer not null,
\tpos smallint check (pos > 0) not null,
\tname text not null,
\tdescription text,
\tmedia_id integer,
\tdisabled boolean not null default false,
\tconstraint fk_season foreign key(season_id) references v_season(id),
\tconstraint fk_media foreign key(media_id) references v_media(id),
\tprimary key(id, season_id, pos),
\tunique (id),
\tcreated_at timestamp with time zone default CURRENT_TIMESTAMP not null,
\tupdated_at timestamp with time zone default CURRENT_TIMESTAMP not null
);


`;

const dropSql = `

DROP TABLE IF EXISTS v_show_genre;
DROP TABLE IF EXISTS v_genre;
DROP TABLE IF EXISTS v_user_role;
DROP TABLE IF EXISTS v_role;
DROP TABLE IF EXISTS v_user;
DROP TABLE IF EXISTS v_episode;
DROP TABLE IF EXISTS v_season;
DROP TABLE IF EXISTS v_show;
DROP TABLE IF EXISTS v_media;

`;

export { sql, dropSql };
