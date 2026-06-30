import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export default class PersonalController {
  private readonly JORNADA_DIARIA = 8

  private readonly JORNADA_SEMANAL = 48

  private readonly JORNADA_MENSUAL = 200
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
      .select('conductor', 'auxiliar', 'tiempo_en_ruta')

    const horasPersonal = this.calcularResumenPersonal(
      personal,
      mapaPersonal,
      rutas,
      this.JORNADA_DIARIA
    )

    return response.ok({
      fecha,
      ...this.generarRespuesta(personal, horasPersonal),
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
      .orderBy('semana', 'desc')

    const personal = await Database.from('personal')

    const mapaPersonal = this.crearMapaPersonal(personal)

    const rutas = await Database.from('rutas')
      .where('semana', semana)
      .select('conductor', 'auxiliar', 'tiempo_en_ruta')

    const horasPersonal = this.calcularResumenPersonal(
      personal,
      mapaPersonal,
      rutas,
      this.JORNADA_SEMANAL
    )

    return response.ok({
      semana,
      semanas: semanasDisponibles.map((s) => Number(s.semana)),
      ...this.generarRespuesta(personal, horasPersonal),
    })
  }

  async personalMensual({ request, response }: HttpContext) {
    const mes = String(request.input('mes') || '').toUpperCase()

    const personal = await Database.from('personal')

    const mapaPersonal = this.crearMapaPersonal(personal)

    const rutas = await Database.from('rutas')
      .where('mes', mes)
      .select('conductor', 'auxiliar', 'tiempo_en_ruta')

    const horasPersonal = this.calcularResumenPersonal(
      personal,
      mapaPersonal,
      rutas,
      this.JORNADA_MENSUAL
    )

    return response.ok({
      mes,
      ...this.generarRespuesta(personal, horasPersonal),
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
    jornadaSemanal: number
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
      }
    }

    return Object.values(resumenPersonal)
      .map((item: any) => {
        const horas = Number(item.horas.toFixed(1))

        const extras = horas > jornadaSemanal ? Number((horas - jornadaSemanal).toFixed(1)) : 0

        const negativas = horas < jornadaSemanal ? Number((jornadaSemanal - horas).toFixed(1)) : 0

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

  private generarRespuesta(personal: any[], horasPersonal: any[]) {
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

    const cumplenJornada = horasPersonal.filter((p: any) => p.horas >= this.JORNADA_SEMANAL).length

    const noCumplenJornada = horasPersonal.filter((p: any) => p.horas < this.JORNADA_SEMANAL).length

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
