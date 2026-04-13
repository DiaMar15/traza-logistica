import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rutas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('fecha').nullable()
      table.string('mes').nullable()
      table.string('dia').nullable()
      table.string('festivos').nullable()

      table.string('tipo_vehiculo').nullable()
      table.integer('capacidad_kg').nullable()

      table.string('auxiliar').nullable()
      table.string('destino_tipologia').nullable()

      table.float('tarifa').nullable()
      table.float('combustible').nullable()
      table.float('peajes').nullable()
      table.float('calibrada').nullable()
      table.float('parqueadero').nullable()
      table.float('taxis').nullable()

      table.string('apoyo_auxiliar').nullable()

      table.string('ruta').nullable()
      table.string('zona').nullable()
      table.string('planilla').nullable()

      table.float('peso').nullable()
      table.float('volumen').nullable()

      table.integer('numero_facturas').nullable()
      table.integer('numero_clientes').nullable()

      table.integer('reenvio').nullable()

      table.float('valor_reenvio').nullable()
      table.float('valor_ruta').nullable()
      table.float('valor_devolucion').nullable()

      table.string('efectividad').nullable()

      table.string('turno').nullable()
      table.string('hora_extra').nullable()

      table.string('semana').nullable()
      table.text('observaciones').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
