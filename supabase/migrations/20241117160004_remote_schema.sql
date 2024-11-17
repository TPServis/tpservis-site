

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


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM (
    'collection',
    'selection'
);


ALTER TYPE "public"."enum__pages_v_blocks_archive_populate_by" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM (
    'posts'
);


ALTER TYPE "public"."enum__pages_v_blocks_archive_relation_to" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM (
    'default',
    'outline'
);


ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_type" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM (
    'oneThird',
    'half',
    'twoThirds',
    'full'
);


ALTER TYPE "public"."enum__pages_v_blocks_content_columns_size" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM (
    'default',
    'outline'
);


ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_type" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_blocks_horizontal_icons_group_items_icon" AS ENUM (
    'MdSupportAgent',
    'BsPersonBoundingBox',
    'FaRegRectangleList'
);


ALTER TYPE "public"."enum__pages_v_blocks_horizontal_icons_group_items_icon" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_blocks_media_block_position" AS ENUM (
    'default',
    'fullscreen'
);


ALTER TYPE "public"."enum__pages_v_blocks_media_block_position" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_blocks_side_list_with_icons_items_icon" AS ENUM (
    'airplane',
    'bus',
    'train'
);


ALTER TYPE "public"."enum__pages_v_blocks_side_list_with_icons_items_icon" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM (
    'none',
    'highImpact',
    'mediumImpact',
    'lowImpact'
);


ALTER TYPE "public"."enum__pages_v_version_hero_type" OWNER TO "postgres";


CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM (
    'draft',
    'published'
);


ALTER TYPE "public"."enum__pages_v_version_status" OWNER TO "postgres";


CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM (
    'draft',
    'published'
);


ALTER TYPE "public"."enum__posts_v_version_status" OWNER TO "postgres";


CREATE TYPE "public"."enum_footer_legal_links_link_appearance" AS ENUM (
    'default',
    'outline'
);


ALTER TYPE "public"."enum_footer_legal_links_link_appearance" OWNER TO "postgres";


CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE "public"."enum_footer_legal_links_link_type" OWNER TO "postgres";


CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE "public"."enum_footer_nav_items_link_type" OWNER TO "postgres";


CREATE TYPE "public"."enum_footer_right_nav_items_link_type" AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE "public"."enum_footer_right_nav_items_link_type" OWNER TO "postgres";


CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM (
    'message',
    'redirect'
);


ALTER TYPE "public"."enum_forms_confirmation_type" OWNER TO "postgres";


CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE "public"."enum_header_nav_items_link_type" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM (
    'collection',
    'selection'
);


ALTER TYPE "public"."enum_pages_blocks_archive_populate_by" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM (
    'posts'
);


ALTER TYPE "public"."enum_pages_blocks_archive_relation_to" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM (
    'default',
    'outline'
);


ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE "public"."enum_pages_blocks_content_columns_link_type" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM (
    'oneThird',
    'half',
    'twoThirds',
    'full'
);


ALTER TYPE "public"."enum_pages_blocks_content_columns_size" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM (
    'default',
    'outline'
);


ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE "public"."enum_pages_blocks_cta_links_link_type" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_blocks_horizontal_icons_group_items_icon" AS ENUM (
    'MdSupportAgent',
    'BsPersonBoundingBox',
    'FaRegRectangleList'
);


ALTER TYPE "public"."enum_pages_blocks_horizontal_icons_group_items_icon" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_blocks_media_block_position" AS ENUM (
    'default',
    'fullscreen'
);


ALTER TYPE "public"."enum_pages_blocks_media_block_position" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_blocks_side_list_with_icons_items_icon" AS ENUM (
    'airplane',
    'bus',
    'train'
);


ALTER TYPE "public"."enum_pages_blocks_side_list_with_icons_items_icon" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_hero_type" AS ENUM (
    'none',
    'highImpact',
    'mediumImpact',
    'lowImpact'
);


ALTER TYPE "public"."enum_pages_hero_type" OWNER TO "postgres";


CREATE TYPE "public"."enum_pages_status" AS ENUM (
    'draft',
    'published'
);


ALTER TYPE "public"."enum_pages_status" OWNER TO "postgres";


CREATE TYPE "public"."enum_posts_status" AS ENUM (
    'draft',
    'published'
);


ALTER TYPE "public"."enum_posts_status" OWNER TO "postgres";


CREATE TYPE "public"."enum_redirects_to_type" AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE "public"."enum_redirects_to_type" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."_pages_v" (
    "id" integer NOT NULL,
    "parent_id" integer,
    "version_title" character varying,
    "version_hero_type" "public"."enum__pages_v_version_hero_type" DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type",
    "version_hero_pre_title" character varying,
    "version_hero_title" character varying,
    "version_hero_subtitle" character varying,
    "version_hero_cta_label" character varying,
    "version_hero_cta_url" character varying,
    "version_meta_title" character varying,
    "version_meta_image_id" integer,
    "version_meta_description" character varying,
    "version_published_at" timestamp(3) with time zone,
    "version_slug" character varying,
    "version_slug_lock" boolean DEFAULT true,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "public"."enum__pages_v_version_status" DEFAULT 'draft'::"public"."enum__pages_v_version_status",
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "latest" boolean,
    "autosave" boolean
);


ALTER TABLE "public"."_pages_v" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_archive" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "intro_content" "jsonb",
    "populate_by" "public"."enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection'::"public"."enum__pages_v_blocks_archive_populate_by",
    "relation_to" "public"."enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts'::"public"."enum__pages_v_blocks_archive_relation_to",
    "limit" numeric DEFAULT 10,
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_archive" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_archive_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_archive_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_archive_id_seq" OWNED BY "public"."_pages_v_blocks_archive"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_bento4x4" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "title" character varying,
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_bento4x4" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_bento4x4_cards" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "image_id" integer,
    "title" character varying,
    "description" "jsonb",
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_blocks_bento4x4_cards" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_bento4x4_cards_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_bento4x4_cards_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_bento4x4_cards_id_seq" OWNED BY "public"."_pages_v_blocks_bento4x4_cards"."id";



CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_bento4x4_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_bento4x4_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_bento4x4_id_seq" OWNED BY "public"."_pages_v_blocks_bento4x4"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_content" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_content" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_content_columns" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "size" "public"."enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird'::"public"."enum__pages_v_blocks_content_columns_size",
    "rich_text" "jsonb",
    "enable_link" boolean,
    "link_type" "public"."enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference'::"public"."enum__pages_v_blocks_content_columns_link_type",
    "link_new_tab" boolean,
    "link_url" character varying,
    "link_label" character varying,
    "link_appearance" "public"."enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default'::"public"."enum__pages_v_blocks_content_columns_link_appearance",
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_blocks_content_columns" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_content_columns_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_content_columns_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_content_columns_id_seq" OWNED BY "public"."_pages_v_blocks_content_columns"."id";



CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_content_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_content_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_content_id_seq" OWNED BY "public"."_pages_v_blocks_content"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_cta" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "rich_text" "jsonb",
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_cta" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_cta_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_cta_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_cta_id_seq" OWNED BY "public"."_pages_v_blocks_cta"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_cta_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "link_type" "public"."enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference'::"public"."enum__pages_v_blocks_cta_links_link_type",
    "link_new_tab" boolean,
    "link_url" character varying,
    "link_label" character varying,
    "link_appearance" "public"."enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default'::"public"."enum__pages_v_blocks_cta_links_link_appearance",
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_blocks_cta_links" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_cta_links_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_cta_links_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_cta_links_id_seq" OWNED BY "public"."_pages_v_blocks_cta_links"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "title" character varying,
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_faq" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_faq_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_faq_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_faq_id_seq" OWNED BY "public"."_pages_v_blocks_faq"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_faq_questions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "question" character varying,
    "answer" "jsonb",
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_blocks_faq_questions" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_faq_questions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_faq_questions_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_faq_questions_id_seq" OWNED BY "public"."_pages_v_blocks_faq_questions"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_form_block" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "form_id" integer,
    "enable_intro" boolean,
    "intro_content" "jsonb",
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_form_block" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_form_block_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_form_block_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_form_block_id_seq" OWNED BY "public"."_pages_v_blocks_form_block"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_horizontal_icons_group" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "pretitle" character varying,
    "title" character varying,
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_horizontal_icons_group" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_horizontal_icons_group_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_horizontal_icons_group_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_horizontal_icons_group_id_seq" OWNED BY "public"."_pages_v_blocks_horizontal_icons_group"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_horizontal_icons_group_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "icon" "public"."enum__pages_v_blocks_horizontal_icons_group_items_icon",
    "title" character varying,
    "description" "jsonb",
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_blocks_horizontal_icons_group_items" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_horizontal_icons_group_items_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_horizontal_icons_group_items_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_horizontal_icons_group_items_id_seq" OWNED BY "public"."_pages_v_blocks_horizontal_icons_group_items"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_image_with_info_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "title" character varying,
    "subtitle" "jsonb",
    "cta_url" character varying,
    "cta_label" character varying,
    "image_id" integer,
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_image_with_info_grid" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_image_with_info_grid_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_image_with_info_grid_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_image_with_info_grid_id_seq" OWNED BY "public"."_pages_v_blocks_image_with_info_grid"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_image_with_info_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "title" character varying,
    "description" "jsonb",
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_blocks_image_with_info_grid_items" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_image_with_info_grid_items_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_image_with_info_grid_items_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_image_with_info_grid_items_id_seq" OWNED BY "public"."_pages_v_blocks_image_with_info_grid_items"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_list_aside" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "title" character varying,
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_list_aside" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_list_aside_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_list_aside_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_list_aside_id_seq" OWNED BY "public"."_pages_v_blocks_list_aside"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_list_aside_list" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "item_title" character varying,
    "item_url" character varying,
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_blocks_list_aside_list" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_list_aside_list_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_list_aside_list_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_list_aside_list_id_seq" OWNED BY "public"."_pages_v_blocks_list_aside_list"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_media_block" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "position" "public"."enum__pages_v_blocks_media_block_position" DEFAULT 'default'::"public"."enum__pages_v_blocks_media_block_position",
    "media_id" integer,
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_media_block" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_media_block_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_media_block_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_media_block_id_seq" OWNED BY "public"."_pages_v_blocks_media_block"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_popular_destinations_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "title" character varying,
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_popular_destinations_gallery" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_popular_destinations_gallery_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_popular_destinations_gallery_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_id_seq" OWNED BY "public"."_pages_v_blocks_popular_destinations_gallery"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_popular_destinations_gallery_rows" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_blocks_popular_destinations_gallery_rows" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_popular_destinations_gallery_rows_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_popular_destinations_gallery_rows_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_rows_id_seq" OWNED BY "public"."_pages_v_blocks_popular_destinations_gallery_rows"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_popular_destinations_gallery_rows_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "image_id" integer,
    "title" character varying,
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_blocks_popular_destinations_gallery_rows_items" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_popular_destinations_gallery_rows_items_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_popular_destinations_gallery_rows_items_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_rows_items_id_seq" OWNED BY "public"."_pages_v_blocks_popular_destinations_gallery_rows_items"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_side_list_with_icons" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "pretitle" character varying,
    "title" character varying,
    "subtitle" "jsonb",
    "cta_url" character varying,
    "cta_label" character varying,
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_side_list_with_icons" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_side_list_with_icons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_side_list_with_icons_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_side_list_with_icons_id_seq" OWNED BY "public"."_pages_v_blocks_side_list_with_icons"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_side_list_with_icons_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "icon" "public"."enum__pages_v_blocks_side_list_with_icons_items_icon",
    "title" character varying,
    "description" "jsonb",
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_blocks_side_list_with_icons_items" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_side_list_with_icons_items_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_side_list_with_icons_items_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_side_list_with_icons_items_id_seq" OWNED BY "public"."_pages_v_blocks_side_list_with_icons_items"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_blocks_text_aside" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" integer NOT NULL,
    "title" character varying,
    "subtitle" character varying,
    "content" "jsonb",
    "_uuid" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."_pages_v_blocks_text_aside" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_blocks_text_aside_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_blocks_text_aside_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_blocks_text_aside_id_seq" OWNED BY "public"."_pages_v_blocks_text_aside"."id";



CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_id_seq" OWNED BY "public"."_pages_v"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_rels" (
    "id" integer NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "pages_id" integer,
    "categories_id" integer,
    "posts_id" integer
);


ALTER TABLE "public"."_pages_v_rels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_rels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_rels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_rels_id_seq" OWNED BY "public"."_pages_v_rels"."id";



CREATE TABLE IF NOT EXISTS "public"."_pages_v_version_hero_media_group" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "media1_id" integer,
    "media2_id" integer,
    "_uuid" character varying
);


ALTER TABLE "public"."_pages_v_version_hero_media_group" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_pages_v_version_hero_media_group_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_pages_v_version_hero_media_group_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_pages_v_version_hero_media_group_id_seq" OWNED BY "public"."_pages_v_version_hero_media_group"."id";



CREATE TABLE IF NOT EXISTS "public"."_posts_v" (
    "id" integer NOT NULL,
    "parent_id" integer,
    "version_title" character varying,
    "version_content" "jsonb",
    "version_meta_title" character varying,
    "version_meta_image_id" integer,
    "version_meta_description" character varying,
    "version_published_at" timestamp(3) with time zone,
    "version_slug" character varying,
    "version_slug_lock" boolean DEFAULT true,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "public"."enum__posts_v_version_status" DEFAULT 'draft'::"public"."enum__posts_v_version_status",
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "latest" boolean,
    "autosave" boolean
);


ALTER TABLE "public"."_posts_v" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_posts_v_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_posts_v_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_posts_v_id_seq" OWNED BY "public"."_posts_v"."id";



CREATE TABLE IF NOT EXISTS "public"."_posts_v_rels" (
    "id" integer NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "posts_id" integer,
    "categories_id" integer,
    "users_id" integer
);


ALTER TABLE "public"."_posts_v_rels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_posts_v_rels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_posts_v_rels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_posts_v_rels_id_seq" OWNED BY "public"."_posts_v_rels"."id";



CREATE TABLE IF NOT EXISTS "public"."_posts_v_version_populated_authors" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" integer NOT NULL,
    "_uuid" character varying,
    "name" character varying
);


ALTER TABLE "public"."_posts_v_version_populated_authors" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."_posts_v_version_populated_authors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."_posts_v_version_populated_authors_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."_posts_v_version_populated_authors_id_seq" OWNED BY "public"."_posts_v_version_populated_authors"."id";



CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" integer NOT NULL,
    "title" character varying NOT NULL,
    "parent_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."categories_breadcrumbs" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "doc_id" integer,
    "url" character varying,
    "label" character varying
);


ALTER TABLE "public"."categories_breadcrumbs" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."categories_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."categories_id_seq" OWNED BY "public"."categories"."id";



CREATE TABLE IF NOT EXISTS "public"."footer" (
    "id" integer NOT NULL,
    "contact_info_telephone_label_telephone" character varying,
    "contact_info_telephone_label_label" character varying,
    "contact_info_email" character varying,
    "social_links_facebook" character varying,
    "social_links_instagram" character varying,
    "copyright" character varying,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
);


ALTER TABLE "public"."footer" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."footer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."footer_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."footer_id_seq" OWNED BY "public"."footer"."id";



CREATE TABLE IF NOT EXISTS "public"."footer_legal_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "link_type" "public"."enum_footer_legal_links_link_type" DEFAULT 'reference'::"public"."enum_footer_legal_links_link_type",
    "link_new_tab" boolean,
    "link_url" character varying,
    "link_label" character varying NOT NULL,
    "link_appearance" "public"."enum_footer_legal_links_link_appearance" DEFAULT 'default'::"public"."enum_footer_legal_links_link_appearance"
);


ALTER TABLE "public"."footer_legal_links" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."footer_nav_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "link_type" "public"."enum_footer_nav_items_link_type" DEFAULT 'reference'::"public"."enum_footer_nav_items_link_type",
    "link_new_tab" boolean,
    "link_url" character varying,
    "link_label" character varying NOT NULL
);


ALTER TABLE "public"."footer_nav_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."footer_rels" (
    "id" integer NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "pages_id" integer
);


ALTER TABLE "public"."footer_rels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."footer_rels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."footer_rels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."footer_rels_id_seq" OWNED BY "public"."footer_rels"."id";



CREATE TABLE IF NOT EXISTS "public"."footer_right_nav_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "link_type" "public"."enum_footer_right_nav_items_link_type" DEFAULT 'reference'::"public"."enum_footer_right_nav_items_link_type",
    "link_new_tab" boolean,
    "link_url" character varying,
    "link_label" character varying NOT NULL
);


ALTER TABLE "public"."footer_right_nav_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."form_submissions" (
    "id" integer NOT NULL,
    "form_id" integer NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."form_submissions" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."form_submissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."form_submissions_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."form_submissions_id_seq" OWNED BY "public"."form_submissions"."id";



CREATE TABLE IF NOT EXISTS "public"."form_submissions_submission_data" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "field" character varying NOT NULL,
    "value" character varying NOT NULL
);


ALTER TABLE "public"."form_submissions_submission_data" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms" (
    "id" integer NOT NULL,
    "title" character varying NOT NULL,
    "submit_button_label" character varying,
    "confirmation_type" "public"."enum_forms_confirmation_type" DEFAULT 'message'::"public"."enum_forms_confirmation_type",
    "confirmation_message" "jsonb",
    "redirect_url" character varying,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."forms" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_blocks_checkbox" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "name" character varying NOT NULL,
    "label" character varying,
    "width" numeric,
    "required" boolean,
    "default_value" boolean,
    "block_name" character varying
);


ALTER TABLE "public"."forms_blocks_checkbox" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_blocks_country" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "name" character varying NOT NULL,
    "label" character varying,
    "width" numeric,
    "required" boolean,
    "block_name" character varying
);


ALTER TABLE "public"."forms_blocks_country" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_blocks_email" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "name" character varying NOT NULL,
    "label" character varying,
    "width" numeric,
    "required" boolean,
    "block_name" character varying
);


ALTER TABLE "public"."forms_blocks_email" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_blocks_message" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "message" "jsonb",
    "block_name" character varying
);


ALTER TABLE "public"."forms_blocks_message" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_blocks_number" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "name" character varying NOT NULL,
    "label" character varying,
    "width" numeric,
    "default_value" numeric,
    "required" boolean,
    "block_name" character varying
);


ALTER TABLE "public"."forms_blocks_number" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_blocks_select" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "name" character varying NOT NULL,
    "label" character varying,
    "width" numeric,
    "default_value" character varying,
    "required" boolean,
    "block_name" character varying
);


ALTER TABLE "public"."forms_blocks_select" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_blocks_select_options" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL,
    "label" character varying NOT NULL,
    "value" character varying NOT NULL
);


ALTER TABLE "public"."forms_blocks_select_options" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_blocks_state" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "name" character varying NOT NULL,
    "label" character varying,
    "width" numeric,
    "required" boolean,
    "block_name" character varying
);


ALTER TABLE "public"."forms_blocks_state" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_blocks_text" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "name" character varying NOT NULL,
    "label" character varying,
    "width" numeric,
    "default_value" character varying,
    "required" boolean,
    "block_name" character varying
);


ALTER TABLE "public"."forms_blocks_text" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_blocks_textarea" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "name" character varying NOT NULL,
    "label" character varying,
    "width" numeric,
    "default_value" character varying,
    "required" boolean,
    "block_name" character varying
);


ALTER TABLE "public"."forms_blocks_textarea" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms_emails" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "email_to" character varying,
    "cc" character varying,
    "bcc" character varying,
    "reply_to" character varying,
    "email_from" character varying,
    "subject" character varying DEFAULT 'You''ve received a new message.'::character varying NOT NULL,
    "message" "jsonb"
);


ALTER TABLE "public"."forms_emails" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."forms_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."forms_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."forms_id_seq" OWNED BY "public"."forms"."id";



CREATE TABLE IF NOT EXISTS "public"."header" (
    "id" integer NOT NULL,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
);


ALTER TABLE "public"."header" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."header_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."header_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."header_id_seq" OWNED BY "public"."header"."id";



CREATE TABLE IF NOT EXISTS "public"."header_nav_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "link_type" "public"."enum_header_nav_items_link_type" DEFAULT 'reference'::"public"."enum_header_nav_items_link_type",
    "link_new_tab" boolean,
    "link_url" character varying,
    "link_label" character varying NOT NULL
);


ALTER TABLE "public"."header_nav_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."header_rels" (
    "id" integer NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "pages_id" integer
);


ALTER TABLE "public"."header_rels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."header_rels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."header_rels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."header_rels_id_seq" OWNED BY "public"."header_rels"."id";



CREATE TABLE IF NOT EXISTS "public"."media" (
    "id" integer NOT NULL,
    "alt" character varying NOT NULL,
    "caption" "jsonb",
    "_key" character varying,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "url" character varying,
    "thumbnail_u_r_l" character varying,
    "filename" character varying,
    "mime_type" character varying,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric
);


ALTER TABLE "public"."media" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."media_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."media_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."media_id_seq" OWNED BY "public"."media"."id";



CREATE TABLE IF NOT EXISTS "public"."pages" (
    "id" integer NOT NULL,
    "title" character varying,
    "hero_type" "public"."enum_pages_hero_type" DEFAULT 'lowImpact'::"public"."enum_pages_hero_type",
    "hero_pre_title" character varying,
    "hero_title" character varying,
    "hero_subtitle" character varying,
    "hero_cta_label" character varying,
    "hero_cta_url" character varying,
    "meta_title" character varying,
    "meta_image_id" integer,
    "meta_description" character varying,
    "published_at" timestamp(3) with time zone,
    "slug" character varying,
    "slug_lock" boolean DEFAULT true,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "_status" "public"."enum_pages_status" DEFAULT 'draft'::"public"."enum_pages_status"
);


ALTER TABLE "public"."pages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_archive" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "intro_content" "jsonb",
    "populate_by" "public"."enum_pages_blocks_archive_populate_by" DEFAULT 'collection'::"public"."enum_pages_blocks_archive_populate_by",
    "relation_to" "public"."enum_pages_blocks_archive_relation_to" DEFAULT 'posts'::"public"."enum_pages_blocks_archive_relation_to",
    "limit" numeric DEFAULT 10,
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_archive" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_bento4x4" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "title" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_bento4x4" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_bento4x4_cards" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL,
    "image_id" integer,
    "title" character varying,
    "description" "jsonb"
);


ALTER TABLE "public"."pages_blocks_bento4x4_cards" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_content" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_content" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_content_columns" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL,
    "size" "public"."enum_pages_blocks_content_columns_size" DEFAULT 'oneThird'::"public"."enum_pages_blocks_content_columns_size",
    "rich_text" "jsonb",
    "enable_link" boolean,
    "link_type" "public"."enum_pages_blocks_content_columns_link_type" DEFAULT 'reference'::"public"."enum_pages_blocks_content_columns_link_type",
    "link_new_tab" boolean,
    "link_url" character varying,
    "link_label" character varying,
    "link_appearance" "public"."enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default'::"public"."enum_pages_blocks_content_columns_link_appearance"
);


ALTER TABLE "public"."pages_blocks_content_columns" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_cta" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "rich_text" "jsonb",
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_cta" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_cta_links" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL,
    "link_type" "public"."enum_pages_blocks_cta_links_link_type" DEFAULT 'reference'::"public"."enum_pages_blocks_cta_links_link_type",
    "link_new_tab" boolean,
    "link_url" character varying,
    "link_label" character varying,
    "link_appearance" "public"."enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default'::"public"."enum_pages_blocks_cta_links_link_appearance"
);


ALTER TABLE "public"."pages_blocks_cta_links" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_faq" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "title" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_faq" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_faq_questions" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL,
    "question" character varying,
    "answer" "jsonb"
);


ALTER TABLE "public"."pages_blocks_faq_questions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_form_block" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "form_id" integer,
    "enable_intro" boolean,
    "intro_content" "jsonb",
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_form_block" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_horizontal_icons_group" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "pretitle" character varying,
    "title" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_horizontal_icons_group" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_horizontal_icons_group_items" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL,
    "icon" "public"."enum_pages_blocks_horizontal_icons_group_items_icon",
    "title" character varying,
    "description" "jsonb"
);


