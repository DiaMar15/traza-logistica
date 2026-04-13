import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import UserRole from './user_roles.ts'

export default class Role extends BaseModel {
  public static table = 'roles'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @hasMany(() => UserRole, {
    foreignKey: 'role_id',
  })
  declare userRoles: HasMany<typeof UserRole>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
