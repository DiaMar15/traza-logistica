import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export default class RendimientoController {
  private suma(columna: string, alias: string) {
    return Database.raw(`
      SUM(
        COALESCE(${columna}, 0)
      ) as ${alias}
    `)
  }

  private promedioTiempo(columna: string, alias: string) {
    return Database.raw(`
      AVG(
        CASE
          WHEN NULLIF(
            TRIM(${columna}),
            ''
          ) IS NOT NULL

          THEN REPLACE(
            TRIM(${columna}),
            ',',
            '.'
          ) + 0

          ELSE NULL
        END
      ) * 60 as ${alias}
    `)
  }

  private sumaDecimal(columna: string, alias: string) {
    return Database.raw(`
    SUM(
      CASE
        WHEN NULLIF(
          TRIM(${columna}),
          ''
        ) IS NOT NULL

        THEN REPLACE(
          TRIM(${columna}),
          ',',
          '.'
        ) + 0

        ELSE 0
      END
    ) as ${alias}
  `)
  }

  private totalKilometros(alias: string) {
    return Database.raw(`
    SUM(
      CASE
        WHEN total_kilometros > 0
        THEN total_kilometros
        ELSE 0
      END
    ) as ${alias}
  `)
  }

  private promedioEfectividad(alias: string) {
    return Database.raw(`
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
    ) as ${alias}
  `)
  }

  private consultaRutas(request: HttpContext['request']) {
    const { dia, semana, mes } = request.qs()

    const query = Database.from('rutas')

    query.whereNotNull('placa')

    if (dia) {
      const [anio, numeroMes, diaMes] = dia.split('-')

      const fechaFormateada = `${Number(numeroMes)}/${Number(diaMes)}/${anio}`

      query.where('fecha', fechaFormateada)
    }

    if (semana) {
      query.where('semana', semana)
    }

    if (mes) {
      query.where('mes', mes.toUpperCase())
    }

    return query
  }

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

  async kmPorZona({ request, response }: HttpContext) {
    const { top } = request.qs()

    const query = this.consultaRutas(request)

    query.whereNotNull('zona')

    query.whereRaw("TRIM(zona) <> ''")

    query
      .select('zona')

      .select(this.totalKilometros('total'))

      .groupBy('zona')

      .orderBy('total', 'desc')

    if (top) {
      query.limit(Number(top))
    }

    const data = await query

    return response.ok(
      data.map((item: any) => ({
        zona: item.zona,

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

  async rendimiento({ request, response }: HttpContext) {
    const { dia, semana, mes } = request.qs()

    const query = Database.from('rutas')

    if (dia) {
      const [anio, mesFecha, diaFecha] = dia.split('-')

      const fechaFormateada = `${Number(mesFecha)}/${Number(diaFecha)}/${anio}`

      query.where('fecha', fechaFormateada)
    }

    if (semana) {
      query.where('semana', semana)
    }

    if (mes) {
      query.where('mes', mes.toUpperCase())
    }

    const result = await query.select(
      Database.raw(`
    COUNT(*) as total_rutas
  `),

      this.totalKilometros('total_km'),

      this.promedioEfectividad('efectividad')
    )

    return response.ok({
      totalRutas: Number(result[0].total_rutas) || 0,

      totalKm: Number(result[0].total_km) || 0,

      efectividad: Number(Number(result[0].efectividad || 0).toFixed(2)),
    })
  }

  async rendimientoVehiculos({ request, response }: HttpContext) {
    const query = this.consultaRutas(request)

    const data = await query
      .select('placa')
      .count('* as rutas')
      .select(this.totalKilometros('km'))
      .select(this.suma('numero_clientes', 'clientes'))
      .select(this.suma('peso', 'peso'))
      .select(this.suma('volumen', 'volumen'))
      .select(this.promedioTiempo('tiempo_en_ruta', 'tiempo'))
      .select(this.promedioTiempo('tiempo_cedi_am', 'tiempo_cedi_am'))
      .select(this.promedioTiempo('tiempo_cedi_pm', 'tiempo_cedi_pm'))
      .select(this.promedioEfectividad('efectividad'))

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
      ) as efectividad
    `)
      )

      .groupBy('placa')

      .orderBy('km', 'desc')

    return response.ok(
      data.map((i: any) => ({
        placa: i.placa,

        rutas: Number(i.rutas) || 0,

        km: Number(i.km) || 0,

        tiempo: Math.round(Number(i.tiempo) || 0),

        tiempoCediAm: Math.round(Number(i.tiempo_cedi_am) || 0),

        tiempoCediPm: Math.round(Number(i.tiempo_cedi_pm) || 0),

        clientes: Number(i.clientes) || 0,

        peso: Number(i.peso) || 0,

        volumen: Number(i.volumen) || 0,

        efectividad: Number(Number(i.efectividad || 0).toFixed(2)),
      }))
    )
  }

  async vehiculoMenorKilometraje({ request, response }: HttpContext) {
    const query = this.consultaRutas(request)

    const data = await query
      .select('placa')
      .select(this.totalKilometros('km'))
      .groupBy('placa')
      .orderBy('km', 'asc')
      .first()

    return response.ok({
      placa: data?.placa ?? null,

      kilometros: Number(data?.km) || 0,
    })
  }

  async tiempoCediAmVehiculos({ request, response }: HttpContext) {
    const query = this.consultaRutas(request)

    const data = await query
      .select('placa')

      .select(this.promedioTiempo('tiempo_cedi_am', 'promedio'))

      .groupBy('placa')

      .orderBy('promedio', 'desc')

    return response.ok(
      data.map((item: any) => ({
        placa: item.placa,

        promedio: Math.round(Number(item.promedio) || 0),
      }))
    )
  }
  async tiempoCediPmVehiculos({ request, response }: HttpContext) {
    const query = this.consultaRutas(request)

    const data = await query
      .select('placa')

      .select(this.promedioTiempo('tiempo_cedi_pm', 'promedio'))

      .groupBy('placa')

      .orderBy('promedio', 'desc')

    return response.ok(
      data.map((item: any) => ({
        placa: item.placa,

        promedio: Math.round(Number(item.promedio) || 0),
      }))
    )
  }
  async tiempoCediAmZona({ request, response }: HttpContext) {
    const query = this.consultaRutas(request)

    query.whereNotNull('zona')

    query.whereRaw("TRIM(zona) <> ''")

    const data = await query
      .select('zona')

      .select(this.promedioTiempo('tiempo_cedi_am', 'promedio'))

      .groupBy('zona')

      .orderBy('promedio', 'desc')

    return response.ok(
      data.map((item: any) => ({
        zona: item.zona,

        promedio: Math.round(Number(item.promedio) || 0),
      }))
    )
  }
  async tiempoCediPmZona({ request, response }: HttpContext) {
    const query = this.consultaRutas(request)

    query.whereNotNull('zona')

    query.whereRaw("TRIM(zona) <> ''")

    const data = await query
      .select('zona')

      .select(this.promedioTiempo('tiempo_cedi_pm', 'promedio'))
      .groupBy('zona')

      .orderBy('promedio', 'desc')

    return response.ok(
      data.map((item: any) => ({
        zona: item.zona,

        promedio: Math.round(Number(item.promedio) || 0),
      }))
    )
  }
  async horasExtraZona({ request, response }: HttpContext) {
    const query = this.consultaRutas(request)

    query.whereNotNull('zona')

    query.whereRaw("TRIM(zona) <> ''")

    const data = await query
      .select('zona')

      .select(this.sumaDecimal('hora_extra', 'horas_extra'))

      .groupBy('zona')

      .orderBy('horas_extra', 'desc')

    return response.ok(
      data.map((item: any) => ({
        zona: item.zona,

        horasExtra: Number(Number(item.horas_extra || 0).toFixed(2)),
      }))
    )
  }
}
