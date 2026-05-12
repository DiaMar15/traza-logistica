import Ruta from '#models/ruta'
import type { HttpContext } from '@adonisjs/core/http'

import { createRutaValidator, patchRutaValidator } from '#validators/ruta'

export default class RutasController {
  /*
--------------------------------
PAGINAR RUTAS
--------------------------------
*/

  async index({ request }: HttpContext) {
    const page = request.input('page', 1)

    const limit = request.input('limit', 10)

    const q = request.input('q', '')

    const query = Ruta.query()

      .orderBy('id', 'desc')

    /*
  --------------------------------
  BUSCADOR
  --------------------------------
  */

    if (q) {
      query

        .where('placa', 'like', `%${q}%`)

        .orWhere('conductor', 'like', `%${q}%`)

        .orWhere('auxiliar', 'like', `%${q}%`)

        .orWhere('empresa', 'like', `%${q}%`)

        .orWhere('destino', 'like', `%${q}%`)

        .orWhere('zona', 'like', `%${q}%`)

        .orWhere('inicio_ruta', 'like', `%${q}%`)

        .orWhere('fin_ruta', 'like', `%${q}%`)

        .orWhere('tiempo_en_ruta', 'like', `%${q}%`)
    }

    const rutas = await query.paginate(page, limit)

    /*
  --------------------------------
  RESPONSE
  --------------------------------
  */

    return {
      data: rutas.all(),

      meta: rutas.getMeta(),
    }
  }

  /*
  --------------------------------
  MOSTRAR UNA RUTA
  --------------------------------
  */

  async show({ params, response }: HttpContext) {
    const ruta = await Ruta.findOrFail(params.id)

    return response.ok(ruta)
  }

  /*
  --------------------------------
  CREAR
  --------------------------------
  */

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createRutaValidator)

    /*
    --------------------------------
    TOTAL KM
    --------------------------------
    */

    data.total_kilometros = Number(data.km_final || 0) - Number(data.km_inicial || 0)

    /*
    --------------------------------
    TIEMPO EN RUTA
    --------------------------------
    */

    if (data.inicio_ruta && data.fin_ruta) {
      const [h1, m1] = data.inicio_ruta.split(':').map(Number)

      const [h2, m2] = data.fin_ruta.split(':').map(Number)

      const inicioMin = h1 * 60 + m1

      const finMin = h2 * 60 + m2

      const diff = finMin - inicioMin

      const horas = Math.floor(diff / 60)

      const minutos = diff % 60

      data.tiempo_en_ruta =
        `${String(horas).padStart(2, '0')}:` + `${String(minutos).padStart(2, '0')}`
    }

    const ruta = await Ruta.create(data)

    return response.created(ruta)
  }

  /*
  --------------------------------
  ACTUALIZAR
  --------------------------------
  */

  async update({ params, request, response }: HttpContext) {
    const ruta = await Ruta.findOrFail(params.id)

    const data = await request.validateUsing(createRutaValidator)

    /*
    --------------------------------
    TOTAL KM
    --------------------------------
    */

    data.total_kilometros = Number(data.km_final || 0) - Number(data.km_inicial || 0)

    /*
    --------------------------------
    TIEMPO EN RUTA
    --------------------------------
    */

    if (data.inicio_ruta && data.fin_ruta) {
      const [h1, m1] = data.inicio_ruta.split(':').map(Number)

      const [h2, m2] = data.fin_ruta.split(':').map(Number)

      const inicioMin = h1 * 60 + m1

      const finMin = h2 * 60 + m2

      const diff = finMin - inicioMin

      const horas = Math.floor(diff / 60)

      const minutos = diff % 60

      data.tiempo_en_ruta =
        `${String(horas).padStart(2, '0')}:` + `${String(minutos).padStart(2, '0')}`
    }

    ruta.merge(data)

    await ruta.save()

    return response.ok(ruta)
  }

  /*
  --------------------------------
  PATCH
  --------------------------------
  */

  async patch({ params, request, response }: HttpContext) {
    const ruta = await Ruta.findOrFail(params.id)

    const data = await request.validateUsing(patchRutaValidator)

    ruta.merge(data)

    await ruta.save()

    return response.ok(ruta)
  }

  /*
  --------------------------------
  ELIMINAR
  --------------------------------
  */

  async destroy({ params, response }: HttpContext) {
    const ruta = await Ruta.findOrFail(params.id)

    await ruta.delete()

    return response.ok({
      message: 'Ruta eliminada correctamente',
    })
  }

  /*
  --------------------------------
  TOTAL RUTAS
  --------------------------------
  */

  async count({ response }: HttpContext) {
    const total = await Ruta.query().count('* as total')

    return response.ok({
      total: total[0].$extras.total,
    })
  }

  /*
  --------------------------------
  TOTAL KM
  --------------------------------
  */

  async kilometros({ response }: HttpContext) {
    const total = await Ruta.query().sum('total_kilometros as total')

    return response.ok({
      total: total[0].$extras.total || 0,
    })
  }

  /*
  --------------------------------
  BUSCAR
  --------------------------------
  */

  async buscar({ request, response }: HttpContext) {
    const q = request.input('q', '')

    const rutas = await Ruta.query()

      .where('placa', 'like', `%${q}%`)

      .orWhere('conductor', 'like', `%${q}%`)

      .orWhere('destino', 'like', `%${q}%`)

      .limit(20)

    return response.ok(rutas)
  }

  /*
  --------------------------------
  RENDIMIENTO
  --------------------------------
  */

  async rendimiento({ response }: HttpContext) {
    const rutas = await Ruta.query()

    return response.ok(rutas)
  }

  /*
  --------------------------------
  COSTOS
  --------------------------------
  */

  async costos({ response }: HttpContext) {
    const rutas = await Ruta.query()

    return response.ok(rutas)
  }

  /*
  --------------------------------
  PERSONAL
  --------------------------------
  */

  async personal({ response }: HttpContext) {
    const rutas = await Ruta.query()

    return response.ok(rutas)
  }
}
