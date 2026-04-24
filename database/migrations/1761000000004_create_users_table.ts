import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nombre')
      table.string('apellido')

      table
        .bigInteger('tipo_documento_id')
        .unsigned()
        .references('id')
        .inTable('tipos_documentos')
        .onDelete('CASCADE')

      table.string('numero_documento')
      table.string('correo').unique()
      table.string('password')

      table.string('numero_telefono')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
