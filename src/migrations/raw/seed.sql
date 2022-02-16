-- Roles

INSERT INTO public.v_role
("name", created_at, updated_at)
VALUES('admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.v_role
("name", created_at, updated_at)
VALUES('user', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Users

INSERT INTO public.v_user
("name", email, birth_date, profile_picture, disabled, created_at, updated_at)
VALUES('Monkey D. Luffy', 'luffy_rubber@strawhat.com', '05/05/1996', null, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.v_user
("name", email, birth_date, profile_picture, disabled, created_at, updated_at)
VALUES('Ronoroa Zoro', 'rono_sword@strawhat.com', '17/11/1999', null, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- User->Role

INSERT INTO public.v_user_role
(user_id, role_id, created_at, updated_at)
VALUES(1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.v_user_role
(user_id, role_id, created_at, updated_at)
VALUES(2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Genres

INSERT INTO public.v_genre
("name", created_at, updated_at)
VALUES('Anime', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.v_genre
("name", created_at, updated_at)
VALUES('Terror', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.v_genre
("name", created_at, updated_at)
VALUES('Ação', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Shows

INSERT INTO public.v_show
(media_id, "name", description, bg_image, content_type, disabled, created_at, updated_at)
VALUES(null, 'One Piece', 'One Piece is a Japanese manga series written and illustrated by Eiichiro Oda.', '', 0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.v_show
(media_id, "name", description, bg_image, content_type, disabled, created_at, updated_at)
VALUES(null, '우리 지금 학교는', 'Trapped students must escape their high school which has become ground zero for a zombie virus outbreak.', '', 0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.v_show
(media_id, "name", description, bg_image, content_type, disabled, created_at, updated_at)
VALUES(null, '007 - Em busca do Monark', 'Monark foi cancelado ao apoiar o nazismo em público. Entretanto, um general americano irá tentar salvá-lo da destruição.', '', 0, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Shows->Genre

INSERT INTO public.v_show_genre
(show_id, genre_id, created_at, updated_at)
VALUES(1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.v_show_genre
(show_id, genre_id, created_at, updated_at)
VALUES(2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.v_show_genre
(show_id, genre_id, created_at, updated_at)
VALUES(3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seasons

INSERT INTO public.v_season
(show_id, pos, disabled, created_at, updated_at)
VALUES(1, 1, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.v_season
(show_id, pos, disabled, created_at, updated_at)
VALUES(1, 2, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Episodes

INSERT INTO public.v_episode
(season_id, pos, "name", description, media_id, disabled, created_at, updated_at)
VALUES(1, 1, 'Luffy arrives', 'Luffy eats Gomu Gomu no Mi', null, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.v_episode
(season_id, pos, "name", description, media_id, disabled, created_at, updated_at)
VALUES(1, 2, 'Sanji dies', 'Sanji got killed by Naruto', null, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
