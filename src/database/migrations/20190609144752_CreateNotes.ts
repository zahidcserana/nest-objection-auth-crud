import { knex } from 'knex'

const tableName = 'notes'

export async function up (knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets auto-incremented
    t.increments()

    t.text('text')

    t.integer('theme_id')
      .references('id')
      .inTable('themes')
  })
}

export async function down (knex) {
  return knex.schema.dropTable(tableName)
}
