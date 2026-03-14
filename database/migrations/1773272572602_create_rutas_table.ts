import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rutas'

  async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')

      table.date('fecha')
      table.string('mes')
      table.string('dia')

      table.string('placa')
      table.string('tipo_vehiculo')
      table.string('empresa')

      table.string('conductor')
      table.string('auxiliar')

      table.string('destino')
      table.string('zona')

      table.float('peso')
      table.float('volumen')

      table.integer('numero_facturas')
      table.integer('numero_clientes')

      table.time('inicio_ruta')
      table.time('fin_ruta')
      table.string('tiempo_en_ruta')

      table.integer('km_inicial')
      table.integer('km_final')
      table.integer('total_kilometros')

      table.text('observaciones')

      table.timestamps()
    })
  }

  async down () {
    this.schema.dropTable(this.tableName)
  }
}
