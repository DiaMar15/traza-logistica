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
     RUTAS POR DÍA
  -------------------------- */

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

  /* --------------------------
     KM POR ZONA
  -------------------------- */

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

  /* --------------------------
     ENTREGAS COMPLETADAS
  -------------------------- */

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

  /* --------------------------
     CAPACIDAD LOGÍSTICA
  -------------------------- */

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

  /* --------------------------
     RENDIMIENTO GENERAL
  -------------------------- */

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

  /* --------------------------
     COSTOS
  -------------------------- */

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

  /* --------------------------
     PERSONAL OPERATIVO
  -------------------------- */

  async personal({ response }: HttpContext) {
    /* --------------------------
       SEMANA ACTUAL
    -------------------------- */

    /* --------------------------
   SEMANA ACTUAL
-------------------------- */

    const semanaActual = await Database.from('rutas')

      .select(Database.raw('MAX(CAST(semana AS UNSIGNED)) as semana'))

    const semana = Number(semanaActual[0]?.semana || 0)
    /* --------------------------
       CONDUCTORES ACTIVOS
    -------------------------- */

    const conductoresDB = await Database.from('conductores')

      .where('estado', 'activo')

      .select('nombre')

    /* --------------------------
       LIMPIAR TEXTO
    -------------------------- */

    function limpiarTexto(texto: string) {
      return String(texto || '')
        .toUpperCase()

        .replace(/\(\d+\)/g, '')

        .replace(/^\d+\s*-\s*/g, '')

        .replace(/\s+/g, ' ')

        .trim()
    }

    /* --------------------------
       MAPA CONDUCTORES
    -------------------------- */

    const mapaConductores: Record<string, string> = {}

    for (const conductor of conductoresDB) {
      const limpio = limpiarTexto(conductor.nombre)

      mapaConductores[limpio] = conductor.nombre
    }

    /* --------------------------
       RUTAS
    -------------------------- */

    const rutas = await Database.from('rutas')

      .where('semana', semana)

      .select('conductor', 'auxiliar', 'tiempo_en_ruta')

    /* --------------------------
       MAPA PERSONAL
    -------------------------- */

    const mapaPersonal: Record<string, any> = {}

    /* --------------------------
       CONVERTIR HORAS
    -------------------------- */

    function convertirHoras(tiempo: string) {
      if (!tiempo) {
        return 0
      }

      const texto = String(tiempo).replace(',', '.').trim()

      return Number(texto) || 0
    }

    /* --------------------------
       RECORRER RUTAS
    -------------------------- */

    for (const ruta of rutas) {
      const horasRuta = convertirHoras(String(ruta.tiempo_en_ruta || ''))

      /* --------------------------
         PERSONAS
      -------------------------- */

      const personasRaw = [ruta.conductor, ruta.auxiliar]

      for (const personaRaw of personasRaw) {
        const original = String(personaRaw || '').trim()

        if (!original) {
          continue
        }

        /* --------------------------
           LIMPIAR
        -------------------------- */

        const limpio = limpiarTexto(original)

        if (!limpio) {
          continue
        }

        /* --------------------------
           IGNORAR APOYO
        -------------------------- */

        if (limpio.includes('APOYO')) {
          continue
        }

        /* --------------------------
           IGNORAR BASURA
        -------------------------- */

        if (limpio.includes('$')) {
          continue
        }

        if (/^\d+$/.test(limpio)) {
          continue
        }

        /* --------------------------
           NOMBRE FINAL
        -------------------------- */

        const nombreFinal = mapaConductores[limpio]

        /* --------------------------
           SI NO ESTÁ ACTIVO
        -------------------------- */

        if (!nombreFinal) {
          continue
        }

        /* --------------------------
           CREAR
        -------------------------- */

        if (!mapaPersonal[nombreFinal]) {
          mapaPersonal[nombreFinal] = {
            conductor: nombreFinal,

            total: 0,

            horas: 0,

            extras: 0,
          }
        }

        /* --------------------------
           SUMAR
        -------------------------- */

        mapaPersonal[nombreFinal].total += 1

        mapaPersonal[nombreFinal].horas += horasRuta

        /* --------------------------
           EXTRAS
        -------------------------- */

        if (mapaPersonal[nombreFinal].horas > 44) {
          mapaPersonal[nombreFinal].extras = Number(
            (mapaPersonal[nombreFinal].horas - 44).toFixed(1)
          )
        } else {
          mapaPersonal[nombreFinal].extras = 0
        }
      }
    }

    /* --------------------------
       ARRAY FINAL
    -------------------------- */

    const rutasPorConductor = Object.values(mapaPersonal)

      .map((item: any) => ({
        conductor: item.conductor,

        total: Number(item.total) || 0,

        horas: Number(item.horas.toFixed(1)) || 0,

        extras: Number(item.extras.toFixed(1)) || 0,
      }))

      .sort((a: any, b: any) => b.horas - a.horas)

    /* --------------------------
       RESPONSE
    -------------------------- */

    return response.ok({
      semana,

      conductores: rutasPorConductor.length,

      auxiliares: rutasPorConductor.length,

      /* --------------------------
     TOTAL HORAS
  -------------------------- */

      totalHoras: Number(
        rutasPorConductor
          .reduce(
            (acc: number, item: any) => acc + item.horas,

            0
          )
          .toFixed(1)
      ),

      /* --------------------------
     PROMEDIO SEMANAL
  -------------------------- */

      promedioHoras: Number(
        (
          rutasPorConductor.reduce(
            (acc: number, item: any) => acc + item.horas,

            0
          ) / (rutasPorConductor.length || 1)
        ).toFixed(1)
      ),

      rutasPorConductor,
    })
  }

  /* --------------------------
     COSTOS DETALLE
  -------------------------- */

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

  /* --------------------------
     RENDIMIENTO VEHÍCULOS
  -------------------------- */

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
