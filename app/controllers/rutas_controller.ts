import Ruta from '#models/ruta'
import type { HttpContext } from '@adonisjs/core/http'
import { createRutaValidator, patchRutaValidator } from '#validators/ruta'

export default class RutasController {

  /*
  --------------------------------
  LISTAR RUTAS (PAGINACIÓN)
  --------------------------------
  */
  async index({ request }: HttpContext) {

    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const q = request.input('q')

    const query = Ruta.query().orderBy('id', 'desc')

    if (q) {
      query
        .where('inicio_ruta', 'like', `%${q}%`)
        .orWhere('fin_ruta', 'like', `%${q}%`)
        .orWhere('tiempo_en_ruta', 'like', `%${q}%`)
    }

    const rutas = await query.paginate(page, limit)

    return rutas.serialize()
  }


  /*
  --------------------------------
  CONTAR RUTAS
  --------------------------------
  */
  async count() {

    const total = await Ruta.query().count('* as total')

    return {
      total_rutas: total[0].$extras.total
    }
  }


  /*
  --------------------------------
  TOTAL KILOMETROS
  --------------------------------
  */
  async kilometros() {

    const total = await Ruta.query().sum('total_kilometros as total')

    return {
      total_kilometros: total[0].$extras.total || 0
    }
  }


  /*
  --------------------------------
  BUSCAR RUTAS
  --------------------------------
  */
  async buscar({ request }: HttpContext) {

    const q = request.input('q')

    if (!q) return []

    const rutas = await Ruta.query()
      .where('inicio_ruta', 'like', `%${q}%`)
      .orWhere('fin_ruta', 'like', `%${q}%`)
      .limit(50)

    return rutas
  }


  /*
  --------------------------------
  OBTENER RUTA POR ID
  --------------------------------
  */
  async show({ params }: HttpContext) {

    const ruta = await Ruta.findOrFail(params.id)

    return ruta
  }


  /*
  --------------------------------
  CREAR RUTA
  --------------------------------
  */
  async store({ request }: HttpContext) {

    const data = await request.validateUsing(createRutaValidator)

    data.placa = request.input('placa')
    data.total_kilometros = data.km_final - data.km_inicial

    const inicio = data.inicio_ruta.split(':').map(Number)
    const fin = data.fin_ruta.split(':').map(Number)

    const inicioMin = inicio[0] * 60 + inicio[1]
    const finMin = fin[0] * 60 + fin[1]

    const diff = finMin - inicioMin

    const horas = Math.floor(diff / 60)
    const minutos = diff % 60

    data.tiempo_en_ruta =
      `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}`

    const ruta = await Ruta.create(data)

    return ruta
  }


  /*
  --------------------------------
  ACTUALIZAR RUTA COMPLETA
  --------------------------------
  */
  async update({ params, request }: HttpContext) {

    const ruta = await Ruta.findOrFail(params.id)

    const data = await request.validateUsing(createRutaValidator)

    data.placa = request.input('placa')
    data.total_kilometros = data.km_final - data.km_inicial

    const inicio = data.inicio_ruta.split(':').map(Number)
    const fin = data.fin_ruta.split(':').map(Number)

    const inicioMin = inicio[0] * 60 + inicio[1]
    const finMin = fin[0] * 60 + fin[1]

    const diff = finMin - inicioMin

    const horas = Math.floor(diff / 60)
    const minutos = diff % 60

    data.tiempo_en_ruta =
      `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}`

    ruta.merge(data)

    await ruta.save()

    return ruta
  }


  /*
  --------------------------------
  ACTUALIZAR PARCIAL
  --------------------------------
  */
  async patch({ params, request }: HttpContext) {

    const ruta = await Ruta.findOrFail(params.id)

    const data = await request.validateUsing(patchRutaValidator)

    if (data.km_inicial !== undefined && data.km_final !== undefined) {

      data.total_kilometros = data.km_final - data.km_inicial
    }

    if (data.inicio_ruta !== undefined && data.fin_ruta !== undefined) {

      const inicio = data.inicio_ruta.split(':').map(Number)
      const fin = data.fin_ruta.split(':').map(Number)

      const inicioMin = inicio[0] * 60 + inicio[1]
      const finMin = fin[0] * 60 + fin[1]

      const diff = finMin - inicioMin

      const horas = Math.floor(diff / 60)
      const minutos = diff % 60

      data.tiempo_en_ruta =
        `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}`
    }

    ruta.merge(data)

    await ruta.save()

    return ruta
  }


  /*
  --------------------------------
  ELIMINAR RUTA
  --------------------------------
  */
  async destroy({ params }: HttpContext) {

    const ruta = await Ruta.findOrFail(params.id)

    await ruta.delete()

    return {
      message: 'Ruta eliminada correctamente'
    }
  }

}
