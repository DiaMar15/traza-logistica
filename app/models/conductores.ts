import { DateTime } from 'luxon'

import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Conductor extends BaseModel {
  public static table = 'conductores'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare estado: 'activo' | 'inactivo'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
  })
  declare updatedAt: DateTime
}
