import Vehiculo from '#models/vehiculo'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehiculosController {
  async index() {
    return await Vehiculo.query().orderBy('placa', 'asc')
  }

  async store({ request, response }: HttpContext) {
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

    const placa = String(data.placa || '')
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '')

    if (!placa) {
      return response.badRequest({
        message: 'La placa es obligatoria',
      })
    }

    const existe = await Vehiculo.findBy('placa', placa)

    if (existe) {
      return response.badRequest({
        message: 'La placa ya existe',
      })
    }

    const estado = String(data.estado || 'ACTIVO').toUpperCase()

    const activo = estado === 'ACTIVO'

    let modelo = String(data.modelo || '')
      .trim()
      .toUpperCase()

    if (modelo === '4,7' || modelo === '6' || modelo === '8') {
      modelo = ''
    }

    const vehiculo = await Vehiculo.create({
      placa,

      tipo: data.tipo?.trim().toUpperCase() || null,

      capacidad_kilo: Number(data.capacidad_kilo) || null,

      modelo: modelo || null,

      clase_vehiculo: data.clase_vehiculo?.trim().toUpperCase() || null,

      marca: data.marca?.trim().toUpperCase() || null,

      conductor_fijo: data.conductor_fijo?.trim() || null,

      estado,

      activo,
    })

    return vehiculo
  }

  async update({ params, request, response }: HttpContext) {
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

    const placa = String(data.placa || '')
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '')

    const duplicado = await Vehiculo.query()
      .where('placa', placa)
      .whereNot('id', vehiculo.id)
      .first()

    if (duplicado) {
      return response.badRequest({
        message: 'Ya existe otro vehículo con esa placa',
      })
    }

    const estado = String(data.estado || 'ACTIVO').toUpperCase()

    const activo = estado === 'ACTIVO'

    let modelo = String(data.modelo || '')
      .trim()
      .toUpperCase()

    if (modelo === '4,7' || modelo === '6' || modelo === '8') {
      modelo = ''
    }

    vehiculo.merge({
      placa,

      tipo: data.tipo?.trim().toUpperCase() || null,

      capacidad_kilo: Number(data.capacidad_kilo) || null,

      modelo: modelo || null,

      clase_vehiculo: data.clase_vehiculo?.trim().toUpperCase() || null,

      marca: data.marca?.trim().toUpperCase() || null,

      conductor_fijo: data.conductor_fijo?.trim() || null,

      estado,

      activo,
    })

    await vehiculo.save()

    return vehiculo
  }

  async destroy({ params }: HttpContext) {
    const vehiculo = await Vehiculo.findOrFail(params.id)

    vehiculo.estado = 'RETIRADO'

    vehiculo.activo = false

    await vehiculo.save()

    return {
      message: 'Vehículo retirado correctamente',
    }
  }

  async sincronizar({ response }: HttpContext) {
    const SHEET_ID = '11PO2p9GI5FEJ8mRwESr9Iyg7DnNKBbrShRajR3SRTBg'

    const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/DatosVehiculos`

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

    let creados = 0

    let actualizados = 0

    let omitidos = 0

    for (const row of rows) {
      console.log(Object.keys(row))

      const dataNormalizada: any = {}

      for (const key in row) {
        const nuevaKey = String(key).trim().toUpperCase()

        dataNormalizada[nuevaKey] = row[key]
      }

      const placa = String(dataNormalizada['PLACA'] || '')
        .trim()
        .toUpperCase()
        .replace(/\s+/g, '')

      if (!placa || placa === 'PLACA') {
        omitidos++
        continue
      }

      const tipo = String(dataNormalizada['TIPO'] || '')
        .trim()
        .toUpperCase()

      const capacidadTexto = String(
        dataNormalizada['CAP KILO'] ||
          dataNormalizada['CAP KILO '] ||
          dataNormalizada['CAP_KILO'] ||
          dataNormalizada['CAPACIDAD'] ||
          ''
      )
        .replace(',', '.')
        .trim()

      const capacidad = Number.parseFloat(capacidadTexto) || null

      let modelo = String(dataNormalizada['MODELO'] || '')
        .trim()
        .toUpperCase()

      if (modelo === '4,7' || modelo === '6' || modelo === '8') {
        modelo = ''
      }

      const claseVehiculo = String(dataNormalizada['CLASE VEHICULO'] || '')
        .trim()
        .toUpperCase()

      const marca = String(dataNormalizada['MARCA'] || '')
        .trim()
        .toUpperCase()

      const conductorFijo = String(dataNormalizada['CONDUCTOR FIJO'] || '').trim()

      let estado = 'ACTIVO'

      const estadoSheet = String(dataNormalizada['ESTADO'] || '')
        .trim()
        .toUpperCase()

      if (
        estadoSheet.includes('RETIRADO') ||
        claseVehiculo.includes('RETIRADOS') ||
        marca.includes('RETIRADOS')
      ) {
        estado = 'RETIRADO'
      }

      const activo = estado === 'ACTIVO'

      const data = {
        tipo: tipo || null,

        capacidad_kilo: capacidad,

        modelo: modelo || null,

        clase_vehiculo: claseVehiculo.includes('RETIRADOS') ? null : claseVehiculo || null,

        marca: marca.includes('RETIRADOS') ? null : marca || null,

        conductor_fijo: conductorFijo || null,

        estado,

        activo,
      }

      const existente = await Vehiculo.findBy('placa', placa)

      if (existente) {
        existente.merge(data)

        await existente.save()

        actualizados++
      } else {
        await Vehiculo.create({
          placa,
          ...data,
        })

        creados++
      }
    }

    return response.ok({
      message: 'Vehículos sincronizados correctamente',

      total_sheet: rows.length,

      creados,

      actualizados,

      omitidos,
    })
  }

  async estadisticas() {
    const total = await Vehiculo.query().count('* as total')

    const activos = await Vehiculo.query().where('activo', true).count('* as total')

    const retirados = await Vehiculo.query().where('estado', 'RETIRADO').count('* as total')

    return {
      total: total[0].$extras.total,

      activos: activos[0].$extras.total,

      retirados: retirados[0].$extras.total,
    }
  }
}
