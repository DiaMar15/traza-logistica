import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Ruta extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fecha: string

  @column()
  declare mes: string

  @column()
  declare dia: string

  @column()
  declare placa: string

  @column({ columnName: 'tipo_vehiculo' })
  declare tipoVehiculo: string

  @column()
  declare empresa: string

  @column()
  declare conductor: string

  @column()
  declare auxiliar: string

  @column()
  declare destino: string

  @column()
  declare zona: string

  @column()
  declare peso: number

  @column()
  declare volumen: number

  @column({ columnName: 'numero_facturas' })
  declare numeroFacturas: number

  @column({ columnName: 'numero_clientes' })
  declare numeroClientes: number


  /* RUTAS */

  @column({ columnName: 'inicio_ruta' })
  declare inicioRuta: string

  @column({ columnName: 'fin_ruta' })
  declare finRuta: string

  @column({
    columnName: 'tiempo_en_ruta',

    serialize: (value: any) => {

      if (!value) return null

      if (typeof value === 'string') {
        return value.slice(0, 5)
      }

      if (typeof value === 'object') {

        if (value.hours !== undefined) {
          return `${String(value.hours).padStart(2,'0')}:${String(value.minutes).padStart(2,'0')}`
        }

      }

      return value.toString().slice(0,5)
    }
  })
  declare tiempoEnRuta: string

  @column({ columnName: 'km_inicial' })
  declare kmInicial: number

  @column({ columnName: 'km_final' })
  declare kmFinal: number

  @column({ columnName: 'total_kilometros' })
  declare totalKilometros: number


  @column()
  declare observaciones: string


  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

}
