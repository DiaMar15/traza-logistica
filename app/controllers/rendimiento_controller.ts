import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export default class RendimientoController {
  async rutasPorDia({ response }: HttpContext) {
    const data = await Database.from('rutas')

      .select('dia')

      .count('* as total')

      .groupBy('dia')

    return response.ok(
      data.map((item) => ({
        dia: item.dia,
        total: Number(item.total),
      }))
    )
  }

  async kmPorZona({ response }: HttpContext) {
    const data = await Database.from('rutas')

      .select('zona')

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

      .groupBy('zona')

    return response.ok(
      data.map((item) => ({
        zona: item.zona?.trim() ? item.zona : 'SIN ZONA',

        total: Number(item.total) || 0,
      }))
    )
  }

  async entregasCompletadas({ response }: HttpContext) {
    const result = await Database.from('rutas')

      .select(
        Database.raw(`
          SUM(
            numero_facturas *
            (
              CASE
                WHEN NULLIF(
                  TRIM(efectividad),
                  ''
                ) IS NOT NULL

                THEN REPLACE(
                  REPLACE(
                    TRIM(efectividad),
                    '%',
                    ''
                  ),
                  ',',
                  '.'
                ) + 0

                ELSE 0
              END
            )
          ) /
          NULLIF(
            SUM(numero_facturas),
            0
          ) as promedio
        `)
      )

    return response.ok({
      total: Math.round(result[0].promedio || 0),
    })
  }

  async capacidadLogistica({ response }: HttpContext) {
    const result = await Database.from('rutas')

      .select(
        Database.raw(`
          (
            SUM(peso) /
            NULLIF(
              SUM(capacidad_kg),
              0
            )
          ) * 100 as capacidad
        `)
      )

    return response.ok({
      total: Math.round(result[0].capacidad || 0),
    })
  }

  async rendimiento({ response }: HttpContext) {
    const result = await Database.from('rutas')

      .select(
        Database.raw(`
          COUNT(*) as total_rutas
        `),

        Database.raw(`
          SUM(
            CASE
              WHEN total_kilometros > 0
              THEN total_kilometros
              ELSE 0
            END
          ) as total_km
        `),

        Database.raw(`
          SUM(
            numero_facturas *
            (
              CASE
                WHEN NULLIF(
                  TRIM(efectividad),
                  ''
                ) IS NOT NULL

                THEN REPLACE(
                  REPLACE(
                    TRIM(efectividad),
                    '%',
                    ''
                  ),
                  ',',
                  '.'
                ) + 0

                ELSE 0
              END
            )
          ) /
          NULLIF(
            SUM(numero_facturas),
            0
          ) as efectividad
        `)
      )

    return response.ok({
      totalRutas: Number(result[0].total_rutas),

      totalKm: Number(result[0].total_km) || 0,

      efectividad: Math.round(result[0].efectividad || 0),
    })
  }
  async rendimientoVehiculos({ response }: HttpContext) {
    const data = await Database.rawQuery(`

      SELECT

        placa,

        COUNT(*) as rutas,

        SUM(
          CASE
            WHEN total_kilometros > 0
            THEN total_kilometros
            ELSE 0
          END
        ) as km,

        SUM(
          COALESCE(numero_clientes,0)
        ) as clientes,

        SUM(
          COALESCE(peso,0)
        ) as peso,

        SUM(
          COALESCE(volumen,0)
        ) as volumen,

        AVG(
          CASE
            WHEN NULLIF(
              TRIM(tiempo_en_ruta),
              ''
            ) IS NOT NULL

            THEN REPLACE(
              TRIM(tiempo_en_ruta),
              ',',
              '.'
            ) + 0

            ELSE NULL
          END
        ) * 60 as tiempo,

        SUM(
          numero_facturas *
          (
            CASE
              WHEN NULLIF(
                TRIM(efectividad),
                ''
              ) IS NOT NULL

              THEN REPLACE(
                REPLACE(
                  TRIM(efectividad),
                  '%',
                  ''
                ),
                ',',
                '.'
              ) + 0

              ELSE 0
            END
          )
        ) /
        NULLIF(
          SUM(numero_facturas),
          0
        ) as efectividad

      FROM rutas

      WHERE placa IS NOT NULL

      GROUP BY placa

      ORDER BY km DESC
    `)

    return response.ok(
      data[0].map((i: any) => ({
        placa: i.placa,

        rutas: Number(i.rutas) || 0,

        km: Number(i.km) || 0,

        tiempo: Math.round(Number(i.tiempo) || 0),

        clientes: Number(i.clientes) || 0,

        peso: Number(i.peso) || 0,

        volumen: Number(i.volumen) || 0,

        efectividad: Math.round(Number(i.efectividad) || 0),
      }))
    )
  }
}
