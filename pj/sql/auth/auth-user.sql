CREATE TABLE "user" ( 
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "username" varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "password_changed_at" timestamptz NOT NULL DEFAULT '1970-01-01 00:00:00+00',
  "created_at" timestamptz NOT NULL DEFAULT NOW()
);
