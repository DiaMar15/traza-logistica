import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export default class PersonalController {
  async personal({ response }: HttpContext) {
    const semanaActual = await Database.from('rutas')

      .select(Database.raw('MAX(CAST(semana AS UNSIGNED)) as semana'))

    const semana = Number(semanaActual[0]?.semana || 0)

    const conductoresDB = await Database.from('conductores')

      .where('estado', 'activo')

      .select('nombre')

    function limpiarTexto(texto: string) {
      return String(texto || '')
        .toUpperCase()

        .replace(/\(\d+\)/g, '')

        .replace(/^\d+\s*-\s*/g, '')

        .replace(/\s+/g, ' ')

        .trim()
    }

    const mapaConductores: Record<string, string> = {}

    for (const conductor of conductoresDB) {
      const limpio = limpiarTexto(conductor.nombre)

      mapaConductores[limpio] = conductor.nombre
    }

    const rutas = await Database.from('rutas')

      .where('semana', semana)

      .select('conductor', 'auxiliar', 'tiempo_en_ruta')

    const mapaPersonal: Record<string, any> = {}

    function convertirHoras(tiempo: string) {
      if (!tiempo) {
        return 0
      }

      const texto = String(tiempo).replace(',', '.').trim()

      return Number(texto) || 0
    }

    for (const ruta of rutas) {
      const horasRuta = convertirHoras(String(ruta.tiempo_en_ruta || ''))

      const personasRaw = [ruta.conductor, ruta.auxiliar]

      for (const personaRaw of personasRaw) {
        const original = String(personaRaw || '').trim()

        if (!original) {
          continue
        }

        const limpio = limpiarTexto(original)

        if (!limpio) {
          continue
        }

        if (limpio.includes('APOYO')) {
          continue
        }

        if (limpio.includes('$')) {
          continue
        }

        if (/^\d+$/.test(limpio)) {
          continue
        }

        const nombreFinal = mapaConductores[limpio]

        if (!nombreFinal) {
          continue
        }

        if (!mapaPersonal[nombreFinal]) {
          mapaPersonal[nombreFinal] = {
            conductor: nombreFinal,

            total: 0,

            horas: 0,

            extras: 0,
          }
        }

        mapaPersonal[nombreFinal].total += 1

        mapaPersonal[nombreFinal].horas += horasRuta

        if (mapaPersonal[nombreFinal].horas > 44) {
          mapaPersonal[nombreFinal].extras = Number(
            (mapaPersonal[nombreFinal].horas - 44).toFixed(1)
          )
        } else {
          mapaPersonal[nombreFinal].extras = 0
        }
      }
    }

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

      totalHoras: Number(
        rutasPorConductor
          .reduce(
            (acc: number, item: any) => acc + item.horas,

            0
          )
          .toFixed(1)
      ),

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
}
