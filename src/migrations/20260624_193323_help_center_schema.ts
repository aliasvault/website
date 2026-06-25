import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  await db.run(sql`ALTER TABLE \`knowledge_base\` ADD \`section\` text DEFAULT 'using-aliasvault';`)
  await db.run(sql`ALTER TABLE \`knowledge_base\` ADD \`author\` text DEFAULT 'leendert';`)
  await db.run(sql`ALTER TABLE \`knowledge_base\` ADD \`order\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`knowledge_base\` ADD \`featured\` integer;`)
  await db.run(sql`ALTER TABLE \`knowledge_base_locales\` ADD \`group\` text;`)
  await db.run(sql`ALTER TABLE \`knowledge_base_locales\` ADD \`summary\` text;`)
  await db.run(sql`ALTER TABLE \`knowledge_base_locales\` ADD \`seo_title\` text;`)
  await db.run(sql`ALTER TABLE \`knowledge_base_locales\` DROP COLUMN \`category\`;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v\` ADD \`version_section\` text DEFAULT 'using-aliasvault';`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v\` ADD \`version_author\` text DEFAULT 'leendert';`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v\` ADD \`version_order\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v\` ADD \`version_featured\` integer;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v_locales\` ADD \`version_group\` text;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v_locales\` ADD \`version_summary\` text;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v_locales\` ADD \`version_seo_title\` text;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v_locales\` DROP COLUMN \`version_category\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`knowledge_base_faq\`;`)
  await db.run(sql`DROP TABLE \`knowledge_base_rels\`;`)
  await db.run(sql`DROP TABLE \`_knowledge_base_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_knowledge_base_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`knowledge_base_locales\` ADD \`category\` text;`)
  await db.run(sql`ALTER TABLE \`knowledge_base_locales\` DROP COLUMN \`group\`;`)
  await db.run(sql`ALTER TABLE \`knowledge_base_locales\` DROP COLUMN \`summary\`;`)
  await db.run(sql`ALTER TABLE \`knowledge_base_locales\` DROP COLUMN \`seo_title\`;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v_locales\` ADD \`version_category\` text;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v_locales\` DROP COLUMN \`version_group\`;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v_locales\` DROP COLUMN \`version_summary\`;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v_locales\` DROP COLUMN \`version_seo_title\`;`)
  await db.run(sql`ALTER TABLE \`knowledge_base\` DROP COLUMN \`section\`;`)
  await db.run(sql`ALTER TABLE \`knowledge_base\` DROP COLUMN \`author\`;`)
  await db.run(sql`ALTER TABLE \`knowledge_base\` DROP COLUMN \`order\`;`)
  await db.run(sql`ALTER TABLE \`knowledge_base\` DROP COLUMN \`featured\`;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v\` DROP COLUMN \`version_section\`;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v\` DROP COLUMN \`version_author\`;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v\` DROP COLUMN \`version_order\`;`)
  await db.run(sql`ALTER TABLE \`_knowledge_base_v\` DROP COLUMN \`version_featured\`;`)
}
