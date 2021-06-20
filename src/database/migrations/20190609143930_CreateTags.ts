import { knex } from 'knex'

const tableName = 'tags'

export async function up (knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets auto-incremented
    t.increments()

    t.string('name')
      .notNullable()
      .unique()
  })
}

export async function down (knex) {
  return knex.schema.dropTable(tableName)
}
