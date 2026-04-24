import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {

  protected tableName = 'vehiculos'

  async up() {

  this.schema.createTable('vehiculos', (table) => {

  table.increments('id')

  table.string('placa').notNullable()

  table.string('tipo').nullable()
  table.integer('capacidad_kilo').nullable()
  table.integer('modelo').nullable()

  table.string('clase_vehiculo').nullable()
  table.string('marca').nullable()

  table.string('estado').nullable()

  table.timestamps(true, true)

})

  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
