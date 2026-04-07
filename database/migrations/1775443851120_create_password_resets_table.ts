import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'password_resets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('email').notNullable()
      table.string('token').notNullable()

      table.timestamp('expires_at').notNullable() // 🔥 ESTA ES LA CLAVE

      table.timestamp('created_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
