import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Vehiculo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare placa: string

  @column()
  declare tipo: string | null

  @column()
  declare capacidad_kilo: number | null

  @column()
  declare modelo: string | null

  @column()
  declare clase_vehiculo: string | null

  @column()
  declare marca: string | null

  @column()
  declare conductor_fijo: string | null

  // activo / inactivo
  @column()
  declare activo: boolean

  @column()
  declare estado: string | null

  // Para un soft delete
  @column.dateTime()
  declare deleted_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
