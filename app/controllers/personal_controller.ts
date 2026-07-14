import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export default class PersonalController {
  private readonly JORNADA_DIARIA = 8

  private readonly FECHA_CAMBIO_JORNADA = new Date('2026-07-01')
  private obtenerJornadaLaboral(fecha: Date) {
    const cambio = this.FECHA_CAMBIO_JORNADA

    if (fecha < cambio) {
      return {
        semanal: 44,
        mensual: 220,
      }
    }

    return {
      semanal: 42,
      mensual: 200,
    }
  }

  private obtenerJornadaPorFecha(fecha: string) {
    const partes = String(fecha).split('/')

    const fechaDate = new Date(Number(partes[2]), Number(partes[0]) - 1, Number(partes[1]))

    return this.obtenerJornadaLaboral(fechaDate)
  }

  private obtenerJornadaPorMes(mes: string) {
    const meses: Record<string, number> = {
      ENERO: 0,
      FEBRERO: 1,
      MARZO: 2,
      ABRIL: 3,
      MAYO: 4,
      JUNIO: 5,
      JULIO: 6,
      AGOSTO: 7,
      SEPTIEMBRE: 8,
      OCTUBRE: 9,
      NOVIEMBRE: 10,
      DICIEMBRE: 11,
    }

    const numeroMes = meses[String(mes).toUpperCase()] ?? 0

    return this.obtenerJornadaLaboral(new Date(2026, numeroMes, 1))
  }

  /* ==========================================
     MÉTODOS PÚBLICOS
  ========================================== */

  async personalDiario({ request, response }: HttpContext) {
    const fechaInput = request.input('fecha')

    const fechaDate = new Date(fechaInput)

    const fecha = `${fechaDate.getMonth() + 1}/${fechaDate.getDate()}/${fechaDate.getFullYear()}`

    const personal = await Database.from('personal')

    const mapaPersonal = this.crearMapaPersonal(personal)

    const rutas = await Database.from('rutas')
      .where('fecha', fecha)
      .select('conductor', 'auxiliar', 'tiempo_en_ruta', 'turno', 'hora_extra')

    const horasPersonal = this.calcularResumenPersonal(
      personal,
      mapaPersonal,
      rutas,
      this.JORNADA_DIARIA
    )

    return response.ok({
      fecha,

      ...this.generarRespuesta(personal, horasPersonal, this.JORNADA_DIARIA),
    })
  }

  async personalSemanal({ request, response }: HttpContext) {
    let semana = Number(request.input('semana'))

    // Si no envían semana, toma la última disponible
    if (!semana) {
      const semanaActual = await Database.from('rutas').select(
        Database.raw('MAX(CAST(semana AS UNSIGNED)) as semana')
      )

      semana = Number(semanaActual[0]?.semana || 0)
    }

    // Obtener todas las semanas disponibles
    const semanasDisponibles = await Database.from('rutas')
      .distinct('semana')
      .whereNotNull('semana')
      .orderByRaw('CAST(semana AS UNSIGNED) DESC')

    const personal = await Database.from('personal')

    const mapaPersonal = this.crearMapaPersonal(personal)

    const rutas = await Database.from('rutas')
      .where('semana', semana)
      .orderBy('fecha', 'asc')
      .select('conductor', 'auxiliar', 'tiempo_en_ruta', 'fecha')

    const fechaInicio = rutas[0]?.fecha ?? null
    const fechaFin = rutas[rutas.length - 1]?.fecha ?? null

    // Determinar la jornada según la fecha de esa semana
    let jornadaSemanal = 44

    if (rutas.length > 0) {
      jornadaSemanal = this.obtenerJornadaPorFecha(String(rutas[0].fecha)).semanal
    }

    const horasPersonal = this.calcularResumenPersonal(
      personal,
      mapaPersonal,
      rutas,
      jornadaSemanal
    )

    return response.ok({
      semana,

      fechaInicio,

      fechaFin,

      semanas: semanasDisponibles.map((s) => Number(s.semana)),

      ...this.generarRespuesta(personal, horasPersonal, jornadaSemanal),
    })
  }

  async personalMensual({ request, response }: HttpContext) {
    const mes = String(request.input('mes') || '').toUpperCase()

    const personal = await Database.from('personal')

    const mapaPersonal = this.crearMapaPersonal(personal)

    const rutas = await Database.from('rutas')
      .where('mes', mes)
      .select('conductor', 'auxiliar', 'tiempo_en_ruta')

    const jornadaMensual = this.obtenerJornadaPorMes(mes).mensual

    const horasPersonal = this.calcularResumenPersonal(
      personal,
      mapaPersonal,
      rutas,
      jornadaMensual
    )

    return response.ok({
      mes,

      ...this.generarRespuesta(personal, horasPersonal, jornadaMensual),
    })
  }
  /* ==========================================
     MÉTODOS PRIVADOS
  ========================================== */

  private limpiarTexto(texto: string) {
    return String(texto || '')
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\(\d+\)/g, '')
      .replace(/^\d+\s*-\s*/g, '')
      .replace(/-/g, ' ')
      .replace(/\./g, '')
      .replace(/,/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  private buscarPersona(nombre: string, mapa: Record<string, any>) {
    if (mapa[nombre]) {
      return mapa[nombre]
    }

    const buscadas = nombre.split(' ')

    for (const key of Object.keys(mapa)) {
      const palabras = key.split(' ')

      if (
        buscadas.length >= 2 &&
        palabras.includes(buscadas[0]) &&
        palabras.includes(buscadas[buscadas.length - 1])
      ) {
        return mapa[key]
      }

      const comunes = buscadas.filter((p) => palabras.includes(p))

      if (comunes.length >= Math.min(3, buscadas.length)) {
        return mapa[key]
      }
    }

    return null
  }

  private convertirHoras(tiempo: string) {
    if (!tiempo) {
      return 0
    }

    return Number(String(tiempo).replace(',', '.').trim()) || 0
  }

  private crearMapaPersonal(personal: any[]) {
    const mapaPersonal: Record<
      string,
      {
        nombre: string
        cargo: string
        estado: string
      }
    > = {}

    for (const persona of personal) {
      if (persona.estado !== 'ACTIVO') {
        continue
      }

      mapaPersonal[this.limpiarTexto(persona.nombre)] = {
        nombre: persona.nombre,
        cargo: persona.cargo,
        estado: persona.estado,
      }
    }

    return mapaPersonal
  }

  private calcularResumenPersonal(
    personal: any[],
    mapaPersonal: Record<string, any>,
    rutas: any[],
    jornadaObjetivo: number
  ) {
    const resumenPersonal: Record<string, any> = {}

    for (const persona of personal) {
      if (persona.estado !== 'ACTIVO') {
        continue
      }

      resumenPersonal[persona.nombre] = {
        nombre: persona.nombre,
        cargo: persona.cargo,
        rutas: 0,
        horas: 0,
        extras: 0,
        negativas: 0,
      }
    }

    for (const ruta of rutas) {
      const horasRuta = this.convertirHoras(String(ruta.tiempo_en_ruta || ''))

      const personasRuta = [ruta.conductor, ruta.auxiliar]

      for (const personaRaw of personasRuta) {
        const nombreLimpio = this.limpiarTexto(String(personaRaw || ''))

        if (!nombreLimpio) continue
        if (nombreLimpio.includes('APOYO')) continue
        if (nombreLimpio.includes('$')) continue
        if (/^\d+$/.test(nombreLimpio)) continue

        const persona = this.buscarPersona(nombreLimpio, mapaPersonal)

        if (!persona) {
          continue
        }

        resumenPersonal[persona.nombre].rutas++
        resumenPersonal[persona.nombre].horas += horasRuta

        if (jornadaObjetivo === this.JORNADA_DIARIA) {
          const turno = Number(ruta.turno || 0)

          const horaExtra = Number(String(ruta.hora_extra || '0').replace(',', '.'))

          resumenPersonal[persona.nombre].extras += horaExtra

          if (horasRuta < turno) {
            resumenPersonal[persona.nombre].negativas += turno - horasRuta
          }
        }
      }
    }

    return Object.values(resumenPersonal)
      .map((item: any) => {
        const horas = Number(item.horas.toFixed(1))

        let extras = 0
        let negativas = 0

        if (jornadaObjetivo === this.JORNADA_DIARIA) {
          extras = Number(item.extras.toFixed(1))
          negativas = Number(item.negativas.toFixed(1))
        } else {
          extras = horas > jornadaObjetivo ? Number((horas - jornadaObjetivo).toFixed(1)) : 0

          negativas = horas < jornadaObjetivo ? Number((jornadaObjetivo - horas).toFixed(1)) : 0
        }

        return {
          nombre: item.nombre,
          cargo: item.cargo,
          rutas: item.rutas,
          horas,
          extras,
          negativas,
        }
      })
      .sort((a: any, b: any) => b.horas - a.horas)
  }
  private generarRespuesta(personal: any[], horasPersonal: any[], jornadaObjetivo: number) {
    const conductoresActivos = personal.filter(
      (p) => p.estado === 'ACTIVO' && p.cargo?.toUpperCase().includes('CONDUCTOR')
    )

    const auxiliaresActivos = personal.filter(
      (p) => p.estado === 'ACTIVO' && p.cargo?.toUpperCase().includes('AUXILIAR')
    )

    const supernumerariosActivos = personal.filter(
      (p) => p.estado === 'ACTIVO' && p.cargo?.toUpperCase().includes('SUPERNUMERARIO')
    )

    const retirados = personal.filter((p) => p.estado === 'RETIRADO')

    const cumplenJornada = horasPersonal.filter((p: any) => p.horas >= jornadaObjetivo).length

    const noCumplenJornada = horasPersonal.filter((p: any) => p.horas < jornadaObjetivo).length

    const trabajadoresConHorasExtra = horasPersonal.filter((p: any) => p.extras > 0).length

    const horasExtraTotal = Number(
      horasPersonal.reduce((acc: number, p: any) => acc + p.extras, 0).toFixed(1)
    )

    const totalHoras = Number(
      horasPersonal.reduce((acc: number, p: any) => acc + p.horas, 0).toFixed(1)
    )

    const promedioHoras = Number((totalHoras / (horasPersonal.length || 1)).toFixed(1))

    const detalleNoCumplen = horasPersonal
      .filter((p: any) => p.negativas > 0)
      .sort((a: any, b: any) => b.negativas - a.negativas)

    const detalleHorasExtra = horasPersonal
      .filter((p: any) => p.extras > 0)
      .sort((a: any, b: any) => b.extras - a.extras)

    return {
      conductores: conductoresActivos.length,

      auxiliares: auxiliaresActivos.length,

      supernumerarios: supernumerariosActivos.length,

      retirados: retirados.length,

      cumplenJornada,

      noCumplenJornada,

      trabajadoresConHorasExtra,

      horasExtraTotal,

      totalHoras,

      promedioHoras,

      detalleNoCumplen,

      detalleHorasExtra,

      horasPersonal,
    }
  }
}
