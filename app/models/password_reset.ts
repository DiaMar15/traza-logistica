import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class PasswordReset extends BaseModel {
  public static table = 'password_resets'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare correo: string

  @column()
  declare token: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime()
  declare expires_at: DateTime

  @column()
  declare used: boolean
}
