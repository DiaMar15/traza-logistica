import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rutas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('placa').nullable()
      table.string('conductor').nullable()
      table.string('empresa').nullable()
      table.string('destino').nullable()

      table.string('fecha').nullable()
      table.string('mes').nullable()
      table.string('dia').nullable()
      table.string('festivos').nullable()

      table.string('tipo_vehiculo').nullable()
      table.integer('capacidad_kg').nullable()

      table.string('auxiliar').nullable()
      table.string('apoyo_auxiliar').nullable()

      table.string('destino_tipologia').nullable()

      table.decimal('tarifa', 15, 2).nullable()
      table.decimal('combustible', 15, 2).nullable()
      table.decimal('peajes', 15, 2).nullable()
      table.decimal('calibrada', 15, 2).nullable()
      table.decimal('parqueadero', 15, 2).nullable()
      table.decimal('taxis', 15, 2).nullable()

      table.string('ruta').nullable()
      table.string('zona').nullable()
      table.string('planilla').nullable()

      table.decimal('peso', 10, 2).nullable()
      table.decimal('volumen', 10, 2).nullable()

      table.integer('numero_facturas').nullable()
      table.integer('numero_clientes').nullable()
      table.integer('reenvio').nullable()

      table.decimal('valor_reenvio', 20, 2).nullable()
      table.decimal('valor_ruta', 20, 2).nullable()
      table.decimal('valor_devolucion', 20, 2).nullable()

      table.string('efectividad').nullable()

      table.string('inicio_ruta').nullable()
      table.string('fin_ruta').nullable()
      table.string('tiempo_en_ruta').nullable()
      table.string('turno').nullable()
      table.string('hora_extra').nullable()

      table.decimal('km_inicial', 10, 2).nullable()
      table.decimal('km_final', 10, 2).nullable()
      table.decimal('total_kilometros', 10, 2).nullable()

      table.string('semana').nullable()
      table.text('observaciones').nullable()

      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
