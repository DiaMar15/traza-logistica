import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/roles'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      { nombre: 'admin' },
      { nombre: 'usuario' },
      { nombre: 'Auxiliar Logístico' },
      { nombre: 'Facturacion' },
      { nombre: 'Auxiliar de Bodega' },
    ])
  }
}
