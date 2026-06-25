import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Disable FK enforcement for the whole rename: we create the new help_articles*
  // tables and tear down the old knowledge_base* tables (which reference each
  // other), so FK checks during the drops would otherwise fail.
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`help_articles_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`help_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`help_articles_faq_order_idx\` ON \`help_articles_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`help_articles_faq_parent_id_idx\` ON \`help_articles_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`help_articles_faq_locale_idx\` ON \`help_articles_faq\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`help_articles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`section\` text DEFAULT 'using-aliasvault',
  	\`author\` text DEFAULT 'leendert',
  	\`order\` numeric DEFAULT 0,
  	\`featured\` integer,
  	\`snippet_id\` text,
  	\`updated\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`help_articles_slug_idx\` ON \`help_articles\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`help_articles_updated_at_idx\` ON \`help_articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`help_articles_created_at_idx\` ON \`help_articles\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`help_articles__status_idx\` ON \`help_articles\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`help_articles_locales\` (
  	\`title\` text,
  	\`group\` text,
  	\`description\` text,
  	\`summary\` text,
  	\`seo_title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`help_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`help_articles_locales_locale_parent_id_unique\` ON \`help_articles_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`help_articles_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`help_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`help_articles_texts_order_parent\` ON \`help_articles_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`help_articles_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`help_articles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`help_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`help_articles_id\`) REFERENCES \`help_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`help_articles_rels_order_idx\` ON \`help_articles_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`help_articles_rels_parent_idx\` ON \`help_articles_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`help_articles_rels_path_idx\` ON \`help_articles_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`help_articles_rels_help_articles_id_idx\` ON \`help_articles_rels\` (\`help_articles_id\`);`)
  await db.run(sql`CREATE TABLE \`_help_articles_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_help_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_help_articles_v_version_faq_order_idx\` ON \`_help_articles_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_version_faq_parent_id_idx\` ON \`_help_articles_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_version_faq_locale_idx\` ON \`_help_articles_v_version_faq\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_help_articles_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_section\` text DEFAULT 'using-aliasvault',
  	\`version_author\` text DEFAULT 'leendert',
  	\`version_order\` numeric DEFAULT 0,
  	\`version_featured\` integer,
  	\`version_snippet_id\` text,
  	\`version_updated\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`help_articles\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_help_articles_v_parent_idx\` ON \`_help_articles_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_version_version_slug_idx\` ON \`_help_articles_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_version_version_updated_at_idx\` ON \`_help_articles_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_version_version_created_at_idx\` ON \`_help_articles_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_version_version__status_idx\` ON \`_help_articles_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_created_at_idx\` ON \`_help_articles_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_updated_at_idx\` ON \`_help_articles_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_snapshot_idx\` ON \`_help_articles_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_published_locale_idx\` ON \`_help_articles_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_latest_idx\` ON \`_help_articles_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_help_articles_v_locales\` (
  	\`version_title\` text,
  	\`version_group\` text,
  	\`version_description\` text,
  	\`version_summary\` text,
  	\`version_seo_title\` text,
  	\`version_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_help_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_help_articles_v_locales_locale_parent_id_unique\` ON \`_help_articles_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_help_articles_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_help_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_help_articles_v_texts_order_parent\` ON \`_help_articles_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_help_articles_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`help_articles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_help_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`help_articles_id\`) REFERENCES \`help_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_help_articles_v_rels_order_idx\` ON \`_help_articles_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_rels_parent_idx\` ON \`_help_articles_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_rels_path_idx\` ON \`_help_articles_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_help_articles_v_rels_help_articles_id_idx\` ON \`_help_articles_v_rels\` (\`help_articles_id\`);`)
  await db.run(sql`DROP TABLE \`knowledge_base_faq\`;`)
  await db.run(sql`DROP TABLE \`knowledge_base\`;`)
  await db.run(sql`DROP TABLE \`knowledge_base_locales\`;`)
  await db.run(sql`DROP TABLE \`knowledge_base_texts\`;`)
  await db.run(sql`DROP TABLE \`knowledge_base_rels\`;`)
  await db.run(sql`DROP TABLE \`_knowledge_base_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_knowledge_base_v\`;`)
  await db.run(sql`DROP TABLE \`_knowledge_base_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_knowledge_base_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_knowledge_base_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`help_articles_id\` integer,
  	\`posts_id\` integer,
  	\`news_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`help_articles_id\`) REFERENCES \`help_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "help_articles_id", "posts_id", "news_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "knowledge_base_id", "posts_id", "news_id", "media_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_help_articles_id_idx\` ON \`payload_locked_documents_rels\` (\`help_articles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_id_idx\` ON \`payload_locked_documents_rels\` (\`news_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`knowledge_base_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`knowledge_base\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`knowledge_base_faq_order_idx\` ON \`knowledge_base_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`knowledge_base_faq_parent_id_idx\` ON \`knowledge_base_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`knowledge_base_faq_locale_idx\` ON \`knowledge_base_faq\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`knowledge_base\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`section\` text DEFAULT 'using-aliasvault',
  	\`author\` text DEFAULT 'leendert',
  	\`order\` numeric DEFAULT 0,
  	\`featured\` integer,
  	\`snippet_id\` text,
  	\`updated\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`knowledge_base_slug_idx\` ON \`knowledge_base\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`knowledge_base_updated_at_idx\` ON \`knowledge_base\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`knowledge_base_created_at_idx\` ON \`knowledge_base\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`knowledge_base__status_idx\` ON \`knowledge_base\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`knowledge_base_locales\` (
  	\`title\` text,
  	\`group\` text,
  	\`description\` text,
  	\`summary\` text,
  	\`seo_title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`knowledge_base\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`knowledge_base_locales_locale_parent_id_unique\` ON \`knowledge_base_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`knowledge_base_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`knowledge_base\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`knowledge_base_texts_order_parent\` ON \`knowledge_base_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`knowledge_base_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`knowledge_base_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`knowledge_base\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`knowledge_base_id\`) REFERENCES \`knowledge_base\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`knowledge_base_rels_order_idx\` ON \`knowledge_base_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`knowledge_base_rels_parent_idx\` ON \`knowledge_base_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`knowledge_base_rels_path_idx\` ON \`knowledge_base_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`knowledge_base_rels_knowledge_base_id_idx\` ON \`knowledge_base_rels\` (\`knowledge_base_id\`);`)
  await db.run(sql`CREATE TABLE \`_knowledge_base_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_knowledge_base_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_version_faq_order_idx\` ON \`_knowledge_base_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_version_faq_parent_id_idx\` ON \`_knowledge_base_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_version_faq_locale_idx\` ON \`_knowledge_base_v_version_faq\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_knowledge_base_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_section\` text DEFAULT 'using-aliasvault',
  	\`version_author\` text DEFAULT 'leendert',
  	\`version_order\` numeric DEFAULT 0,
  	\`version_featured\` integer,
  	\`version_snippet_id\` text,
  	\`version_updated\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`knowledge_base\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_parent_idx\` ON \`_knowledge_base_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_version_version_slug_idx\` ON \`_knowledge_base_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_version_version_updated_at_idx\` ON \`_knowledge_base_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_version_version_created_at_idx\` ON \`_knowledge_base_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_version_version__status_idx\` ON \`_knowledge_base_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_created_at_idx\` ON \`_knowledge_base_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_updated_at_idx\` ON \`_knowledge_base_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_snapshot_idx\` ON \`_knowledge_base_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_published_locale_idx\` ON \`_knowledge_base_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_latest_idx\` ON \`_knowledge_base_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_knowledge_base_v_locales\` (
  	\`version_title\` text,
  	\`version_group\` text,
  	\`version_description\` text,
  	\`version_summary\` text,
  	\`version_seo_title\` text,
  	\`version_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_knowledge_base_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_knowledge_base_v_locales_locale_parent_id_unique\` ON \`_knowledge_base_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_knowledge_base_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_knowledge_base_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_texts_order_parent\` ON \`_knowledge_base_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_knowledge_base_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`knowledge_base_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_knowledge_base_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`knowledge_base_id\`) REFERENCES \`knowledge_base\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_rels_order_idx\` ON \`_knowledge_base_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_rels_parent_idx\` ON \`_knowledge_base_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_rels_path_idx\` ON \`_knowledge_base_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_knowledge_base_v_rels_knowledge_base_id_idx\` ON \`_knowledge_base_v_rels\` (\`knowledge_base_id\`);`)
  await db.run(sql`DROP TABLE \`help_articles_faq\`;`)
  await db.run(sql`DROP TABLE \`help_articles\`;`)
  await db.run(sql`DROP TABLE \`help_articles_locales\`;`)
  await db.run(sql`DROP TABLE \`help_articles_texts\`;`)
  await db.run(sql`DROP TABLE \`help_articles_rels\`;`)
  await db.run(sql`DROP TABLE \`_help_articles_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_help_articles_v\`;`)
  await db.run(sql`DROP TABLE \`_help_articles_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_help_articles_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_help_articles_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`knowledge_base_id\` integer,
  	\`posts_id\` integer,
  	\`news_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`knowledge_base_id\`) REFERENCES \`knowledge_base\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "knowledge_base_id", "posts_id", "news_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "knowledge_base_id", "posts_id", "news_id", "media_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_knowledge_base_id_idx\` ON \`payload_locked_documents_rels\` (\`knowledge_base_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_id_idx\` ON \`payload_locked_documents_rels\` (\`news_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
}
