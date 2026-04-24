import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.ts'

export default class TipoDocumento extends BaseModel {
  public static table = 'tipo_documento'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare abreviatura: string

  @hasMany(() => User, {
    foreignKey: 'tipo_documento_id',
  })
  declare users: HasMany<typeof User>

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime | null
}