ALTER TABLE "public"."pages_blocks_horizontal_icons_group_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_image_with_info_grid" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "title" character varying,
    "subtitle" "jsonb",
    "cta_url" character varying,
    "cta_label" character varying,
    "image_id" integer,
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_image_with_info_grid" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_image_with_info_grid_items" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL,
    "title" character varying,
    "description" "jsonb"
);


ALTER TABLE "public"."pages_blocks_image_with_info_grid_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_list_aside" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "title" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_list_aside" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_list_aside_list" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL,
    "item_title" character varying,
    "item_url" character varying
);


ALTER TABLE "public"."pages_blocks_list_aside_list" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_media_block" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "position" "public"."enum_pages_blocks_media_block_position" DEFAULT 'default'::"public"."enum_pages_blocks_media_block_position",
    "media_id" integer,
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_media_block" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_popular_destinations_gallery" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "title" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_popular_destinations_gallery" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_popular_destinations_gallery_rows" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL
);


ALTER TABLE "public"."pages_blocks_popular_destinations_gallery_rows" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_popular_destinations_gallery_rows_items" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL,
    "image_id" integer,
    "title" character varying
);


ALTER TABLE "public"."pages_blocks_popular_destinations_gallery_rows_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_side_list_with_icons" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "pretitle" character varying,
    "title" character varying,
    "subtitle" "jsonb",
    "cta_url" character varying,
    "cta_label" character varying,
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_side_list_with_icons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_side_list_with_icons_items" (
    "_order" integer NOT NULL,
    "_parent_id" character varying NOT NULL,
    "id" character varying NOT NULL,
    "icon" "public"."enum_pages_blocks_side_list_with_icons_items_icon",
    "title" character varying,
    "description" "jsonb"
);


ALTER TABLE "public"."pages_blocks_side_list_with_icons_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_blocks_text_aside" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" "text" NOT NULL,
    "id" character varying NOT NULL,
    "title" character varying,
    "subtitle" character varying,
    "content" "jsonb",
    "block_name" character varying
);


ALTER TABLE "public"."pages_blocks_text_aside" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pages_hero_media_group" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "media1_id" integer,
    "media2_id" integer
);


ALTER TABLE "public"."pages_hero_media_group" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."pages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."pages_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."pages_id_seq" OWNED BY "public"."pages"."id";



CREATE TABLE IF NOT EXISTS "public"."pages_rels" (
    "id" integer NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "pages_id" integer,
    "categories_id" integer,
    "posts_id" integer
);


ALTER TABLE "public"."pages_rels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."pages_rels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."pages_rels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."pages_rels_id_seq" OWNED BY "public"."pages_rels"."id";



