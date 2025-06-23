CREATE TABLE "user" ( 
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "username" varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "password_changed_at" timestamptz NOT NULL DEFAULT '1970-01-01 00:00:00+00',
  "created_at" timestamptz NOT NULL DEFAULT NOW()
);

INSERT INTO "user" (username, email, password) VALUES ('test', 'taharahiroaki@icloud.com', '$2a$10$WIwNF6eeJl12.m0R82olue4QJgzRWVUCGSe2EIjiiX4OTFdn3HOu.');
-- you can login with id=test@test.com, password=test
