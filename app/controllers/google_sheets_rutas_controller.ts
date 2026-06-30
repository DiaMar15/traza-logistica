import type { HttpContext } from '@adonisjs/core/http'

import Ruta from '#models/ruta'
import Conductor from '#models/conductores'
import Vehiculo from '#models/vehiculo'
import Personal from '#models/personal'

import { limpiarTexto, limpiarNumero, limpiarDinero, limpiarHora } from '../utils/limpieza.ts'

export default class GoogleSheetsRutasController {
  async sync({ response }: HttpContext) {
    const SHEET_ID = '11PO2p9GI5FEJ8mRwESr9Iyg7DnNKBbrShRajR3SRTBg'

    const rutasUrl = `https://opensheet.elk.sh/${SHEET_ID}/API_RUTAS`

    const vehiculosUrl = `https://opensheet.elk.sh/${SHEET_ID}/Datosvehiculos`

    const personalUrl = `https://opensheet.elk.sh/${SHEET_ID}/PERSONAL_SYNC`
    /* ==========================
       FETCH RUTAS
    ========================== */

    let data: any[] = []

    try {
      const rutasRes = await fetch(rutasUrl)

      if (!rutasRes.ok) {
        throw new Error('Error consultando hoja de rutas')
      }

      const rutasData = await rutasRes.json()

      if (!Array.isArray(rutasData)) {
        console.error(rutasData)

        throw new Error('La respuesta de rutas no es un array')
      }

      data = rutasData
    } catch (error) {
      console.error(error)

      return response.badRequest({
        message: 'No fue posible obtener rutas desde Google Sheets',
      })
    }

    /* ==========================
       FETCH VEHICULOS
    ========================== */

    let vehiculosData: any[] = []

    try {
      const vehiculosRes = await fetch(vehiculosUrl)

      if (!vehiculosRes.ok) {
        throw new Error('Error consultando hoja de vehículos')
      }

      const dataVehiculos = await vehiculosRes.json()

      if (!Array.isArray(dataVehiculos)) {
        console.error(dataVehiculos)

        throw new Error('La respuesta de vehículos no es un array')
      }

      vehiculosData = dataVehiculos
    } catch (error) {
      console.error(error)

      return response.badRequest({
        message: 'No fue posible obtener vehículos desde Google Sheets',
      })
    }

    const errores: any[] = []

    let creados = 0

    let vehiculosSync = 0

    await Ruta.query().delete()

    await Vehiculo.query().delete()

    await Personal.query().delete()

    /* ==========================
       VEHICULOS
    ========================== */

    for (const row of vehiculosData) {
      const dataNormalizada: any = {}

      for (const key in row) {
        const nuevaKey = String(key).trim().toUpperCase()

        dataNormalizada[nuevaKey] = row[key]
      }

      const placa = limpiarTexto(dataNormalizada['PLACA'])

      if (!placa || placa === 'PLACA') {
        continue
      }

      const tipo = limpiarTexto(dataNormalizada['TIPO'])

      const capacidadTexto = String(dataNormalizada['CAP KILO'] || '')
        .replace(',', '.')
        .trim()

      const capacidad = Number.parseFloat(capacidadTexto) || null

      let modelo = limpiarTexto(dataNormalizada['MODELO'])

      if (modelo === '4,7' || modelo === '6' || modelo === '8') {
        modelo = ''
      }

      const claseVehiculo = limpiarTexto(dataNormalizada['CLASE VEHICULO'])

      const marca = limpiarTexto(dataNormalizada['MARCA'])

      const conductorFijo =
        limpiarTexto(dataNormalizada['CONDUCTOR FIJO']) ||
        limpiarTexto(dataNormalizada['CONDUCTOR_FIJO']) ||
        limpiarTexto(dataNormalizada['CONDUCTOR  FIJO']) ||
        ''

      let estado = 'ACTIVO'

      const estadoSheet = limpiarTexto(dataNormalizada['ESTADO']) || ''

      if (
        estadoSheet.toUpperCase().includes('RETIRADO') ||
        claseVehiculo.toUpperCase().includes('RETIRADOS') ||
        marca.toUpperCase().includes('RETIRADOS')
      ) {
        estado = 'RETIRADO'
      }

      await Vehiculo.create({
        placa,

        tipo,

        capacidad_kilo: capacidad,

        modelo: modelo || null,

        clase_vehiculo: claseVehiculo.includes('RETIRADOS') ? null : claseVehiculo,

        marca: marca.includes('RETIRADOS') ? null : marca,

        conductor_fijo: conductorFijo,

        estado,

        activo: estado === 'ACTIVO',
      })

      vehiculosSync++
    }
    let personalData: any[] = []

    try {
      const personalRes = await fetch(personalUrl)

      if (!personalRes.ok) {
        throw new Error('Error consultando hoja de personal')
      }

      const dataPersonal = await personalRes.json()

      if (!Array.isArray(dataPersonal)) {
        throw new Error('La respuesta de personal no es un array')
      }

      personalData = dataPersonal
    } catch (error) {
      console.error(error)

      return response.badRequest({
        message: 'No fue posible obtener personal desde Google Sheets',
      })
    }

    /* ==========================
   PERSONAL
========================== */

    let personalSync = 0

    for (const row of personalData) {
      const nombre = limpiarTexto(row['NOMBRE'] ?? row['Nombre'] ?? '')
      if (!nombre) {
        continue
      }

      await Personal.create({
        nombre,

        celular: String(row['CELULAR'] ?? row['Celular'] ?? '').trim() || null,

        cargo: limpiarTexto(row['CARGO'] ?? row['Cargo'] ?? '') || '',

        cedula: String(row['CEDULA'] ?? row['Cedula'] ?? '').trim() || null,

        estado: limpiarTexto(row['ESTADO'] ?? row['Estado'] ?? '') || 'ACTIVO',
      })

      personalSync++
    }

    /* ==========================
       RUTAS
    ========================== */

    for (const row of data) {
      if (row['PLACA'] === 'PLACA') {
        continue
      }

      if (!row || Object.keys(row).length === 0) {
        continue
      }

      const placa = limpiarTexto(row['PLACA'])

      if (!placa) {
        continue
      }

      const kmInicial = limpiarNumero(row['KM INICIAL'])

      const kmFinal = limpiarNumero(row['KM FINAL'])

      if (kmFinal && kmFinal < kmInicial) {
        errores.push({
          error: 'KM inconsistente',

          placa,

          kmInicial,

          kmFinal,
        })

        continue
      }

      const conductorNombre = limpiarTexto(row['CONDUCTOR'])

      const auxiliarNombre = limpiarTexto(row['AUXILIAR'])

      const apoyoNombre = limpiarTexto(row['APOYO AUXLIAR'])

      const personasRaw = [conductorNombre, auxiliarNombre, apoyoNombre]

      const personas: string[] = []

      for (const item of personasRaw) {
        if (!item) {
          continue
        }

        const separados = item
          .split('-')
          .map((p: string) => p.trim())
          .filter(Boolean)

        personas.push(...separados)
      }

      for (const persona of personas) {
        if (!persona) {
          continue
        }

        const nombre = persona
          .replace(/^\d+\s*/g, '')
          .replace(/\(\d+\)/g, '')
          .replace(/¡MBOCAR/gi, '')
          .replace(/\s+/g, ' ')
          .toUpperCase()
          .trim()

        const nombreUpper = nombre.toUpperCase()

        if (!nombre) {
          continue
        }

        if (nombre === '-' || nombre === '--') {
          continue
        }

        if (nombreUpper.includes('APOYO')) {
          continue
        }

        if (nombre.includes('$')) {
          continue
        }

        if (/^\d+$/.test(nombre)) {
          continue
        }

        if (nombre.length < 5) {
          continue
        }

        if (nombre.includes('"')) {
          continue
        }

        const existe = await Conductor.query().whereRaw('UPPER(nombre) = ?', [nombre]).first()

        if (!existe) {
          await Conductor.create({
            nombre,

            estado: 'activo',
          })
        }
      }

      const dataLimpia = {
        placa,

        conductor: conductorNombre,

        empresa: limpiarTexto(row['EMPRESA']),

        destino: limpiarTexto(row['DESTINO']),

        fecha: limpiarTexto(row['FECHA']),

        mes: limpiarTexto(row['MES']),

        dia: limpiarTexto(row['DIA']),

        festivos: limpiarTexto(row['FESTIVOS']),

        tipoVehiculo: limpiarTexto(row['TIPO VEHICULO']),

        capacidadKg: limpiarNumero(row['CAPACIDAD KG']),

        auxiliar: auxiliarNombre,

        destinoTipologia: limpiarTexto(row['DESTINO TIPOLOGIA']),

        tarifa: limpiarDinero(row['TARIFA']),

        combustible: limpiarDinero(row['COMBUSTIBLE']),

        peajes: limpiarDinero(row['PEAJES']),

        calibrada: limpiarDinero(row['CALIBRADA']),

        parqueadero: limpiarDinero(row['PARQUEADERO']),

        taxis: limpiarDinero(row['TAXIS']),

        apoyoAuxiliar: apoyoNombre,

        ruta: limpiarTexto(row['Ruta']),

        zona: limpiarTexto(row['Zona']),

        planilla: limpiarTexto(row['N° PLANILLA']),

        peso: limpiarNumero(row['PESO']),

        volumen: limpiarNumero(row['VOLUMEN']),

        numeroFacturas: limpiarNumero(row['N° FACTURAS']),

        numeroClientes: limpiarNumero(row['N° CLIENTES']),

        reenvio: limpiarNumero(row['REENVIO']),

        valorReenvio: limpiarDinero(row['VALOR REENVIO']),

        valorRuta: limpiarDinero(row['VALOR RUTA']),

        valorDevolucion: limpiarDinero(row['VALOR DEVOLUCION FACTURAS']),

        efectividad: limpiarTexto(row['% EFECTIVIDAD FACTURAS']),

        inicioRuta: limpiarHora(row['PROGRAMACION RUTA']),

        finRuta: limpiarHora(row['FIN RUTA']),

        tiempoEnRuta: limpiarTexto(row['TIEMPO EN RUTA']),

        turno: limpiarTexto(row['TURNO']),

        horaExtra: limpiarTexto(row['HORA EXTRA RUTA']),

        kmInicial,

        kmFinal,

        totalKilometros:
          kmFinal && kmInicial ? kmFinal - kmInicial : limpiarNumero(row['TOTAL KILOMETROS']),

        semana: limpiarTexto(row['SEMANA']),

        observaciones: limpiarTexto(row['OBSERVACIONES Y/O NOVEDADES']),
      }

      const existeRuta = await Ruta.query()
        .where('placa', placa)
        .where('fecha', dataLimpia.fecha)
        .where('ruta', dataLimpia.ruta)
        .where('conductor', dataLimpia.conductor)
        .first()

      if (existeRuta) {
        continue
      }

      await Ruta.create(dataLimpia)

      creados++
    }

    return response.ok({
      message: 'Sincronización completa',

      creados,

      vehiculos: vehiculosSync,

      personal: personalSync,

      errores: errores.length,

      detalleErrores: errores.slice(0, 10),
    })
  }
}
