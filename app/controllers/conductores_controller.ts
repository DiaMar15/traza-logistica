import type { HttpContext } from '@adonisjs/core/http'

import Database from '@adonisjs/lucid/services/db'

import Conductor from '#models/conductores'

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
    const data = request.only(['nombre', 'cedula', 'celular', 'cargo'])
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

      cedula: data.cedula,

      celular: data.celular,

      cargo: data.cargo,

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

    const data = request.only(['nombre', 'cedula', 'celular', 'cargo'])
    if (!data.nombre) {
      return response.badRequest({
        message: 'El nombre es obligatorio',
      })
    }

    conductor.nombre = data.nombre.trim()

    conductor.cedula = data.cedula

    conductor.celular = data.celular

    conductor.cargo = data.cargo

    await conductor.save()
    await conductor.save()

    return response.ok({
      message: 'Conductor actualizado correctamente',

      conductor,
    })
  }

  /* --------------------------
   SINCRONIZAR PERSONAL
-------------------------- */
  async sincronizar({ response }: HttpContext) {
    const SHEET_ID = '11PO2p9GI5FEJ8mRwESr9Iyg7DnNKBbrShRajR3SRTBg'

    const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/PERSONAL_SYNC`

    let rows: any[] = []

    try {
      const responseFetch = await fetch(SHEET_URL)

      if (!responseFetch.ok) {
        throw new Error('Error consultando Google Sheets')
      }

      const data = await responseFetch.json()

      if (!Array.isArray(data)) {
        console.error(data)

        throw new Error('La respuesta no es un array')
      }

      rows = data
    } catch (error) {
      console.error(error)

      return response.badRequest({
        message: 'No fue posible conectar con Google Sheets',
      })
    }

    // -------------------------------------
    // LIMPIAR TABLA
    // -------------------------------------

    await Database.rawQuery('TRUNCATE TABLE conductores')

    let creados = 0
    let omitidos = 0

    for (const row of rows) {
      const dataNormalizada: any = {}

      for (const key in row) {
        dataNormalizada[String(key).trim().toUpperCase()] = row[key]
      }

      const nombre = String(dataNormalizada['NOMBRE'] || '')
        .trim()
        .toUpperCase()

      const cedula = String(dataNormalizada['CEDULA'] || '').trim()

      const celular = String(dataNormalizada['CELULAR'] || '').trim()

      const cargo = String(dataNormalizada['CARGO'] || '')
        .trim()
        .toUpperCase()

      const estadoSheet = String(dataNormalizada['ESTADO'] || '')
        .trim()
        .toUpperCase()

      if (!nombre || !cedula) {
        omitidos++
        continue
      }

      const estado: 'activo' | 'inactivo' = estadoSheet === 'ACTIVO' ? 'activo' : 'inactivo'

      await Conductor.create({
        nombre,
        cedula,
        celular,
        cargo,
        estado,
      })

      creados++
    }

    return response.ok({
      message: 'Personal sincronizado correctamente',

      total_sheet: rows.length,

      creados,

      actualizados: 0,

      omitidos,
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
