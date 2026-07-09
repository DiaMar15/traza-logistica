import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('avatar').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('avatar')
    })
  }
}
