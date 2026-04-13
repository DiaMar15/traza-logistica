import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TipoDocumento from '#models/tipo_documento'

export default class extends BaseSeeder {
  async run() {
    await TipoDocumento.createMany([
      { nombre: 'Cédula de ciudadanía', abreviatura: 'CC' },
      { nombre: 'Tarjeta de identidad', abreviatura: 'TI' },
      { nombre: 'Cédula de Extranjería', abreviatura: 'CE'},
      { nombre: 'Pasaporte', abreviatura: 'PA'},
      { nombre: 'NIT', abreviatura: 'NIT'},
      { nombre: 'Registro Civil', abreviatura: 'RC'}
    ])
  }
}
