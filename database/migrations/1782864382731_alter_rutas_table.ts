import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rutas'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('salida_cedi').nullable().after('inicio_ruta')

      table.string('tiempo_cedi_am').nullable().after('salida_cedi')

      table.string('llegada_cedi').nullable().after('tiempo_cedi_am')

      table.string('tiempo_cedi_pm').nullable().after('llegada_cedi')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('salida_cedi')

      table.dropColumn('tiempo_cedi_am')

      table.dropColumn('llegada_cedi')

      table.dropColumn('tiempo_cedi_pm')
    })
  }
}
