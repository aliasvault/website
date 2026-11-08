import * as migration_20260624_074028_initial_schema from './20260624_074028_initial_schema';
import * as migration_20260624_193323_help_center_schema from './20260624_193323_help_center_schema';
import * as migration_20260624_222124_help_rename_schema from './20260624_222124_help_rename_schema';
import * as migration_20261108_131059_faqs_schema from './20261108_131059_faqs_schema';

export const migrations = [
  {
    up: migration_20260624_074028_initial_schema.up,
    down: migration_20260624_074028_initial_schema.down,
    name: '20260624_074028_initial_schema',
  },
  {
    up: migration_20260624_193323_help_center_schema.up,
    down: migration_20260624_193323_help_center_schema.down,
    name: '20260624_193323_help_center_schema',
  },
  {
    up: migration_20260624_222124_help_rename_schema.up,
    down: migration_20260624_222124_help_rename_schema.down,
    name: '20260624_222124_help_rename_schema',
  },
  {
    up: migration_20261108_131059_faqs_schema.up,
    down: migration_20261108_131059_faqs_schema.down,
    name: '20261108_131059_faqs_schema',
  },
];
