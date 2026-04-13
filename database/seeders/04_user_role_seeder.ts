import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserRole from '#models/user_roles'

export default class extends BaseSeeder {
  async run() {

    await UserRole.createMany([

      // 👑 ADMIN
      { user_id: 1, role_id: 1 },

      // 👤 USUARIO
      { user_id: 2, role_id: 2 },

      // 🚚 LOGÍSTICA
      { user_id: 3, role_id: 3 },

      // 💰 FACTURACIÓN
      { user_id: 4, role_id: 4 },

      // 📦 BODEGA
      { user_id: 5, role_id: 5 },

    ])

    console.log('✅ Roles asignados correctamente')
  }
}
