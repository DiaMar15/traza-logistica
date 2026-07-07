import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'conductores'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('cedula').nullable().unique()

      table.string('celular').nullable()

      table.string('cargo').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('cedula')

      table.dropColumn('celular')

      table.dropColumn('cargo')
    })
  }
}
