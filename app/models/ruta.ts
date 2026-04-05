import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Ruta extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  /* -------------------------
     BASICOS
  ------------------------- */

  @column()
  declare placa: string

  @column()
  declare conductor: string

  @column()
  declare empresa: string

  @column()
  declare destino: string

  /* -------------------------
     FECHA
  ------------------------- */

  @column()
  declare fecha: string | null

  @column()
  declare mes: string | null

  @column()
  declare dia: string | null

  @column()
  declare festivos: string | null

  /* -------------------------
     VEHICULO
  ------------------------- */

  @column()
  declare tipoVehiculo: string | null

  @column()
  declare capacidadKg: number | null

  /* -------------------------
     LOGISTICA
  ------------------------- */

  @column()
  declare auxiliar: string | null

  @column()
  declare destinoTipologia: string | null

  /* -------------------------
     COSTOS
  ------------------------- */

  @column()
  declare tarifa: number | null

  @column()
  declare combustible: number | null

  @column()
  declare peajes: number | null

  @column()
  declare calibrada: number | null

  @column()
  declare parqueadero: number | null

  @column()
  declare taxis: number | null

  @column()
  declare apoyoAuxiliar: string | null

  /* -------------------------
     RUTA
  ------------------------- */

  @column()
  declare ruta: string | null

  @column()
  declare zona: string | null

  @column()
  declare planilla: string | null

  /* -------------------------
     OPERACION
  ------------------------- */

  @column()
  declare peso: number | null

  @column()
  declare volumen: number | null

  @column()
  declare numeroFacturas: number | null

  @column()
  declare numeroClientes: number | null

  @column()
  declare reenvio: number | null

  /* -------------------------
     VALORES
  ------------------------- */

  @column()
  declare valorReenvio: number | null

  @column()
  declare valorRuta: number | null

  @column()
  declare valorDevolucion: number | null

  @column()
  declare efectividad: string | null

  /* -------------------------
     TIEMPOS
  ------------------------- */

  @column()
  declare inicioRuta: string | null

  @column()
  declare finRuta: string | null

  @column()
  declare tiempoEnRuta: string | null

  @column()
  declare turno: string | null

  @column()
  declare horaExtra: string | null

  /* -------------------------
     KM
  ------------------------- */

  @column()
  declare kmInicial: number | null

  @column()
  declare kmFinal: number | null

  @column()
  declare totalKilometros: number | null

  /* -------------------------
     OTROS
  ------------------------- */

  @column()
  declare semana: string | null

  @column()
  declare observaciones: string | null

  /* -------------------------
     TIMESTAMPS
  ------------------------- */

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

}
