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
declare estado: string | null // ACTIVO o RETIRADO

}
