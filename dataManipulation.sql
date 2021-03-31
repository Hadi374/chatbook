

--  insert user
INSERT INTO users(first_name, last_name, email, password)
    VALUES('First', 'Last', 'test@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef'),  -- password is '123'
    ('First2', 'Last2', 'another@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef'),   -- password is '123'
    ('First3', 'Last3', 'thirdUser@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef'),   -- password is '123'
    ('First4', 'Last4', 'another.2@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef');   -- password is '123'

SELECT * FROM users;

-- delete user
-- DELETE FROM users WHERE id=1;

INSERT INTO files(link) VALUES('user_1_profile_image.png');
INSERT INTO files(link) VALUES('user_1_cover_image.png');
INSERT INTO files(link) VALUES('user_2_profile_image.png');
INSERT INTO files(link) VALUES('user_2_cover_image.png');
INSERT INTO files(link) VALUES('user_3_profile_image.png');
INSERT INTO files(link) VALUES('user_3_cover_image.png');

-- edit user
UPDATE users SET
  first_name = 'ChangedFirst',
  gender = 'male',
  bio='this is my changed bio.',
  year_of_birth=1995,
  phone=712345678,
  profile_image=5,
  cover_image=6
WHERE id = 3;

-- edit user
UPDATE users SET
  first_name='User 2',
  profile_image=3,
  cover_image=4
WHERE id = 2;


-- insert post
-- edit post
-- delete post

-- add friend request
-- accept friend request

-- add, edit and delete story



-- get user
-- get post
-- get members of group
-- get all groups of a user
-- get all pages that a user liked
-- get friends of a user

-- add file to database
-- add file to post using file id.

-- create, edit, delete group
-- for creating a group we must create receiver first:

-- after creating a group or page we must add creator as a member to `members` or `page_likes`.

-- Codes for creating group.
INSERT INTO receiver(name, creator_id, type) VALUES ('Programming Group', 1, 'groups');  -- id = 1
INSERT INTO chatbook.groups(id) VALUES(1);
INSERT INTO members(user_id, group_id, is_admin) VALUES(1, 1, 1); -- user with id 1 is admin of group with id 1.


INSERT INTO receiver(name, creator_id, type) VALUES ('English, Class 4', 2, 'pages');    -- id = 2
INSERT INTO pages(id) VALUES(2);
INSERT INTO page_likes(user_id, page_id, is_admin) VALUES(2, 2, 1); -- user with id 2 likes page with id 2 and is admin of that page too.


INSERT INTO receiver(name, creator_id, type) VALUES ('Math, Class 7', 2, 'pages');      -- id = 3
INSERT INTO pages(id) VALUES(3);
INSERT INTO page_likes(user_id, page_id, is_admin) VALUES(2, 3, 1); -- user with id  likes page with id 3 and is admin of that page too.


INSERT INTO receiver(name, creator_id, type) VALUES ('Database Concepts', 4, 'groups');      -- id = 3
INSERT INTO chatbook.groups(id) VALUES(4);
INSERT INTO members(user_id, group_id, is_admin) VALUES(2, 4, 1); -- user with id  likes page with id 3 and is admin of that page too.


INSERT INTO receiver(name, creator_id, type) VALUES ('Math, Class 3', 3, 'pages');      -- id = 3
INSERT INTO pages(id) VALUES(5);
INSERT INTO page_likes(user_id, page_id, is_admin) VALUES(2, 5, 1); -- user with id  likes page with id 3 and is admin of that page too.


INSERT INTO receiver(name, creator_id, type) VALUES ('Math', 4, 'groups');        -- id = 4  
INSERT INTO chatbook.groups(id) VALUES(6);
INSERT INTO members(user_id, group_id, is_admin) VALUES(4, 6, 1); -- user with id 4 is admin of group with id 4.


-- a user can join to a group.
-- user with id 2 (First2 Last2) wants to join math Group(id=4)
INSERT INTO members(user_id, group_id) VALUES(2, 6);
-- He also wants to like 'Math, Class 3' page(id=3).
INSERT INTO page_likes(user_id, page_id) VALUES(1, 3);


