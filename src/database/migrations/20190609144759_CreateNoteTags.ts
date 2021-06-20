import { knex } from 'knex'

const tableName = 'note_tags'

export async function up (knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets auto-incremented
    t.increments()

    t.integer('tag_id')
      .references('id')
      .inTable('tags')

    t.integer('note_id')
      .references('id')
      .inTable('notes')

    t.unique(['tag_id', 'note_id'])
  })
}

export async function down (knex) {
  return knex.schema.dropTable(tableName)
}
