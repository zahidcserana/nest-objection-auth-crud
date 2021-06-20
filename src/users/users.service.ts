import { Inject, Injectable } from '@nestjs/common'
import { ModelClass, transaction } from 'objection'
import { UserModel } from 'src/database/models/user.model'
import * as bcrypt from 'bcrypt'
import { jwtConstants } from '../auth/constants'

@Injectable()
export class UsersService {
  constructor (
    @Inject('UserModel') private modelClass: ModelClass<UserModel>,
  ) {}

  findAll () {
    return this.modelClass.query()
  }

  findOneById (id: number) {
    return this.modelClass.query().findById(id)
  }

  findOne (username: string) {
    return this.modelClass.query().findOne({ username })
  }

  async create (props: Partial<UserModel>) {
    const password = props.password ? props.password : '123456'

    props.password = await bcrypt.hash(password, jwtConstants.saltOrRounds)

    return this.modelClass
      .query()
      .insert(props)
      .returning('*')
  }

  update (id: number, props: Partial<UserModel>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first()
  }

  delete (id: number) {
    return transaction(this.modelClass, async (_, trx) => {
      return this.modelClass
        .query()
        .deleteById(id)
        .returning('*')
        .first()
        .transacting(trx)
    })
  }
}
