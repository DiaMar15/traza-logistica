import type { HttpContext } from '@adonisjs/core/http'

import Database from '@adonisjs/lucid/services/db'

import Conductor from '#models/conductor'

export default class ConductoresController {
  /* --------------------------
     LISTAR
  -------------------------- */
  async index({ request, response }: HttpContext) {
    const estado = request.input('estado')

    const query = Conductor.query()

    if (estado) {
      query.where('estado', estado)
    }

    const conductores = await query.orderBy('nombre', 'asc')

    return response.ok(conductores)
  }

  /* --------------------------
     CREAR
  -------------------------- */
  async store({ request, response }: HttpContext) {
    const data = request.only(['nombre'])

    if (!data.nombre) {
      return response.badRequest({
        message: 'El nombre es obligatorio',
      })
    }

    const existe = await Conductor.query()
      .whereRaw('LOWER(nombre) = ?', [data.nombre.toLowerCase()])
      .first()

    if (existe) {
      return response.badRequest({
        message: 'El conductor ya existe',
      })
    }

    const conductor = await Conductor.create({
      nombre: data.nombre.trim(),

      estado: 'activo',
    })

    return response.created({
      message: 'Conductor creado correctamente',

      conductor,
    })
  }

  /* --------------------------
     ACTUALIZAR
  -------------------------- */
  async update({ params, request, response }: HttpContext) {
    const conductor = await Conductor.find(params.id)

    if (!conductor) {
      return response.notFound({
        message: 'Conductor no encontrado',
      })
    }

    const data = request.only(['nombre'])

    if (!data.nombre) {
      return response.badRequest({
        message: 'El nombre es obligatorio',
      })
    }

    conductor.nombre = data.nombre.trim()

    await conductor.save()

    return response.ok({
      message: 'Conductor actualizado correctamente',

      conductor,
    })
  }

  /* --------------------------
     INACTIVAR
  -------------------------- */
  async inactivar({ params, response }: HttpContext) {
    const conductor = await Conductor.find(params.id)

    if (!conductor) {
      return response.notFound({
        message: 'Conductor no encontrado',
      })
    }

    conductor.estado = 'inactivo'

    await conductor.save()

    return response.ok({
      message: 'Conductor inactivado correctamente',

      conductor,
    })
  }

  /* --------------------------
     REACTIVAR
  -------------------------- */
  async reactivar({ params, response }: HttpContext) {
    const conductor = await Conductor.find(params.id)

    if (!conductor) {
      return response.notFound({
        message: 'Conductor no encontrado',
      })
    }

    conductor.estado = 'activo'

    await conductor.save()

    return response.ok({
      message: 'Conductor reactivado correctamente',

      conductor,
    })
  }

  /* --------------------------
     DEBUG RUTAS
  -------------------------- */
  async sync({ response }: HttpContext) {
    const rutas = await Database.from('rutas')

    console.log(rutas)

    return response.ok({
      total: rutas.length,

      primera: rutas[0] || null,
    })
  }

  /* --------------------------
     LIMPIAR TABLA
  -------------------------- */
  async truncate({ response }: HttpContext) {
    await Database.rawQuery('TRUNCATE TABLE conductores')

    return response.ok({
      message: 'Tabla conductores limpiada',
    })
  }
}
