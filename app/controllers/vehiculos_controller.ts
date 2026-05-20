import Vehiculo from '#models/vehiculo'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehiculosController {
  /* --------------------------
     LISTAR
  -------------------------- */

  async index() {
    return await Vehiculo.query().orderBy('placa')
  }

  /* --------------------------
     CREAR
  -------------------------- */

  async store({ request }: HttpContext) {
    const data = request.only([
      'placa',

      'tipo',

      'capacidad_kilo',

      'modelo',

      'clase_vehiculo',

      'marca',

      'conductor_fijo',

      'estado',
    ])

    return await Vehiculo.create(data)
  }

  /* --------------------------
     ACTUALIZAR
  -------------------------- */

  async update({ params, request }: HttpContext) {
    const vehiculo = await Vehiculo.findOrFail(params.id)

    const data = request.only([
      'placa',

      'tipo',

      'capacidad_kilo',

      'modelo',

      'clase_vehiculo',

      'marca',

      'conductor_fijo',

      'estado',
    ])

    vehiculo.merge(data)

    await vehiculo.save()

    return vehiculo
  }

  /* --------------------------
     ELIMINAR
  -------------------------- */

  async destroy({ params }: HttpContext) {
    const vehiculo = await Vehiculo.findOrFail(params.id)

    await vehiculo.delete()

    return {
      message: 'Vehículo eliminado',
    }
  }

  /* --------------------------
     SINCRONIZAR
  -------------------------- */

  async sincronizar() {
    /* --------------------------
       SHEETS
    -------------------------- */

    const SHEET_ID = '11PO2p9GI5FEJ8mRwESr9Iyg7DnNKBbrShRajR3SRTBg'

    const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/Datos vehículos`

    /* --------------------------
       FETCH
    -------------------------- */

    const response = await fetch(SHEET_URL)

    const rows = (await response.json()) as any[]

    /* --------------------------
       LIMPIAR TABLA
    -------------------------- */

    await Vehiculo.query().delete()

    /* --------------------------
       RECORRER
    -------------------------- */

    for (const row of rows) {
      const placa = String(row['PLACA'] || '').trim()

      if (!placa) {
        continue
      }

      /* --------------------------
         ESTADO
      -------------------------- */

      let estado = 'ACTIVO'

      if (
        String(row['ESTADO'] || '')
          .toUpperCase()

          .includes('RETIRADO')
      ) {
        estado = 'RETIRADO'
      }

      /* --------------------------
         CREAR
      -------------------------- */

      await Vehiculo.create({
        placa,

        tipo: row['TIPO'] || null,

        capacidad_kilo: Number(row['CAP KILO']) || null,

        modelo: String(row['MODELO'] || ''),

        clase_vehiculo: row['CLASE VEHICULO'] || null,

        marca: row['MARCA'] || null,

        conductor_fijo: row['CONDUCTOR FIJO'] || null,

        estado,
      })
    }

    /* --------------------------
       RESPONSE
    -------------------------- */

    return {
      message: 'Vehículos sincronizados',

      total: rows.length,
    }
  }
}
