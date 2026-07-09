import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export default class DashboardController {
  /* --------------------------
     TOTAL RUTAS
  -------------------------- */

  async rutasCount({ response }: HttpContext) {
    const result = await Database.from('rutas').count('* as total')

    return response.ok({
      total: Number(result[0].total),
    })
  }

  /* --------------------------
     TOTAL KILÓMETROS
  -------------------------- */

  async kilometros({ response }: HttpContext) {
    const result = await Database.from('rutas')

      .select(
        Database.raw(`
          SUM(
            CASE
              WHEN total_kilometros > 0
              THEN total_kilometros
              ELSE 0
            END
          ) as total
        `)
      )

    return response.ok({
      total: Number(result[0].total) || 0,
    })
  }

  /* --------------------------
     CONDUCTORES ACTIVOS
  -------------------------- */

  async conductores({ response }: HttpContext) {
    const result = await Database.from('conductores')

      .where('estado', 'activo')

      .count('* as total')

    return response.ok({
      total: Number(result[0].total),
    })
  }

  /* --------------------------
     VIAJES
  -------------------------- */

  async viajes({ response }: HttpContext) {
    const result = await Database.from('rutas')

      .count('* as total')

    return response.ok({
      total: Number(result[0].total),
    })
  }

  /* --------------------------
   DASHBOARD PRINCIPAL
-------------------------- */

  async principal({ request, response }: HttpContext) {
    const tipo = request.input('tipo', 'dia')

    let query = Database.from('rutas')

    if (tipo === 'dia') {
      const fecha = request.input('fecha')

      if (fecha) {
        const [anio, mes, dia] = fecha.split('-')

        const fechaBD = `${Number(mes)}/${Number(dia)}/${anio}`

        query = query.whereRaw('TRIM(fecha) = ?', [fechaBD])
      }
    }
    if (tipo === 'semana') {
      const semana = request.input('semana')

      if (semana) {
        query = query.whereRaw('TRIM(semana) = ?', [String(semana)])
      }
    }

    if (tipo === 'mes') {
      const mes = request.input('mes')

      if (mes) {
        query = query.whereRaw('UPPER(TRIM(mes)) = ?', [String(mes).toUpperCase()])
      }
    }

    const rutas = await query.clone()

    const totalRutas = rutas.length

    const totalClientes = rutas.reduce((acc, item) => acc + Number(item.numero_clientes || 0), 0)

    const totalDinero = rutas.reduce((acc, item) => acc + Number(item.valor_ruta || 0), 0)

    const conductoresActivos = new Set(
      rutas.map((r) => String(r.conductor || '').trim()).filter(Boolean)
    ).size

    const auxiliaresActivos = new Set(
      rutas.map((r) => String(r.auxiliar || '').trim()).filter(Boolean)
    ).size

    const vistaGeneral =
      (tipo === 'dia' && !request.input('fecha')) ||
      (tipo === 'semana' && !request.input('semana')) ||
      (tipo === 'mes' && !request.input('mes'))

    return response.ok({
      vistaGeneral,

      kpis: {
        totalRutas,
        totalClientes,
        totalDinero,
        conductoresActivos,
        auxiliaresActivos,
      },

      detalle: rutas.map((ruta) => ({
        placa: ruta.placa,
        zona: ruta.zona,

        fecha: ruta.fecha,
        semana: ruta.semana,
        mes: ruta.mes,

        clientes: Number(ruta.numero_clientes || 0),
        peso: Number(ruta.peso || 0),
        valor: Number(ruta.valor_ruta || 0),
      })),
    })
  }

  async semanas({ response }: HttpContext) {
    const semanaActual = await Database.from('rutas').select(
      Database.raw(`
      MAX(
        CAST(semana AS UNSIGNED)
      ) as semana
    `)
    )

    const semanasDisponibles = await Database.from('rutas')
      .distinct('semana')
      .whereNotNull('semana')
      .orderByRaw('CAST(semana AS UNSIGNED) DESC')

    return response.ok({
      semana: Number(semanaActual[0]?.semana || 0),

      semanas: semanasDisponibles.map((item) => Number(item.semana)),
    })
  }
}
