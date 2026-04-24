import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export default class DashboardController {

  /* --------------------------
     TOTAL RUTAS
  -------------------------- */
  async rutasCount({ response }: HttpContext) {
    const result = await Database
      .from('rutas')
      .count('* as total')

    return response.ok({
      total: Number(result[0].total)
    })
  }

  /* --------------------------
     TOTAL KILÓMETROS (sin negativos)
  -------------------------- */
  async kilometros({ response }: HttpContext) {
    const result = await Database
      .from('rutas')
      .select(
        Database.raw(`
          SUM(
            CASE
              WHEN total_kilometros > 0 THEN total_kilometros
              ELSE 0
            END
          ) as total
        `)
      )

    return response.ok({
      total: Number(result[0].total) || 0
    })
  }

  /* --------------------------
     CONDUCTORES ACTIVOS
  -------------------------- */
  async conductores({ response }: HttpContext) {
    const result = await Database
      .from('rutas')
      .countDistinct('conductor as total')

    return response.ok({
      total: Number(result[0].total)
    })
  }

  /* --------------------------
     VIAJES (igual a rutas)
  -------------------------- */
  async viajes({ response }: HttpContext) {
    const result = await Database
      .from('rutas')
      .count('* as total')

    return response.ok({
      total: Number(result[0].total)
    })
  }

  /* --------------------------
     RUTAS POR DÍA
  -------------------------- */
  async rutasPorDia({ response }: HttpContext) {
    const data = await Database
      .from('rutas')
      .select('dia')
      .count('* as total')
      .groupBy('dia')

    return response.ok(
      data.map(item => ({
        dia: item.dia,
        total: Number(item.total)
      }))
    )
  }

  /* --------------------------
     KM POR ZONA
  -------------------------- */
  async kmPorZona({ response }: HttpContext) {
    const data = await Database
      .from('rutas')
      .select('zona')
      .select(
        Database.raw(`
          SUM(
            CASE
              WHEN total_kilometros > 0 THEN total_kilometros
              ELSE 0
            END
          ) as total
        `)
      )
      .groupBy('zona')

    return response.ok(
      data.map(item => ({
        zona: item.zona,
        total: Number(item.total) || 0
      }))
    )
  }

  /* --------------------------
     ENTREGAS COMPLETADAS (%)
     promedio de efectividad
  -------------------------- */
  async entregasCompletadas({ response }: HttpContext) {
    const result = await Database
      .from('rutas')
      .select(
        Database.raw(`
          AVG(
            CASE
              WHEN efectividad LIKE '%\\%%'
                THEN REPLACE(efectividad, '%', '') + 0
              ELSE efectividad + 0
            END
          ) as promedio
        `)
      )

    return response.ok({
      total: Math.round(result[0].promedio || 0)
    })
  }

  /* --------------------------
     CAPACIDAD LOGÍSTICA (%)
     peso vs capacidad
  -------------------------- */
  async capacidadLogistica({ response }: HttpContext) {
    const result = await Database
      .from('rutas')
      .select(
        Database.raw(`
          (SUM(peso) / NULLIF(SUM(capacidad_kg), 0)) * 100 as capacidad
        `)
      )

    return response.ok({
      total: Math.round(result[0].capacidad || 0)
    })
  }
}
