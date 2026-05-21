import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehiculos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('placa', 20).notNullable().unique()

      table.string('tipo', 50).nullable()

      table.integer('capacidad_kilo').nullable()

      table.string('modelo', 20).nullable()

      table.string('clase_vehiculo', 100).nullable()

      table.string('marca', 100).nullable()

      table.string('conductor_fijo', 150).nullable()

      table.boolean('activo').notNullable().defaultTo(true)

      table.string('estado', 50).notNullable().defaultTo('ACTIVO')

      table.timestamp('deleted_at').nullable()

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
