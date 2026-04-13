import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {

    await User.createMany([

      // ADMIN
      {
        nombre: 'Diana',
        apellido: 'Amador',
        tipo_documento_id: 1,
        numero_documento: '1000001',
        correo: 'admin@test.com',
        password: '12345678',
        numero_telefono: '3000000001',
      },

      // USUARIO GENERAL
      {
        nombre: 'Carlos',
        apellido: 'Lopez',
        tipo_documento_id: 1,
        numero_documento: '1000002',
        correo: 'usuario@test.com',
        password: '12345678',
        numero_telefono: '3000000002',
      },

      // AUXILIAR LOGÍSTICO
      {
        nombre: 'Luis',
        apellido: 'Transporte',
        tipo_documento_id: 1,
        numero_documento: '1000003',
        correo: 'logistica@test.com',
        password: '12345678',
        numero_telefono: '3000000003',
      },

      // FACTURACIÓN
      {
        nombre: 'Maria',
        apellido: 'Finanzas',
        tipo_documento_id: 1,
        numero_documento: '1000004',
        correo: 'facturacion@test.com',
        password: '12345678',
        numero_telefono: '3000000004',
      },

      // AUXILIAR DE BODEGA
      {
        nombre: 'Andres',
        apellido: 'Bodega',
        tipo_documento_id: 1,
        numero_documento: '1000005',
        correo: 'bodega@test.com',
        password: '12345678',
        numero_telefono: '3000000005',
      },

    ])

    console.log('✅ Usuarios creados correctamente')
  }
}
