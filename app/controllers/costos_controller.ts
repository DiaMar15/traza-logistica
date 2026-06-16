import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export default class CostosController {
  async costos({ response }: HttpContext) {
    const result = await Database.from('rutas')

      .select(
        Database.raw('SUM(combustible) as combustible'),

        Database.raw('SUM(peajes) as peajes'),

        Database.raw('SUM(calibrada) as calibrada'),

        Database.raw('SUM(parqueadero) as parqueadero'),

        Database.raw('SUM(taxis) as taxis')
      )

    const combustible = Number(result[0].combustible) || 0

    const peajes = Number(result[0].peajes) || 0

    const calibrada = Number(result[0].calibrada) || 0

    const parqueadero = Number(result[0].parqueadero) || 0

    const taxis = Number(result[0].taxis) || 0

    return response.ok({
      combustible,

      peajes,

      calibrada,

      parqueadero,

      taxis,

      total: combustible + peajes + calibrada + parqueadero + taxis,
    })
  }
  async costosDetalle({ response }: HttpContext) {
    const rutas = await Database.from('rutas')

      .select(
        'fecha',
        'placa',
        'ruta',
        'zona',
        'total_kilometros',
        'combustible',
        'peajes',
        'calibrada',
        'parqueadero',
        'taxis'
      )

    return response.ok(rutas)
  }
}