CREATE TABLE IF NOT EXISTS "public"."payload_locked_documents" (
    "id" integer NOT NULL,
    "global_slug" character varying,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."payload_locked_documents" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."payload_locked_documents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."payload_locked_documents_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."payload_locked_documents_id_seq" OWNED BY "public"."payload_locked_documents"."id";



CREATE TABLE IF NOT EXISTS "public"."payload_locked_documents_rels" (
    "id" integer NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "pages_id" integer,
    "posts_id" integer,
    "media_id" integer,
    "categories_id" integer,
    "users_id" integer,
    "redirects_id" integer,
    "forms_id" integer,
    "form_submissions_id" integer,
    "search_id" integer
);


ALTER TABLE "public"."payload_locked_documents_rels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."payload_locked_documents_rels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."payload_locked_documents_rels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."payload_locked_documents_rels_id_seq" OWNED BY "public"."payload_locked_documents_rels"."id";



CREATE TABLE IF NOT EXISTS "public"."payload_migrations" (
    "id" integer NOT NULL,
    "name" character varying,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."payload_migrations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."payload_migrations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."payload_migrations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."payload_migrations_id_seq" OWNED BY "public"."payload_migrations"."id";



CREATE TABLE IF NOT EXISTS "public"."payload_preferences" (
    "id" integer NOT NULL,
    "key" character varying,
    "value" "jsonb",
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."payload_preferences" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."payload_preferences_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."payload_preferences_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."payload_preferences_id_seq" OWNED BY "public"."payload_preferences"."id";



CREATE TABLE IF NOT EXISTS "public"."payload_preferences_rels" (
    "id" integer NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "users_id" integer
);


ALTER TABLE "public"."payload_preferences_rels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."payload_preferences_rels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."payload_preferences_rels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."payload_preferences_rels_id_seq" OWNED BY "public"."payload_preferences_rels"."id";



CREATE TABLE IF NOT EXISTS "public"."posts" (
    "id" integer NOT NULL,
    "title" character varying,
    "content" "jsonb",
    "meta_title" character varying,
    "meta_image_id" integer,
    "meta_description" character varying,
    "published_at" timestamp(3) with time zone,
    "slug" character varying,
    "slug_lock" boolean DEFAULT true,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "_status" "public"."enum_posts_status" DEFAULT 'draft'::"public"."enum_posts_status"
);


ALTER TABLE "public"."posts" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."posts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."posts_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."posts_id_seq" OWNED BY "public"."posts"."id";



CREATE TABLE IF NOT EXISTS "public"."posts_populated_authors" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "name" character varying
);


ALTER TABLE "public"."posts_populated_authors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."posts_rels" (
    "id" integer NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "posts_id" integer,
    "categories_id" integer,
    "users_id" integer
);


ALTER TABLE "public"."posts_rels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."posts_rels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."posts_rels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."posts_rels_id_seq" OWNED BY "public"."posts_rels"."id";



CREATE TABLE IF NOT EXISTS "public"."redirects" (
    "id" integer NOT NULL,
    "from" character varying NOT NULL,
    "to_type" "public"."enum_redirects_to_type" DEFAULT 'reference'::"public"."enum_redirects_to_type",
    "to_url" character varying,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."redirects" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."redirects_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."redirects_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."redirects_id_seq" OWNED BY "public"."redirects"."id";



CREATE TABLE IF NOT EXISTS "public"."redirects_rels" (
    "id" integer NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "pages_id" integer,
    "posts_id" integer
);


ALTER TABLE "public"."redirects_rels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."redirects_rels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."redirects_rels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."redirects_rels_id_seq" OWNED BY "public"."redirects_rels"."id";



CREATE TABLE IF NOT EXISTS "public"."search" (
    "id" integer NOT NULL,
    "title" character varying,
    "priority" numeric,
    "slug" character varying,
    "meta_title" character varying,
    "meta_description" character varying,
    "meta_image_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."search" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."search_categories" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "relation_to" character varying,
    "title" character varying
);


ALTER TABLE "public"."search_categories" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."search_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."search_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."search_id_seq" OWNED BY "public"."search"."id";



CREATE TABLE IF NOT EXISTS "public"."search_rels" (
    "id" integer NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "posts_id" integer
);


ALTER TABLE "public"."search_rels" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."search_rels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."search_rels_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."search_rels_id_seq" OWNED BY "public"."search_rels"."id";



CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" integer NOT NULL,
    "name" character varying,
    "updated_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT "now"() NOT NULL,
    "email" character varying NOT NULL,
    "reset_password_token" character varying,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" character varying,
    "hash" character varying,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."users_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";



ALTER TABLE ONLY "public"."_pages_v" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_archive" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_archive_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_bento4x4" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_bento4x4_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_bento4x4_cards" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_bento4x4_cards_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_content" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_content_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_content_columns" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_content_columns_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_cta" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_cta_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_cta_links" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_cta_links_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_faq" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_faq_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_faq_questions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_faq_questions_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_form_block" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_form_block_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_horizontal_icons_group" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_horizontal_icons_group_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_horizontal_icons_group_items" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_horizontal_icons_group_items_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_image_with_info_grid" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_image_with_info_grid_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_image_with_info_grid_items" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_image_with_info_grid_items_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_list_aside" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_list_aside_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_list_aside_list" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_list_aside_list_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_media_block" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_media_block_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_popular_destinations_gallery" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_popular_destinations_gallery_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_popular_destinations_gallery_rows" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_popular_destinations_gallery_rows_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_popular_destinations_gallery_rows_items" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_popular_destinations_gallery_rows_items_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_side_list_with_icons" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_side_list_with_icons_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_side_list_with_icons_items" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_side_list_with_icons_items_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_text_aside" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_blocks_text_aside_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_rels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_rels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_version_hero_media_group" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_pages_v_version_hero_media_group_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_posts_v" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_posts_v_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_posts_v_rels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_posts_v_rels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_posts_v_version_populated_authors" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."_posts_v_version_populated_authors_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."categories" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."categories_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."footer" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."footer_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."footer_rels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."footer_rels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."form_submissions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."form_submissions_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."forms" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."forms_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."header" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."header_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."header_rels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."header_rels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."media" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."media_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."pages" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."pages_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."pages_rels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."pages_rels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."payload_locked_documents" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."payload_locked_documents_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."payload_locked_documents_rels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."payload_locked_documents_rels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."payload_migrations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."payload_migrations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."payload_preferences" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."payload_preferences_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."payload_preferences_rels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."payload_preferences_rels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."posts" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."posts_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."posts_rels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."posts_rels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."redirects" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."redirects_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."redirects_rels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."redirects_rels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."search" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."search_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."search_rels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."search_rels_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."_pages_v_blocks_archive"
    ADD CONSTRAINT "_pages_v_blocks_archive_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_bento4x4_cards"
    ADD CONSTRAINT "_pages_v_blocks_bento4x4_cards_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_bento4x4"
    ADD CONSTRAINT "_pages_v_blocks_bento4x4_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_content_columns"
    ADD CONSTRAINT "_pages_v_blocks_content_columns_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_content"
    ADD CONSTRAINT "_pages_v_blocks_content_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_cta_links"
    ADD CONSTRAINT "_pages_v_blocks_cta_links_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_cta"
    ADD CONSTRAINT "_pages_v_blocks_cta_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_faq"
    ADD CONSTRAINT "_pages_v_blocks_faq_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_faq_questions"
    ADD CONSTRAINT "_pages_v_blocks_faq_questions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_form_block"
    ADD CONSTRAINT "_pages_v_blocks_form_block_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_horizontal_icons_group_items"
    ADD CONSTRAINT "_pages_v_blocks_horizontal_icons_group_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_horizontal_icons_group"
    ADD CONSTRAINT "_pages_v_blocks_horizontal_icons_group_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_image_with_info_grid_items"
    ADD CONSTRAINT "_pages_v_blocks_image_with_info_grid_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_image_with_info_grid"
    ADD CONSTRAINT "_pages_v_blocks_image_with_info_grid_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_list_aside_list"
    ADD CONSTRAINT "_pages_v_blocks_list_aside_list_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_list_aside"
    ADD CONSTRAINT "_pages_v_blocks_list_aside_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_media_block"
    ADD CONSTRAINT "_pages_v_blocks_media_block_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_popular_destinations_gallery"
    ADD CONSTRAINT "_pages_v_blocks_popular_destinations_gallery_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_popular_destinations_gallery_rows_items"
    ADD CONSTRAINT "_pages_v_blocks_popular_destinations_gallery_rows_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_popular_destinations_gallery_rows"
    ADD CONSTRAINT "_pages_v_blocks_popular_destinations_gallery_rows_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_side_list_with_icons_items"
    ADD CONSTRAINT "_pages_v_blocks_side_list_with_icons_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_side_list_with_icons"
    ADD CONSTRAINT "_pages_v_blocks_side_list_with_icons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_blocks_text_aside"
    ADD CONSTRAINT "_pages_v_blocks_text_aside_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v"
    ADD CONSTRAINT "_pages_v_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_rels"
    ADD CONSTRAINT "_pages_v_rels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_pages_v_version_hero_media_group"
    ADD CONSTRAINT "_pages_v_version_hero_media_group_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_posts_v"
    ADD CONSTRAINT "_posts_v_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_posts_v_rels"
    ADD CONSTRAINT "_posts_v_rels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_posts_v_version_populated_authors"
    ADD CONSTRAINT "_posts_v_version_populated_authors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."categories_breadcrumbs"
    ADD CONSTRAINT "categories_breadcrumbs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."footer_legal_links"
    ADD CONSTRAINT "footer_legal_links_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."footer_nav_items"
    ADD CONSTRAINT "footer_nav_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."footer"
    ADD CONSTRAINT "footer_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."footer_rels"
    ADD CONSTRAINT "footer_rels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."footer_right_nav_items"
    ADD CONSTRAINT "footer_right_nav_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."form_submissions"
    ADD CONSTRAINT "form_submissions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."form_submissions_submission_data"
    ADD CONSTRAINT "form_submissions_submission_data_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_blocks_checkbox"
    ADD CONSTRAINT "forms_blocks_checkbox_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_blocks_country"
    ADD CONSTRAINT "forms_blocks_country_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_blocks_email"
    ADD CONSTRAINT "forms_blocks_email_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_blocks_message"
    ADD CONSTRAINT "forms_blocks_message_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_blocks_number"
    ADD CONSTRAINT "forms_blocks_number_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_blocks_select_options"
    ADD CONSTRAINT "forms_blocks_select_options_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_blocks_select"
    ADD CONSTRAINT "forms_blocks_select_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_blocks_state"
    ADD CONSTRAINT "forms_blocks_state_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_blocks_text"
    ADD CONSTRAINT "forms_blocks_text_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_blocks_textarea"
    ADD CONSTRAINT "forms_blocks_textarea_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms_emails"
    ADD CONSTRAINT "forms_emails_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms"
    ADD CONSTRAINT "forms_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."header_nav_items"
    ADD CONSTRAINT "header_nav_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."header"
    ADD CONSTRAINT "header_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."header_rels"
    ADD CONSTRAINT "header_rels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."media"
    ADD CONSTRAINT "media_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_archive"
    ADD CONSTRAINT "pages_blocks_archive_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_bento4x4_cards"
    ADD CONSTRAINT "pages_blocks_bento4x4_cards_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_bento4x4"
    ADD CONSTRAINT "pages_blocks_bento4x4_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_content_columns"
    ADD CONSTRAINT "pages_blocks_content_columns_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_content"
    ADD CONSTRAINT "pages_blocks_content_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_cta_links"
    ADD CONSTRAINT "pages_blocks_cta_links_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_cta"
    ADD CONSTRAINT "pages_blocks_cta_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_faq"
    ADD CONSTRAINT "pages_blocks_faq_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_faq_questions"
    ADD CONSTRAINT "pages_blocks_faq_questions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_form_block"
    ADD CONSTRAINT "pages_blocks_form_block_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_horizontal_icons_group_items"
    ADD CONSTRAINT "pages_blocks_horizontal_icons_group_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_horizontal_icons_group"
    ADD CONSTRAINT "pages_blocks_horizontal_icons_group_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_image_with_info_grid_items"
    ADD CONSTRAINT "pages_blocks_image_with_info_grid_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_image_with_info_grid"
    ADD CONSTRAINT "pages_blocks_image_with_info_grid_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_list_aside_list"
    ADD CONSTRAINT "pages_blocks_list_aside_list_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_list_aside"
    ADD CONSTRAINT "pages_blocks_list_aside_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_media_block"
    ADD CONSTRAINT "pages_blocks_media_block_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_popular_destinations_gallery"
    ADD CONSTRAINT "pages_blocks_popular_destinations_gallery_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_popular_destinations_gallery_rows_items"
    ADD CONSTRAINT "pages_blocks_popular_destinations_gallery_rows_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_popular_destinations_gallery_rows"
    ADD CONSTRAINT "pages_blocks_popular_destinations_gallery_rows_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_side_list_with_icons_items"
    ADD CONSTRAINT "pages_blocks_side_list_with_icons_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_side_list_with_icons"
    ADD CONSTRAINT "pages_blocks_side_list_with_icons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_blocks_text_aside"
    ADD CONSTRAINT "pages_blocks_text_aside_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_hero_media_group"
    ADD CONSTRAINT "pages_hero_media_group_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages"
    ADD CONSTRAINT "pages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pages_rels"
    ADD CONSTRAINT "pages_rels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payload_locked_documents"
    ADD CONSTRAINT "payload_locked_documents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payload_migrations"
    ADD CONSTRAINT "payload_migrations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payload_preferences"
    ADD CONSTRAINT "payload_preferences_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payload_preferences_rels"
    ADD CONSTRAINT "payload_preferences_rels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."posts_populated_authors"
    ADD CONSTRAINT "posts_populated_authors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."posts_rels"
    ADD CONSTRAINT "posts_rels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."redirects"
    ADD CONSTRAINT "redirects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."redirects_rels"
    ADD CONSTRAINT "redirects_rels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."search_categories"
    ADD CONSTRAINT "search_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."search"
    ADD CONSTRAINT "search_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."search_rels"
    ADD CONSTRAINT "search_rels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE INDEX "_pages_v_autosave_2_idx" ON "public"."_pages_v" USING "btree" ("autosave");



CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "public"."_pages_v_blocks_archive" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "public"."_pages_v_blocks_archive" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "public"."_pages_v_blocks_archive" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_bento4x4_cards_image_2_idx" ON "public"."_pages_v_blocks_bento4x4_cards" USING "btree" ("image_id");



CREATE INDEX "_pages_v_blocks_bento4x4_cards_order_idx" ON "public"."_pages_v_blocks_bento4x4_cards" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_bento4x4_cards_parent_id_idx" ON "public"."_pages_v_blocks_bento4x4_cards" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_bento4x4_order_idx" ON "public"."_pages_v_blocks_bento4x4" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_bento4x4_parent_id_idx" ON "public"."_pages_v_blocks_bento4x4" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_bento4x4_path_idx" ON "public"."_pages_v_blocks_bento4x4" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "public"."_pages_v_blocks_content_columns" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "public"."_pages_v_blocks_content_columns" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_content_order_idx" ON "public"."_pages_v_blocks_content" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "public"."_pages_v_blocks_content" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_content_path_idx" ON "public"."_pages_v_blocks_content" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "public"."_pages_v_blocks_cta_links" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "public"."_pages_v_blocks_cta_links" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "public"."_pages_v_blocks_cta" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "public"."_pages_v_blocks_cta" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "public"."_pages_v_blocks_cta" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "public"."_pages_v_blocks_faq" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "public"."_pages_v_blocks_faq" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "public"."_pages_v_blocks_faq" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_faq_questions_order_idx" ON "public"."_pages_v_blocks_faq_questions" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_faq_questions_parent_id_idx" ON "public"."_pages_v_blocks_faq_questions" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_form_block_form_2_idx" ON "public"."_pages_v_blocks_form_block" USING "btree" ("form_id");



CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "public"."_pages_v_blocks_form_block" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "public"."_pages_v_blocks_form_block" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "public"."_pages_v_blocks_form_block" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_horizontal_icons_group_items_order_idx" ON "public"."_pages_v_blocks_horizontal_icons_group_items" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_horizontal_icons_group_items_parent_id_idx" ON "public"."_pages_v_blocks_horizontal_icons_group_items" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_horizontal_icons_group_order_idx" ON "public"."_pages_v_blocks_horizontal_icons_group" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_horizontal_icons_group_parent_id_idx" ON "public"."_pages_v_blocks_horizontal_icons_group" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_horizontal_icons_group_path_idx" ON "public"."_pages_v_blocks_horizontal_icons_group" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_image_with_info_grid_image_2_idx" ON "public"."_pages_v_blocks_image_with_info_grid" USING "btree" ("image_id");



CREATE INDEX "_pages_v_blocks_image_with_info_grid_items_order_idx" ON "public"."_pages_v_blocks_image_with_info_grid_items" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_image_with_info_grid_items_parent_id_idx" ON "public"."_pages_v_blocks_image_with_info_grid_items" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_image_with_info_grid_order_idx" ON "public"."_pages_v_blocks_image_with_info_grid" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_image_with_info_grid_parent_id_idx" ON "public"."_pages_v_blocks_image_with_info_grid" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_image_with_info_grid_path_idx" ON "public"."_pages_v_blocks_image_with_info_grid" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_list_aside_list_order_idx" ON "public"."_pages_v_blocks_list_aside_list" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_list_aside_list_parent_id_idx" ON "public"."_pages_v_blocks_list_aside_list" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_list_aside_order_idx" ON "public"."_pages_v_blocks_list_aside" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_list_aside_parent_id_idx" ON "public"."_pages_v_blocks_list_aside" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_list_aside_path_idx" ON "public"."_pages_v_blocks_list_aside" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_media_block_media_2_idx" ON "public"."_pages_v_blocks_media_block" USING "btree" ("media_id");



CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "public"."_pages_v_blocks_media_block" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "public"."_pages_v_blocks_media_block" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "public"."_pages_v_blocks_media_block" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_popular_destinations_gallery_order_idx" ON "public"."_pages_v_blocks_popular_destinations_gallery" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_popular_destinations_gallery_parent_id_idx" ON "public"."_pages_v_blocks_popular_destinations_gallery" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_popular_destinations_gallery_path_idx" ON "public"."_pages_v_blocks_popular_destinations_gallery" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_popular_destinations_gallery_rows_items_image_2" ON "public"."_pages_v_blocks_popular_destinations_gallery_rows_items" USING "btree" ("image_id");



CREATE INDEX "_pages_v_blocks_popular_destinations_gallery_rows_items_order_i" ON "public"."_pages_v_blocks_popular_destinations_gallery_rows_items" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_popular_destinations_gallery_rows_items_parent_" ON "public"."_pages_v_blocks_popular_destinations_gallery_rows_items" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_popular_destinations_gallery_rows_order_idx" ON "public"."_pages_v_blocks_popular_destinations_gallery_rows" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_popular_destinations_gallery_rows_parent_id_idx" ON "public"."_pages_v_blocks_popular_destinations_gallery_rows" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_side_list_with_icons_items_order_idx" ON "public"."_pages_v_blocks_side_list_with_icons_items" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_side_list_with_icons_items_parent_id_idx" ON "public"."_pages_v_blocks_side_list_with_icons_items" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_side_list_with_icons_order_idx" ON "public"."_pages_v_blocks_side_list_with_icons" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_side_list_with_icons_parent_id_idx" ON "public"."_pages_v_blocks_side_list_with_icons" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_side_list_with_icons_path_idx" ON "public"."_pages_v_blocks_side_list_with_icons" USING "btree" ("_path");



CREATE INDEX "_pages_v_blocks_text_aside_order_idx" ON "public"."_pages_v_blocks_text_aside" USING "btree" ("_order");



CREATE INDEX "_pages_v_blocks_text_aside_parent_id_idx" ON "public"."_pages_v_blocks_text_aside" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_blocks_text_aside_path_idx" ON "public"."_pages_v_blocks_text_aside" USING "btree" ("_path");



CREATE INDEX "_pages_v_created_at_2_idx" ON "public"."_pages_v" USING "btree" ("created_at");



CREATE INDEX "_pages_v_latest_2_idx" ON "public"."_pages_v" USING "btree" ("latest");



CREATE INDEX "_pages_v_parent_2_idx" ON "public"."_pages_v" USING "btree" ("parent_id");



CREATE INDEX "_pages_v_rels_categories_id_2_idx" ON "public"."_pages_v_rels" USING "btree" ("categories_id");



CREATE INDEX "_pages_v_rels_order_idx" ON "public"."_pages_v_rels" USING "btree" ("order");



CREATE INDEX "_pages_v_rels_pages_id_2_idx" ON "public"."_pages_v_rels" USING "btree" ("pages_id");



CREATE INDEX "_pages_v_rels_parent_idx" ON "public"."_pages_v_rels" USING "btree" ("parent_id");



CREATE INDEX "_pages_v_rels_path_idx" ON "public"."_pages_v_rels" USING "btree" ("path");



CREATE INDEX "_pages_v_rels_posts_id_2_idx" ON "public"."_pages_v_rels" USING "btree" ("posts_id");



CREATE INDEX "_pages_v_updated_at_2_idx" ON "public"."_pages_v" USING "btree" ("updated_at");



CREATE INDEX "_pages_v_version_hero_media_group_media1_2_idx" ON "public"."_pages_v_version_hero_media_group" USING "btree" ("media1_id");



CREATE INDEX "_pages_v_version_hero_media_group_media2_2_idx" ON "public"."_pages_v_version_hero_media_group" USING "btree" ("media2_id");



CREATE INDEX "_pages_v_version_hero_media_group_order_idx" ON "public"."_pages_v_version_hero_media_group" USING "btree" ("_order");



CREATE INDEX "_pages_v_version_hero_media_group_parent_id_idx" ON "public"."_pages_v_version_hero_media_group" USING "btree" ("_parent_id");



CREATE INDEX "_pages_v_version_meta_version_meta_image_2_idx" ON "public"."_pages_v" USING "btree" ("version_meta_image_id");



CREATE INDEX "_pages_v_version_version__status_2_idx" ON "public"."_pages_v" USING "btree" ("version__status");



CREATE INDEX "_pages_v_version_version_created_at_2_idx" ON "public"."_pages_v" USING "btree" ("version_created_at");



CREATE INDEX "_pages_v_version_version_slug_2_idx" ON "public"."_pages_v" USING "btree" ("version_slug");



CREATE INDEX "_pages_v_version_version_updated_at_2_idx" ON "public"."_pages_v" USING "btree" ("version_updated_at");



CREATE INDEX "_posts_v_autosave_2_idx" ON "public"."_posts_v" USING "btree" ("autosave");



CREATE INDEX "_posts_v_created_at_2_idx" ON "public"."_posts_v" USING "btree" ("created_at");



CREATE INDEX "_posts_v_latest_2_idx" ON "public"."_posts_v" USING "btree" ("latest");



CREATE INDEX "_posts_v_parent_2_idx" ON "public"."_posts_v" USING "btree" ("parent_id");



CREATE INDEX "_posts_v_rels_categories_id_2_idx" ON "public"."_posts_v_rels" USING "btree" ("categories_id");



CREATE INDEX "_posts_v_rels_order_idx" ON "public"."_posts_v_rels" USING "btree" ("order");



CREATE INDEX "_posts_v_rels_parent_idx" ON "public"."_posts_v_rels" USING "btree" ("parent_id");



CREATE INDEX "_posts_v_rels_path_idx" ON "public"."_posts_v_rels" USING "btree" ("path");



CREATE INDEX "_posts_v_rels_posts_id_2_idx" ON "public"."_posts_v_rels" USING "btree" ("posts_id");



CREATE INDEX "_posts_v_rels_users_id_2_idx" ON "public"."_posts_v_rels" USING "btree" ("users_id");



CREATE INDEX "_posts_v_updated_at_2_idx" ON "public"."_posts_v" USING "btree" ("updated_at");



CREATE INDEX "_posts_v_version_meta_version_meta_image_2_idx" ON "public"."_posts_v" USING "btree" ("version_meta_image_id");



CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "public"."_posts_v_version_populated_authors" USING "btree" ("_order");



CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "public"."_posts_v_version_populated_authors" USING "btree" ("_parent_id");



CREATE INDEX "_posts_v_version_version__status_2_idx" ON "public"."_posts_v" USING "btree" ("version__status");



CREATE INDEX "_posts_v_version_version_created_at_2_idx" ON "public"."_posts_v" USING "btree" ("version_created_at");



CREATE INDEX "_posts_v_version_version_slug_2_idx" ON "public"."_posts_v" USING "btree" ("version_slug");



CREATE INDEX "_posts_v_version_version_updated_at_2_idx" ON "public"."_posts_v" USING "btree" ("version_updated_at");



CREATE INDEX "categories_breadcrumbs_doc_2_idx" ON "public"."categories_breadcrumbs" USING "btree" ("doc_id");



CREATE INDEX "categories_breadcrumbs_order_idx" ON "public"."categories_breadcrumbs" USING "btree" ("_order");



CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "public"."categories_breadcrumbs" USING "btree" ("_parent_id");



CREATE INDEX "categories_created_at_2_idx" ON "public"."categories" USING "btree" ("created_at");



CREATE INDEX "categories_parent_2_idx" ON "public"."categories" USING "btree" ("parent_id");



CREATE INDEX "categories_updated_at_2_idx" ON "public"."categories" USING "btree" ("updated_at");



CREATE INDEX "footer_legal_links_order_idx" ON "public"."footer_legal_links" USING "btree" ("_order");



CREATE INDEX "footer_legal_links_parent_id_idx" ON "public"."footer_legal_links" USING "btree" ("_parent_id");



CREATE INDEX "footer_nav_items_order_idx" ON "public"."footer_nav_items" USING "btree" ("_order");



CREATE INDEX "footer_nav_items_parent_id_idx" ON "public"."footer_nav_items" USING "btree" ("_parent_id");



CREATE INDEX "footer_rels_order_idx" ON "public"."footer_rels" USING "btree" ("order");



CREATE INDEX "footer_rels_pages_id_2_idx" ON "public"."footer_rels" USING "btree" ("pages_id");



CREATE INDEX "footer_rels_parent_idx" ON "public"."footer_rels" USING "btree" ("parent_id");



CREATE INDEX "footer_rels_path_idx" ON "public"."footer_rels" USING "btree" ("path");



CREATE INDEX "footer_right_nav_items_order_idx" ON "public"."footer_right_nav_items" USING "btree" ("_order");



CREATE INDEX "footer_right_nav_items_parent_id_idx" ON "public"."footer_right_nav_items" USING "btree" ("_parent_id");



CREATE INDEX "form_submissions_created_at_2_idx" ON "public"."form_submissions" USING "btree" ("created_at");



CREATE INDEX "form_submissions_form_2_idx" ON "public"."form_submissions" USING "btree" ("form_id");



CREATE INDEX "form_submissions_submission_data_order_idx" ON "public"."form_submissions_submission_data" USING "btree" ("_order");



CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "public"."form_submissions_submission_data" USING "btree" ("_parent_id");



CREATE INDEX "form_submissions_updated_at_2_idx" ON "public"."form_submissions" USING "btree" ("updated_at");



CREATE INDEX "forms_blocks_checkbox_order_idx" ON "public"."forms_blocks_checkbox" USING "btree" ("_order");



CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "public"."forms_blocks_checkbox" USING "btree" ("_parent_id");



CREATE INDEX "forms_blocks_checkbox_path_idx" ON "public"."forms_blocks_checkbox" USING "btree" ("_path");



CREATE INDEX "forms_blocks_country_order_idx" ON "public"."forms_blocks_country" USING "btree" ("_order");



CREATE INDEX "forms_blocks_country_parent_id_idx" ON "public"."forms_blocks_country" USING "btree" ("_parent_id");



CREATE INDEX "forms_blocks_country_path_idx" ON "public"."forms_blocks_country" USING "btree" ("_path");



CREATE INDEX "forms_blocks_email_order_idx" ON "public"."forms_blocks_email" USING "btree" ("_order");



CREATE INDEX "forms_blocks_email_parent_id_idx" ON "public"."forms_blocks_email" USING "btree" ("_parent_id");



CREATE INDEX "forms_blocks_email_path_idx" ON "public"."forms_blocks_email" USING "btree" ("_path");



CREATE INDEX "forms_blocks_message_order_idx" ON "public"."forms_blocks_message" USING "btree" ("_order");



CREATE INDEX "forms_blocks_message_parent_id_idx" ON "public"."forms_blocks_message" USING "btree" ("_parent_id");



CREATE INDEX "forms_blocks_message_path_idx" ON "public"."forms_blocks_message" USING "btree" ("_path");



CREATE INDEX "forms_blocks_number_order_idx" ON "public"."forms_blocks_number" USING "btree" ("_order");



CREATE INDEX "forms_blocks_number_parent_id_idx" ON "public"."forms_blocks_number" USING "btree" ("_parent_id");



CREATE INDEX "forms_blocks_number_path_idx" ON "public"."forms_blocks_number" USING "btree" ("_path");



CREATE INDEX "forms_blocks_select_options_order_idx" ON "public"."forms_blocks_select_options" USING "btree" ("_order");



CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "public"."forms_blocks_select_options" USING "btree" ("_parent_id");



CREATE INDEX "forms_blocks_select_order_idx" ON "public"."forms_blocks_select" USING "btree" ("_order");



CREATE INDEX "forms_blocks_select_parent_id_idx" ON "public"."forms_blocks_select" USING "btree" ("_parent_id");



CREATE INDEX "forms_blocks_select_path_idx" ON "public"."forms_blocks_select" USING "btree" ("_path");



CREATE INDEX "forms_blocks_state_order_idx" ON "public"."forms_blocks_state" USING "btree" ("_order");



CREATE INDEX "forms_blocks_state_parent_id_idx" ON "public"."forms_blocks_state" USING "btree" ("_parent_id");



CREATE INDEX "forms_blocks_state_path_idx" ON "public"."forms_blocks_state" USING "btree" ("_path");



CREATE INDEX "forms_blocks_text_order_idx" ON "public"."forms_blocks_text" USING "btree" ("_order");



CREATE INDEX "forms_blocks_text_parent_id_idx" ON "public"."forms_blocks_text" USING "btree" ("_parent_id");



CREATE INDEX "forms_blocks_text_path_idx" ON "public"."forms_blocks_text" USING "btree" ("_path");



CREATE INDEX "forms_blocks_textarea_order_idx" ON "public"."forms_blocks_textarea" USING "btree" ("_order");



CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "public"."forms_blocks_textarea" USING "btree" ("_parent_id");



CREATE INDEX "forms_blocks_textarea_path_idx" ON "public"."forms_blocks_textarea" USING "btree" ("_path");



CREATE INDEX "forms_created_at_2_idx" ON "public"."forms" USING "btree" ("created_at");



CREATE INDEX "forms_emails_order_idx" ON "public"."forms_emails" USING "btree" ("_order");



CREATE INDEX "forms_emails_parent_id_idx" ON "public"."forms_emails" USING "btree" ("_parent_id");



CREATE INDEX "forms_updated_at_2_idx" ON "public"."forms" USING "btree" ("updated_at");



CREATE INDEX "header_nav_items_order_idx" ON "public"."header_nav_items" USING "btree" ("_order");



CREATE INDEX "header_nav_items_parent_id_idx" ON "public"."header_nav_items" USING "btree" ("_parent_id");



CREATE INDEX "header_rels_order_idx" ON "public"."header_rels" USING "btree" ("order");



CREATE INDEX "header_rels_pages_id_2_idx" ON "public"."header_rels" USING "btree" ("pages_id");



CREATE INDEX "header_rels_parent_idx" ON "public"."header_rels" USING "btree" ("parent_id");



CREATE INDEX "header_rels_path_idx" ON "public"."header_rels" USING "btree" ("path");



CREATE INDEX "media_created_at_2_idx" ON "public"."media" USING "btree" ("created_at");



CREATE UNIQUE INDEX "media_filename_2_idx" ON "public"."media" USING "btree" ("filename");



CREATE INDEX "media_updated_at_2_idx" ON "public"."media" USING "btree" ("updated_at");



CREATE INDEX "pages__status_2_idx" ON "public"."pages" USING "btree" ("_status");



CREATE INDEX "pages_blocks_archive_order_idx" ON "public"."pages_blocks_archive" USING "btree" ("_order");



CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "public"."pages_blocks_archive" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_archive_path_idx" ON "public"."pages_blocks_archive" USING "btree" ("_path");



CREATE INDEX "pages_blocks_bento4x4_cards_image_2_idx" ON "public"."pages_blocks_bento4x4_cards" USING "btree" ("image_id");



CREATE INDEX "pages_blocks_bento4x4_cards_order_idx" ON "public"."pages_blocks_bento4x4_cards" USING "btree" ("_order");



CREATE INDEX "pages_blocks_bento4x4_cards_parent_id_idx" ON "public"."pages_blocks_bento4x4_cards" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_bento4x4_order_idx" ON "public"."pages_blocks_bento4x4" USING "btree" ("_order");



CREATE INDEX "pages_blocks_bento4x4_parent_id_idx" ON "public"."pages_blocks_bento4x4" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_bento4x4_path_idx" ON "public"."pages_blocks_bento4x4" USING "btree" ("_path");



CREATE INDEX "pages_blocks_content_columns_order_idx" ON "public"."pages_blocks_content_columns" USING "btree" ("_order");



CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "public"."pages_blocks_content_columns" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_content_order_idx" ON "public"."pages_blocks_content" USING "btree" ("_order");



CREATE INDEX "pages_blocks_content_parent_id_idx" ON "public"."pages_blocks_content" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_content_path_idx" ON "public"."pages_blocks_content" USING "btree" ("_path");



CREATE INDEX "pages_blocks_cta_links_order_idx" ON "public"."pages_blocks_cta_links" USING "btree" ("_order");



CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "public"."pages_blocks_cta_links" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_cta_order_idx" ON "public"."pages_blocks_cta" USING "btree" ("_order");



CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "public"."pages_blocks_cta" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_cta_path_idx" ON "public"."pages_blocks_cta" USING "btree" ("_path");



CREATE INDEX "pages_blocks_faq_order_idx" ON "public"."pages_blocks_faq" USING "btree" ("_order");



CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "public"."pages_blocks_faq" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_faq_path_idx" ON "public"."pages_blocks_faq" USING "btree" ("_path");



CREATE INDEX "pages_blocks_faq_questions_order_idx" ON "public"."pages_blocks_faq_questions" USING "btree" ("_order");



CREATE INDEX "pages_blocks_faq_questions_parent_id_idx" ON "public"."pages_blocks_faq_questions" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_form_block_form_2_idx" ON "public"."pages_blocks_form_block" USING "btree" ("form_id");



CREATE INDEX "pages_blocks_form_block_order_idx" ON "public"."pages_blocks_form_block" USING "btree" ("_order");



CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "public"."pages_blocks_form_block" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_form_block_path_idx" ON "public"."pages_blocks_form_block" USING "btree" ("_path");



CREATE INDEX "pages_blocks_horizontal_icons_group_items_order_idx" ON "public"."pages_blocks_horizontal_icons_group_items" USING "btree" ("_order");



CREATE INDEX "pages_blocks_horizontal_icons_group_items_parent_id_idx" ON "public"."pages_blocks_horizontal_icons_group_items" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_horizontal_icons_group_order_idx" ON "public"."pages_blocks_horizontal_icons_group" USING "btree" ("_order");



CREATE INDEX "pages_blocks_horizontal_icons_group_parent_id_idx" ON "public"."pages_blocks_horizontal_icons_group" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_horizontal_icons_group_path_idx" ON "public"."pages_blocks_horizontal_icons_group" USING "btree" ("_path");



CREATE INDEX "pages_blocks_image_with_info_grid_image_2_idx" ON "public"."pages_blocks_image_with_info_grid" USING "btree" ("image_id");



CREATE INDEX "pages_blocks_image_with_info_grid_items_order_idx" ON "public"."pages_blocks_image_with_info_grid_items" USING "btree" ("_order");



CREATE INDEX "pages_blocks_image_with_info_grid_items_parent_id_idx" ON "public"."pages_blocks_image_with_info_grid_items" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_image_with_info_grid_order_idx" ON "public"."pages_blocks_image_with_info_grid" USING "btree" ("_order");



CREATE INDEX "pages_blocks_image_with_info_grid_parent_id_idx" ON "public"."pages_blocks_image_with_info_grid" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_image_with_info_grid_path_idx" ON "public"."pages_blocks_image_with_info_grid" USING "btree" ("_path");



CREATE INDEX "pages_blocks_list_aside_list_order_idx" ON "public"."pages_blocks_list_aside_list" USING "btree" ("_order");



CREATE INDEX "pages_blocks_list_aside_list_parent_id_idx" ON "public"."pages_blocks_list_aside_list" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_list_aside_order_idx" ON "public"."pages_blocks_list_aside" USING "btree" ("_order");



CREATE INDEX "pages_blocks_list_aside_parent_id_idx" ON "public"."pages_blocks_list_aside" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_list_aside_path_idx" ON "public"."pages_blocks_list_aside" USING "btree" ("_path");



CREATE INDEX "pages_blocks_media_block_media_2_idx" ON "public"."pages_blocks_media_block" USING "btree" ("media_id");



CREATE INDEX "pages_blocks_media_block_order_idx" ON "public"."pages_blocks_media_block" USING "btree" ("_order");



CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "public"."pages_blocks_media_block" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_media_block_path_idx" ON "public"."pages_blocks_media_block" USING "btree" ("_path");



CREATE INDEX "pages_blocks_popular_destinations_gallery_order_idx" ON "public"."pages_blocks_popular_destinations_gallery" USING "btree" ("_order");



CREATE INDEX "pages_blocks_popular_destinations_gallery_parent_id_idx" ON "public"."pages_blocks_popular_destinations_gallery" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_popular_destinations_gallery_path_idx" ON "public"."pages_blocks_popular_destinations_gallery" USING "btree" ("_path");



CREATE INDEX "pages_blocks_popular_destinations_gallery_rows_items_image_2_id" ON "public"."pages_blocks_popular_destinations_gallery_rows_items" USING "btree" ("image_id");



CREATE INDEX "pages_blocks_popular_destinations_gallery_rows_items_order_idx" ON "public"."pages_blocks_popular_destinations_gallery_rows_items" USING "btree" ("_order");



CREATE INDEX "pages_blocks_popular_destinations_gallery_rows_items_parent_id_" ON "public"."pages_blocks_popular_destinations_gallery_rows_items" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_popular_destinations_gallery_rows_order_idx" ON "public"."pages_blocks_popular_destinations_gallery_rows" USING "btree" ("_order");



CREATE INDEX "pages_blocks_popular_destinations_gallery_rows_parent_id_idx" ON "public"."pages_blocks_popular_destinations_gallery_rows" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_side_list_with_icons_items_order_idx" ON "public"."pages_blocks_side_list_with_icons_items" USING "btree" ("_order");



CREATE INDEX "pages_blocks_side_list_with_icons_items_parent_id_idx" ON "public"."pages_blocks_side_list_with_icons_items" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_side_list_with_icons_order_idx" ON "public"."pages_blocks_side_list_with_icons" USING "btree" ("_order");



CREATE INDEX "pages_blocks_side_list_with_icons_parent_id_idx" ON "public"."pages_blocks_side_list_with_icons" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_side_list_with_icons_path_idx" ON "public"."pages_blocks_side_list_with_icons" USING "btree" ("_path");



CREATE INDEX "pages_blocks_text_aside_order_idx" ON "public"."pages_blocks_text_aside" USING "btree" ("_order");



CREATE INDEX "pages_blocks_text_aside_parent_id_idx" ON "public"."pages_blocks_text_aside" USING "btree" ("_parent_id");



CREATE INDEX "pages_blocks_text_aside_path_idx" ON "public"."pages_blocks_text_aside" USING "btree" ("_path");



CREATE INDEX "pages_created_at_2_idx" ON "public"."pages" USING "btree" ("created_at");



CREATE INDEX "pages_hero_media_group_media1_2_idx" ON "public"."pages_hero_media_group" USING "btree" ("media1_id");



CREATE INDEX "pages_hero_media_group_media2_2_idx" ON "public"."pages_hero_media_group" USING "btree" ("media2_id");



CREATE INDEX "pages_hero_media_group_order_idx" ON "public"."pages_hero_media_group" USING "btree" ("_order");



CREATE INDEX "pages_hero_media_group_parent_id_idx" ON "public"."pages_hero_media_group" USING "btree" ("_parent_id");



CREATE INDEX "pages_meta_meta_image_2_idx" ON "public"."pages" USING "btree" ("meta_image_id");



CREATE INDEX "pages_rels_categories_id_2_idx" ON "public"."pages_rels" USING "btree" ("categories_id");



CREATE INDEX "pages_rels_order_idx" ON "public"."pages_rels" USING "btree" ("order");



CREATE INDEX "pages_rels_pages_id_2_idx" ON "public"."pages_rels" USING "btree" ("pages_id");



CREATE INDEX "pages_rels_parent_idx" ON "public"."pages_rels" USING "btree" ("parent_id");



CREATE INDEX "pages_rels_path_idx" ON "public"."pages_rels" USING "btree" ("path");



CREATE INDEX "pages_rels_posts_id_2_idx" ON "public"."pages_rels" USING "btree" ("posts_id");



CREATE INDEX "pages_slug_2_idx" ON "public"."pages" USING "btree" ("slug");



CREATE INDEX "pages_updated_at_2_idx" ON "public"."pages" USING "btree" ("updated_at");



CREATE INDEX "payload_locked_documents_created_at_2_idx" ON "public"."payload_locked_documents" USING "btree" ("created_at");



CREATE INDEX "payload_locked_documents_global_slug_2_idx" ON "public"."payload_locked_documents" USING "btree" ("global_slug");



CREATE INDEX "payload_locked_documents_rels_categories_id_2_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("categories_id");



CREATE INDEX "payload_locked_documents_rels_form_submissions_id_2_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("form_submissions_id");



CREATE INDEX "payload_locked_documents_rels_forms_id_2_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("forms_id");



CREATE INDEX "payload_locked_documents_rels_media_id_2_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("media_id");



CREATE INDEX "payload_locked_documents_rels_order_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("order");



CREATE INDEX "payload_locked_documents_rels_pages_id_2_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("pages_id");



CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("parent_id");



CREATE INDEX "payload_locked_documents_rels_path_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("path");



CREATE INDEX "payload_locked_documents_rels_posts_id_2_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("posts_id");



CREATE INDEX "payload_locked_documents_rels_redirects_id_2_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("redirects_id");



CREATE INDEX "payload_locked_documents_rels_search_id_2_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("search_id");



CREATE INDEX "payload_locked_documents_rels_users_id_2_idx" ON "public"."payload_locked_documents_rels" USING "btree" ("users_id");



CREATE INDEX "payload_locked_documents_updated_at_2_idx" ON "public"."payload_locked_documents" USING "btree" ("updated_at");



CREATE INDEX "payload_migrations_created_at_2_idx" ON "public"."payload_migrations" USING "btree" ("created_at");



CREATE INDEX "payload_migrations_updated_at_2_idx" ON "public"."payload_migrations" USING "btree" ("updated_at");



CREATE INDEX "payload_preferences_created_at_2_idx" ON "public"."payload_preferences" USING "btree" ("created_at");



CREATE INDEX "payload_preferences_key_2_idx" ON "public"."payload_preferences" USING "btree" ("key");



CREATE INDEX "payload_preferences_rels_order_idx" ON "public"."payload_preferences_rels" USING "btree" ("order");



CREATE INDEX "payload_preferences_rels_parent_idx" ON "public"."payload_preferences_rels" USING "btree" ("parent_id");



CREATE INDEX "payload_preferences_rels_path_idx" ON "public"."payload_preferences_rels" USING "btree" ("path");



CREATE INDEX "payload_preferences_rels_users_id_2_idx" ON "public"."payload_preferences_rels" USING "btree" ("users_id");



CREATE INDEX "payload_preferences_updated_at_2_idx" ON "public"."payload_preferences" USING "btree" ("updated_at");



CREATE INDEX "posts__status_2_idx" ON "public"."posts" USING "btree" ("_status");



CREATE INDEX "posts_created_at_2_idx" ON "public"."posts" USING "btree" ("created_at");



CREATE INDEX "posts_meta_meta_image_2_idx" ON "public"."posts" USING "btree" ("meta_image_id");



CREATE INDEX "posts_populated_authors_order_idx" ON "public"."posts_populated_authors" USING "btree" ("_order");



CREATE INDEX "posts_populated_authors_parent_id_idx" ON "public"."posts_populated_authors" USING "btree" ("_parent_id");



CREATE INDEX "posts_rels_categories_id_2_idx" ON "public"."posts_rels" USING "btree" ("categories_id");



CREATE INDEX "posts_rels_order_idx" ON "public"."posts_rels" USING "btree" ("order");



CREATE INDEX "posts_rels_parent_idx" ON "public"."posts_rels" USING "btree" ("parent_id");



CREATE INDEX "posts_rels_path_idx" ON "public"."posts_rels" USING "btree" ("path");



CREATE INDEX "posts_rels_posts_id_2_idx" ON "public"."posts_rels" USING "btree" ("posts_id");



CREATE INDEX "posts_rels_users_id_2_idx" ON "public"."posts_rels" USING "btree" ("users_id");



CREATE INDEX "posts_slug_2_idx" ON "public"."posts" USING "btree" ("slug");



CREATE INDEX "posts_updated_at_2_idx" ON "public"."posts" USING "btree" ("updated_at");



CREATE INDEX "redirects_created_at_2_idx" ON "public"."redirects" USING "btree" ("created_at");



CREATE INDEX "redirects_from_2_idx" ON "public"."redirects" USING "btree" ("from");



CREATE INDEX "redirects_rels_order_idx" ON "public"."redirects_rels" USING "btree" ("order");



CREATE INDEX "redirects_rels_pages_id_2_idx" ON "public"."redirects_rels" USING "btree" ("pages_id");



CREATE INDEX "redirects_rels_parent_idx" ON "public"."redirects_rels" USING "btree" ("parent_id");



CREATE INDEX "redirects_rels_path_idx" ON "public"."redirects_rels" USING "btree" ("path");



CREATE INDEX "redirects_rels_posts_id_2_idx" ON "public"."redirects_rels" USING "btree" ("posts_id");



CREATE INDEX "redirects_updated_at_2_idx" ON "public"."redirects" USING "btree" ("updated_at");



CREATE INDEX "search_categories_order_idx" ON "public"."search_categories" USING "btree" ("_order");



CREATE INDEX "search_categories_parent_id_idx" ON "public"."search_categories" USING "btree" ("_parent_id");



CREATE INDEX "search_created_at_2_idx" ON "public"."search" USING "btree" ("created_at");



CREATE INDEX "search_meta_meta_image_2_idx" ON "public"."search" USING "btree" ("meta_image_id");



CREATE INDEX "search_rels_order_idx" ON "public"."search_rels" USING "btree" ("order");



CREATE INDEX "search_rels_parent_idx" ON "public"."search_rels" USING "btree" ("parent_id");



CREATE INDEX "search_rels_path_idx" ON "public"."search_rels" USING "btree" ("path");



CREATE INDEX "search_rels_posts_id_2_idx" ON "public"."search_rels" USING "btree" ("posts_id");



CREATE INDEX "search_slug_2_idx" ON "public"."search" USING "btree" ("slug");



CREATE INDEX "search_updated_at_2_idx" ON "public"."search" USING "btree" ("updated_at");



CREATE INDEX "users_created_at_2_idx" ON "public"."users" USING "btree" ("created_at");



CREATE UNIQUE INDEX "users_email_2_idx" ON "public"."users" USING "btree" ("email");



CREATE INDEX "users_updated_at_2_idx" ON "public"."users" USING "btree" ("updated_at");



ALTER TABLE ONLY "public"."_pages_v_blocks_archive"
    ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_bento4x4_cards"
    ADD CONSTRAINT "_pages_v_blocks_bento4x4_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_pages_v_blocks_bento4x4_cards"
    ADD CONSTRAINT "_pages_v_blocks_bento4x4_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bento4x4"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_bento4x4"
    ADD CONSTRAINT "_pages_v_blocks_bento4x4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_content_columns"
    ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_content"
    ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_cta_links"
    ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_cta"
    ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_faq"
    ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_faq_questions"
    ADD CONSTRAINT "_pages_v_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_form_block"
    ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_pages_v_blocks_form_block"
    ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_horizontal_icons_group_items"
    ADD CONSTRAINT "_pages_v_blocks_horizontal_icons_group_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_horizontal_icons_group"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_horizontal_icons_group"
    ADD CONSTRAINT "_pages_v_blocks_horizontal_icons_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_image_with_info_grid"
    ADD CONSTRAINT "_pages_v_blocks_image_with_info_grid_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_pages_v_blocks_image_with_info_grid_items"
    ADD CONSTRAINT "_pages_v_blocks_image_with_info_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_with_info_grid"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_image_with_info_grid"
    ADD CONSTRAINT "_pages_v_blocks_image_with_info_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_list_aside_list"
    ADD CONSTRAINT "_pages_v_blocks_list_aside_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_aside"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_list_aside"
    ADD CONSTRAINT "_pages_v_blocks_list_aside_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_media_block"
    ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_pages_v_blocks_media_block"
    ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_popular_destinations_gallery"
    ADD CONSTRAINT "_pages_v_blocks_popular_destinations_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_popular_destinations_gallery_rows_items"
    ADD CONSTRAINT "_pages_v_blocks_popular_destinations_gallery_rows_items_image_i" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_pages_v_blocks_popular_destinations_gallery_rows_items"
    ADD CONSTRAINT "_pages_v_blocks_popular_destinations_gallery_rows_items_parent_" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_popular_destinations_gallery_rows"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_popular_destinations_gallery_rows"
    ADD CONSTRAINT "_pages_v_blocks_popular_destinations_gallery_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_popular_destinations_gallery"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_side_list_with_icons_items"
    ADD CONSTRAINT "_pages_v_blocks_side_list_with_icons_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_side_list_with_icons"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_side_list_with_icons"
    ADD CONSTRAINT "_pages_v_blocks_side_list_with_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_blocks_text_aside"
    ADD CONSTRAINT "_pages_v_blocks_text_aside_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v"
    ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_pages_v_rels"
    ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_rels"
    ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_rels"
    ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_rels"
    ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v_version_hero_media_group"
    ADD CONSTRAINT "_pages_v_version_hero_media_group_media1_id_media_id_fk" FOREIGN KEY ("media1_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_pages_v_version_hero_media_group"
    ADD CONSTRAINT "_pages_v_version_hero_media_group_media2_id_media_id_fk" FOREIGN KEY ("media2_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_pages_v_version_hero_media_group"
    ADD CONSTRAINT "_pages_v_version_hero_media_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_pages_v"
    ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_posts_v"
    ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_posts_v_rels"
    ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_posts_v_rels"
    ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_posts_v_rels"
    ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_posts_v_rels"
    ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."_posts_v"
    ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."_posts_v_version_populated_authors"
    ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."categories_breadcrumbs"
    ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."categories_breadcrumbs"
    ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."footer_legal_links"
    ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."footer_nav_items"
    ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."footer_rels"
    ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."footer_rels"
    ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."footer_right_nav_items"
    ADD CONSTRAINT "footer_right_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."form_submissions"
    ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."form_submissions_submission_data"
    ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_blocks_checkbox"
    ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_blocks_country"
    ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_blocks_email"
    ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_blocks_message"
    ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_blocks_number"
    ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_blocks_select_options"
    ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_blocks_select"
    ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_blocks_state"
    ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_blocks_text"
    ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_blocks_textarea"
    ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."forms_emails"
    ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."header_nav_items"
    ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."header_rels"
    ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."header_rels"
    ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_archive"
    ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_bento4x4_cards"
    ADD CONSTRAINT "pages_blocks_bento4x4_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."pages_blocks_bento4x4_cards"
    ADD CONSTRAINT "pages_blocks_bento4x4_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bento4x4"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_bento4x4"
    ADD CONSTRAINT "pages_blocks_bento4x4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_content_columns"
    ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_content"
    ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_cta_links"
    ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_cta"
    ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_faq"
    ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_faq_questions"
    ADD CONSTRAINT "pages_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_form_block"
    ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."pages_blocks_form_block"
    ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_horizontal_icons_group_items"
    ADD CONSTRAINT "pages_blocks_horizontal_icons_group_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_horizontal_icons_group"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_horizontal_icons_group"
    ADD CONSTRAINT "pages_blocks_horizontal_icons_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_image_with_info_grid"
    ADD CONSTRAINT "pages_blocks_image_with_info_grid_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."pages_blocks_image_with_info_grid_items"
    ADD CONSTRAINT "pages_blocks_image_with_info_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_with_info_grid"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_image_with_info_grid"
    ADD CONSTRAINT "pages_blocks_image_with_info_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_list_aside_list"
    ADD CONSTRAINT "pages_blocks_list_aside_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_aside"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_list_aside"
    ADD CONSTRAINT "pages_blocks_list_aside_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_media_block"
    ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."pages_blocks_media_block"
    ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_popular_destinations_gallery"
    ADD CONSTRAINT "pages_blocks_popular_destinations_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_popular_destinations_gallery_rows_items"
    ADD CONSTRAINT "pages_blocks_popular_destinations_gallery_rows_items_image_id_m" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."pages_blocks_popular_destinations_gallery_rows_items"
    ADD CONSTRAINT "pages_blocks_popular_destinations_gallery_rows_items_parent_id_" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_popular_destinations_gallery_rows"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_popular_destinations_gallery_rows"
    ADD CONSTRAINT "pages_blocks_popular_destinations_gallery_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_popular_destinations_gallery"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_side_list_with_icons_items"
    ADD CONSTRAINT "pages_blocks_side_list_with_icons_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_side_list_with_icons"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_side_list_with_icons"
    ADD CONSTRAINT "pages_blocks_side_list_with_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_blocks_text_aside"
    ADD CONSTRAINT "pages_blocks_text_aside_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_hero_media_group"
    ADD CONSTRAINT "pages_hero_media_group_media1_id_media_id_fk" FOREIGN KEY ("media1_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."pages_hero_media_group"
    ADD CONSTRAINT "pages_hero_media_group_media2_id_media_id_fk" FOREIGN KEY ("media2_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."pages_hero_media_group"
    ADD CONSTRAINT "pages_hero_media_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages"
    ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."pages_rels"
    ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_rels"
    ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_rels"
    ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pages_rels"
    ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_preferences_rels"
    ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payload_preferences_rels"
    ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."posts_populated_authors"
    ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."posts_rels"
    ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."posts_rels"
    ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."posts_rels"
    ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."posts_rels"
    ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."redirects_rels"
    ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."redirects_rels"
    ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."redirects_rels"
    ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."search_categories"
    ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."search"
    ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."search_rels"
    ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."search_rels"
    ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE;





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



































































































































































































GRANT ALL ON TABLE "public"."_pages_v" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_archive" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_archive" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_archive" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_archive_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_archive_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_archive_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_bento4x4" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_bento4x4" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_bento4x4" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_bento4x4_cards" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_bento4x4_cards" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_bento4x4_cards" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_bento4x4_cards_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_bento4x4_cards_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_bento4x4_cards_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_bento4x4_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_bento4x4_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_bento4x4_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_content" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_content" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_content" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_content_columns" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_content_columns" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_content_columns" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_content_columns_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_content_columns_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_content_columns_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_content_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_content_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_content_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_cta" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_cta" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_cta" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_cta_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_cta_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_cta_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_cta_links" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_cta_links" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_cta_links" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_cta_links_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_cta_links_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_cta_links_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_faq" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_faq" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_faq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_faq_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_faq_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_faq_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_faq_questions" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_faq_questions" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_faq_questions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_faq_questions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_faq_questions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_faq_questions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_form_block" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_form_block" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_form_block" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_form_block_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_form_block_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_form_block_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_horizontal_icons_group" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_horizontal_icons_group" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_horizontal_icons_group" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_horizontal_icons_group_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_horizontal_icons_group_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_horizontal_icons_group_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_horizontal_icons_group_items" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_horizontal_icons_group_items" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_horizontal_icons_group_items" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_horizontal_icons_group_items_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_horizontal_icons_group_items_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_horizontal_icons_group_items_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_image_with_info_grid" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_image_with_info_grid" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_image_with_info_grid" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_image_with_info_grid_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_image_with_info_grid_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_image_with_info_grid_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_image_with_info_grid_items" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_image_with_info_grid_items" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_image_with_info_grid_items" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_image_with_info_grid_items_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_image_with_info_grid_items_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_image_with_info_grid_items_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_list_aside" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_list_aside" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_list_aside" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_list_aside_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_list_aside_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_list_aside_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_list_aside_list" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_list_aside_list" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_list_aside_list" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_list_aside_list_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_list_aside_list_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_list_aside_list_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_media_block" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_media_block" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_media_block" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_media_block_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_media_block_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_media_block_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_popular_destinations_gallery" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_popular_destinations_gallery" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_popular_destinations_gallery" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_popular_destinations_gallery_rows" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_popular_destinations_gallery_rows" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_popular_destinations_gallery_rows" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_rows_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_rows_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_rows_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_popular_destinations_gallery_rows_items" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_popular_destinations_gallery_rows_items" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_popular_destinations_gallery_rows_items" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_rows_items_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_rows_items_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_popular_destinations_gallery_rows_items_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_side_list_with_icons" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_side_list_with_icons" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_side_list_with_icons" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_side_list_with_icons_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_side_list_with_icons_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_side_list_with_icons_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_side_list_with_icons_items" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_side_list_with_icons_items" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_side_list_with_icons_items" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_side_list_with_icons_items_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_side_list_with_icons_items_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_side_list_with_icons_items_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_blocks_text_aside" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_blocks_text_aside" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_blocks_text_aside" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_text_aside_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_text_aside_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_blocks_text_aside_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_rels" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_rels" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_rels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_rels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_rels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_rels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_pages_v_version_hero_media_group" TO "anon";
GRANT ALL ON TABLE "public"."_pages_v_version_hero_media_group" TO "authenticated";
GRANT ALL ON TABLE "public"."_pages_v_version_hero_media_group" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_pages_v_version_hero_media_group_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_pages_v_version_hero_media_group_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_pages_v_version_hero_media_group_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_posts_v" TO "anon";
GRANT ALL ON TABLE "public"."_posts_v" TO "authenticated";
GRANT ALL ON TABLE "public"."_posts_v" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_posts_v_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_posts_v_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_posts_v_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_posts_v_rels" TO "anon";
GRANT ALL ON TABLE "public"."_posts_v_rels" TO "authenticated";
GRANT ALL ON TABLE "public"."_posts_v_rels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_posts_v_rels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_posts_v_rels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_posts_v_rels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."_posts_v_version_populated_authors" TO "anon";
GRANT ALL ON TABLE "public"."_posts_v_version_populated_authors" TO "authenticated";
GRANT ALL ON TABLE "public"."_posts_v_version_populated_authors" TO "service_role";



GRANT ALL ON SEQUENCE "public"."_posts_v_version_populated_authors_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."_posts_v_version_populated_authors_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."_posts_v_version_populated_authors_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";



GRANT ALL ON TABLE "public"."categories_breadcrumbs" TO "anon";
GRANT ALL ON TABLE "public"."categories_breadcrumbs" TO "authenticated";
GRANT ALL ON TABLE "public"."categories_breadcrumbs" TO "service_role";



GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."footer" TO "anon";
GRANT ALL ON TABLE "public"."footer" TO "authenticated";
GRANT ALL ON TABLE "public"."footer" TO "service_role";



GRANT ALL ON SEQUENCE "public"."footer_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."footer_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."footer_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."footer_legal_links" TO "anon";
GRANT ALL ON TABLE "public"."footer_legal_links" TO "authenticated";
GRANT ALL ON TABLE "public"."footer_legal_links" TO "service_role";



GRANT ALL ON TABLE "public"."footer_nav_items" TO "anon";
GRANT ALL ON TABLE "public"."footer_nav_items" TO "authenticated";
GRANT ALL ON TABLE "public"."footer_nav_items" TO "service_role";



GRANT ALL ON TABLE "public"."footer_rels" TO "anon";
GRANT ALL ON TABLE "public"."footer_rels" TO "authenticated";
GRANT ALL ON TABLE "public"."footer_rels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."footer_rels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."footer_rels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."footer_rels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."footer_right_nav_items" TO "anon";
GRANT ALL ON TABLE "public"."footer_right_nav_items" TO "authenticated";
GRANT ALL ON TABLE "public"."footer_right_nav_items" TO "service_role";



GRANT ALL ON TABLE "public"."form_submissions" TO "anon";
GRANT ALL ON TABLE "public"."form_submissions" TO "authenticated";
GRANT ALL ON TABLE "public"."form_submissions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."form_submissions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."form_submissions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."form_submissions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."form_submissions_submission_data" TO "anon";
GRANT ALL ON TABLE "public"."form_submissions_submission_data" TO "authenticated";
GRANT ALL ON TABLE "public"."form_submissions_submission_data" TO "service_role";



GRANT ALL ON TABLE "public"."forms" TO "anon";
GRANT ALL ON TABLE "public"."forms" TO "authenticated";
GRANT ALL ON TABLE "public"."forms" TO "service_role";



GRANT ALL ON TABLE "public"."forms_blocks_checkbox" TO "anon";
GRANT ALL ON TABLE "public"."forms_blocks_checkbox" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_blocks_checkbox" TO "service_role";



GRANT ALL ON TABLE "public"."forms_blocks_country" TO "anon";
GRANT ALL ON TABLE "public"."forms_blocks_country" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_blocks_country" TO "service_role";



GRANT ALL ON TABLE "public"."forms_blocks_email" TO "anon";
GRANT ALL ON TABLE "public"."forms_blocks_email" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_blocks_email" TO "service_role";



GRANT ALL ON TABLE "public"."forms_blocks_message" TO "anon";
GRANT ALL ON TABLE "public"."forms_blocks_message" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_blocks_message" TO "service_role";



GRANT ALL ON TABLE "public"."forms_blocks_number" TO "anon";
GRANT ALL ON TABLE "public"."forms_blocks_number" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_blocks_number" TO "service_role";



GRANT ALL ON TABLE "public"."forms_blocks_select" TO "anon";
GRANT ALL ON TABLE "public"."forms_blocks_select" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_blocks_select" TO "service_role";



GRANT ALL ON TABLE "public"."forms_blocks_select_options" TO "anon";
GRANT ALL ON TABLE "public"."forms_blocks_select_options" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_blocks_select_options" TO "service_role";



GRANT ALL ON TABLE "public"."forms_blocks_state" TO "anon";
GRANT ALL ON TABLE "public"."forms_blocks_state" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_blocks_state" TO "service_role";



GRANT ALL ON TABLE "public"."forms_blocks_text" TO "anon";
GRANT ALL ON TABLE "public"."forms_blocks_text" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_blocks_text" TO "service_role";



GRANT ALL ON TABLE "public"."forms_blocks_textarea" TO "anon";
GRANT ALL ON TABLE "public"."forms_blocks_textarea" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_blocks_textarea" TO "service_role";



GRANT ALL ON TABLE "public"."forms_emails" TO "anon";
GRANT ALL ON TABLE "public"."forms_emails" TO "authenticated";
GRANT ALL ON TABLE "public"."forms_emails" TO "service_role";



GRANT ALL ON SEQUENCE "public"."forms_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."forms_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."forms_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."header" TO "anon";
GRANT ALL ON TABLE "public"."header" TO "authenticated";
GRANT ALL ON TABLE "public"."header" TO "service_role";



GRANT ALL ON SEQUENCE "public"."header_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."header_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."header_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."header_nav_items" TO "anon";
GRANT ALL ON TABLE "public"."header_nav_items" TO "authenticated";
GRANT ALL ON TABLE "public"."header_nav_items" TO "service_role";



GRANT ALL ON TABLE "public"."header_rels" TO "anon";
GRANT ALL ON TABLE "public"."header_rels" TO "authenticated";
GRANT ALL ON TABLE "public"."header_rels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."header_rels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."header_rels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."header_rels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."media" TO "anon";
GRANT ALL ON TABLE "public"."media" TO "authenticated";
GRANT ALL ON TABLE "public"."media" TO "service_role";



GRANT ALL ON SEQUENCE "public"."media_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."media_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."media_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."pages" TO "anon";
GRANT ALL ON TABLE "public"."pages" TO "authenticated";
GRANT ALL ON TABLE "public"."pages" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_archive" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_archive" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_archive" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_bento4x4" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_bento4x4" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_bento4x4" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_bento4x4_cards" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_bento4x4_cards" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_bento4x4_cards" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_content" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_content" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_content" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_content_columns" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_content_columns" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_content_columns" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_cta" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_cta" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_cta" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_cta_links" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_cta_links" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_cta_links" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_faq" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_faq" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_faq" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_faq_questions" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_faq_questions" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_faq_questions" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_form_block" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_form_block" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_form_block" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_horizontal_icons_group" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_horizontal_icons_group" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_horizontal_icons_group" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_horizontal_icons_group_items" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_horizontal_icons_group_items" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_horizontal_icons_group_items" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_image_with_info_grid" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_image_with_info_grid" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_image_with_info_grid" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_image_with_info_grid_items" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_image_with_info_grid_items" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_image_with_info_grid_items" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_list_aside" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_list_aside" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_list_aside" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_list_aside_list" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_list_aside_list" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_list_aside_list" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_media_block" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_media_block" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_media_block" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_popular_destinations_gallery" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_popular_destinations_gallery" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_popular_destinations_gallery" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_popular_destinations_gallery_rows" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_popular_destinations_gallery_rows" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_popular_destinations_gallery_rows" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_popular_destinations_gallery_rows_items" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_popular_destinations_gallery_rows_items" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_popular_destinations_gallery_rows_items" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_side_list_with_icons" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_side_list_with_icons" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_side_list_with_icons" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_side_list_with_icons_items" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_side_list_with_icons_items" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_side_list_with_icons_items" TO "service_role";



GRANT ALL ON TABLE "public"."pages_blocks_text_aside" TO "anon";
GRANT ALL ON TABLE "public"."pages_blocks_text_aside" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_blocks_text_aside" TO "service_role";



GRANT ALL ON TABLE "public"."pages_hero_media_group" TO "anon";
GRANT ALL ON TABLE "public"."pages_hero_media_group" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_hero_media_group" TO "service_role";



GRANT ALL ON SEQUENCE "public"."pages_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."pages_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."pages_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."pages_rels" TO "anon";
GRANT ALL ON TABLE "public"."pages_rels" TO "authenticated";
GRANT ALL ON TABLE "public"."pages_rels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."pages_rels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."pages_rels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."pages_rels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."payload_locked_documents" TO "anon";
GRANT ALL ON TABLE "public"."payload_locked_documents" TO "authenticated";
GRANT ALL ON TABLE "public"."payload_locked_documents" TO "service_role";



GRANT ALL ON SEQUENCE "public"."payload_locked_documents_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payload_locked_documents_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payload_locked_documents_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."payload_locked_documents_rels" TO "anon";
GRANT ALL ON TABLE "public"."payload_locked_documents_rels" TO "authenticated";
GRANT ALL ON TABLE "public"."payload_locked_documents_rels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."payload_locked_documents_rels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payload_locked_documents_rels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payload_locked_documents_rels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."payload_migrations" TO "anon";
GRANT ALL ON TABLE "public"."payload_migrations" TO "authenticated";
GRANT ALL ON TABLE "public"."payload_migrations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."payload_migrations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payload_migrations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payload_migrations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."payload_preferences" TO "anon";
GRANT ALL ON TABLE "public"."payload_preferences" TO "authenticated";
GRANT ALL ON TABLE "public"."payload_preferences" TO "service_role";



GRANT ALL ON SEQUENCE "public"."payload_preferences_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payload_preferences_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payload_preferences_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."payload_preferences_rels" TO "anon";
GRANT ALL ON TABLE "public"."payload_preferences_rels" TO "authenticated";
GRANT ALL ON TABLE "public"."payload_preferences_rels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."payload_preferences_rels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payload_preferences_rels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payload_preferences_rels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."posts" TO "anon";
GRANT ALL ON TABLE "public"."posts" TO "authenticated";
GRANT ALL ON TABLE "public"."posts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."posts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."posts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."posts_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."posts_populated_authors" TO "anon";
GRANT ALL ON TABLE "public"."posts_populated_authors" TO "authenticated";
GRANT ALL ON TABLE "public"."posts_populated_authors" TO "service_role";



GRANT ALL ON TABLE "public"."posts_rels" TO "anon";
GRANT ALL ON TABLE "public"."posts_rels" TO "authenticated";
GRANT ALL ON TABLE "public"."posts_rels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."posts_rels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."posts_rels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."posts_rels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."redirects" TO "anon";
GRANT ALL ON TABLE "public"."redirects" TO "authenticated";
GRANT ALL ON TABLE "public"."redirects" TO "service_role";



GRANT ALL ON SEQUENCE "public"."redirects_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."redirects_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."redirects_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."redirects_rels" TO "anon";
GRANT ALL ON TABLE "public"."redirects_rels" TO "authenticated";
GRANT ALL ON TABLE "public"."redirects_rels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."redirects_rels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."redirects_rels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."redirects_rels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."search" TO "anon";
GRANT ALL ON TABLE "public"."search" TO "authenticated";
GRANT ALL ON TABLE "public"."search" TO "service_role";



GRANT ALL ON TABLE "public"."search_categories" TO "anon";
GRANT ALL ON TABLE "public"."search_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."search_categories" TO "service_role";



GRANT ALL ON SEQUENCE "public"."search_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."search_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."search_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."search_rels" TO "anon";
GRANT ALL ON TABLE "public"."search_rels" TO "authenticated";
GRANT ALL ON TABLE "public"."search_rels" TO "service_role";



GRANT ALL ON SEQUENCE "public"."search_rels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."search_rels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."search_rels_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
