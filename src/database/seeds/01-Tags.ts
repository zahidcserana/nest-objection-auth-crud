import { knex } from 'knex'
import { TagModel } from '../models/tag.model'

export async function seed (knex): Promise<any> {
  await TagModel.query(knex).insert([
    {
      name: 'Workout',
    },
    {
      name: 'Food',
    },
    {
      name: 'Diary',
    },
    {
      name: 'Cinema',
    },
    {
      name: 'Books',
    },
  ])
}