INSERT INTO members(user_id, group_id) VALUES(1, 5);
INSERT INTO members(user_id, group_id) VALUES(3, 6);
INSERT INTO members(user_id, group_id) VALUES(2, 1);
INSERT INTO page_likes(user_id, page_id) VALUES(3, 3);
INSERT INTO page_likes(user_id, page_id) VALUES(1, 6);

-- upload profile image and cover image
INSERT INTO files(link) VALUES('mathematic-group-profile.png');   -- id = 3
INSERT INTO files(link) VALUES('mathematic-group-cover.png');     -- id = 4

-- change Math Group(id=4) and add a description.


UPDATE receiver SET
  description = 'this group created to solve Mathematic problems.',
  profile_image = 3,
  cover_image = 4,
  updated_at = CURRENT_TIMESTAMP

WHERE id=4; -- we know math group id is 4



-- Get group for example with id=1
select 
    g.id, 
    r.name, 
    r.description, 
    r.creator_id, 
    u.first_name as 'creator_name',
    u.last_name as 'creator_lastname',
    profile_file.link as 'group_profile', 
    cover_file.link as 'group_cover', 
    COUNT(m.group_id) as 'members_count',
    r.created_at, 
    r.updated_at, 
    r.type
from chatbook.groups as g
    INNER JOIN 
        receiver as r 
    on g.id=r.id 
    INNER JOIN
        users as u
    on r.creator_id = u.id
    INNER JOIN
        members as m
    on g.id = m.group_id
    LEFT JOIN
        files as profile_file
    on profile_file.id = r.profile_image
    LEFT JOIN
        files as cover_file
    on cover_file.id = r.cover_image
WHERE g.id=1;

-- Get Members of a group for example group_id=(1)
select 
    g.id as 'group_id', 
    r.name as 'group_name', 
    u.id as 'user_id', 
    u.first_name, 
    u.last_name, 
    f.link as 'user_profile',
    m.is_admin
from members as m 
    inner join 
        users as u 
    on m.user_id=u.id 
    inner join 
        chatbook.groups as g 
    on m.group_id = g.id 
    inner join 
        receiver as r 
    on g.id = r.id 
    LEFT JOIN 
        files as f
    on u.profile_image = f.id
WHERE g.id=1;

-- get all groups of user with id = 2
SELECT 
    u.id as 'user_id',
    g.id as 'group_id',
    r.name as 'group_name',
    f.link as 'group_profile'
FROM 
    members as m 
    INNER JOIN
        users as u
    on m.user_id = u.id
    INNER JOIN
        chatbook.groups as g
    on m.group_id=g.id
    INNER JOIN
        receiver as r
    on r.id = g.id
    LEFT JOIN 
        files as f
    on r.profile_image = f.id
WHERE u.id=2;

-- get page is same as get group.

-- get pages that a user liked.
SELECT 
    u.id as user_id,
    p.id as page_id,
    r.name as page_name,
    pf.link as page_profile,
    cf.link as cover
FROM page_likes as l
    INNER JOIN 
        pages as p
    on p.id = l.page_id
    INNER JOIN 
        receiver as r
    on r.id = p.id
    INNER JOIN 
        users as u
    on l.user_id = u.id
    LEFT JOIN 
        files as pf
    on r.profile_image = pf.id
    LEFT JOIN 
        files as cf
    on r.cover_image = cf.id
WHERE p.id=2;
    
-- Get count of likes of page with id=3
SELECT 
    l.page_id, 
    r.name,
    pf.link,
    COUNT(l.user_id) as 'like_count'
FROM page_likes as l
    INNER JOIN 
        pages as p
    INNER JOIN
        receiver as r
    on r.id = p.id
    LEFT JOIN 
        files as pf
    ON pf.id = r.profile_image
WHERE p.id=3 group by(l.page_id);


--  delete programming group (id=1)
DELETE FROM receiver WHERE id=1;






-- create poll with variable answer
-- user answer to a poll

-- send private message from user1 to user2

-- react to post or comment. (what about story??)

-- a user shares a post (post must not be private or comment)

