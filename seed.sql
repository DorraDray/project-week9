CREATE TABLE IF NOT EXISTS profiles(
  id SERIAL PRIMARY KEY,
  clerk_user_id text,
  username text,
  photo text,
  email text,
  bio text
)
CREATE TABLE IF NOT EXISTS profile_recipes(
  id SERIAL PRIMARY KEY,
  name text,
  content text,
  photo text,
  like_count INTEGER NOT NULL DEFAULT 0,
  profile_id INTEGER REFERENCES profiles (id),
 created_on TIMESTAMP DEFAULT NOW()
)

CREATE TABLE IF NOT EXISTS profile_recipe_comments(
  id SERIAL PRIMARY KEY,
  content text,
  profile_recipe_id INTEGER REFERENCES profile_recipes (id),
 profile_id INTEGER REFERENCES profiles (id),
 created_on TIMESTAMP DEFAULT NOW()
)

CREATE TABLE IF NOT EXISTS profile_followers(
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles (id),
 follower_id INTEGER REFERENCES profiles (id)
)