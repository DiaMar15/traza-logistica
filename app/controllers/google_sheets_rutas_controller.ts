import type { HttpContext } from '@adonisjs/core/http'

import Ruta from '#models/ruta'
import Conductor from '#models/conductor'

import { limpiarTexto, limpiarNumero, limpiarDinero, limpiarHora } from '../utils/limpieza.ts'

export default class GoogleSheetsRutasController {
  async sync({ response }: HttpContext) {
    const SHEET_ID = '11PO2p9GI5FEJ8mRwESr9Iyg7DnNKBbrShRajR3SRTBg'

    const url = `https://opensheet.elk.sh/${SHEET_ID}/API_RUTAS`

    const res = await fetch(url)

    const data = (await res.json()) as any[]

    const errores: any[] = []

    let creados = 0

    let actualizados = 0

    /* --------------------------
       RECORRER FILAS
    -------------------------- */

    for (const row of data) {
      /* --------------------------
         EVITAR ENCABEZADOS
      -------------------------- */

      if (row['PLACA'] === 'PLACA') {
        continue
      }

      /* --------------------------
         IGNORAR VACÍOS
      -------------------------- */

      if (!row || Object.keys(row).length === 0) {
        continue
      }

      const placa = limpiarTexto(row['PLACA'])

      const planilla = limpiarTexto(row['N° PLANILLA'])

      /* --------------------------
         IGNORAR SIN PLACA
      -------------------------- */

      if (!placa) {
        continue
      }

      const kmInicial = limpiarNumero(row['KM INICIAL'])

      const kmFinal = limpiarNumero(row['KM FINAL'])

      /* --------------------------
         VALIDAR KM
      -------------------------- */

      if (kmFinal && kmFinal < kmInicial) {
        errores.push({
          error: 'KM inconsistente',

          placa,

          kmInicial,

          kmFinal,
        })

        continue
      }

      /* --------------------------
         BUSCAR DUPLICADO
      -------------------------- */

      let rutaExistente = null

      if (planilla) {
        rutaExistente = await Ruta.query()

          .where('placa', placa)

          .where('planilla', planilla)

          .first()
      }

      /* --------------------------
         NOMBRES CRUDOS
      -------------------------- */

      const conductorNombre = limpiarTexto(row['CONDUCTOR'])

      const auxiliarNombre = limpiarTexto(row['AUXILIAR'])

      const apoyoNombre = limpiarTexto(row['APOYO AUXLIAR'])

      /* --------------------------
         PERSONAS RAW
      -------------------------- */

      const personasRaw = [conductorNombre, auxiliarNombre, apoyoNombre]

      /* --------------------------
         PERSONAS FINALES
      -------------------------- */

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

      /* --------------------------
         RECORRER PERSONAS
      -------------------------- */

      for (const persona of personas) {
        if (!persona) {
          continue
        }

        const nombre = persona

          // QUITAR CÓDIGOS
          .replace(/^\d+\s*/g, '')

          // QUITAR (1)
          .replace(/\(\d+\)/g, '')

          // QUITAR ¡MBOCAR
          .replace(/¡MBOCAR/gi, '')

          // ESPACIOS
          .replace(/\s+/g, ' ')

          // MAYÚSCULAS
          .toUpperCase()

          .trim()

        const nombreUpper = nombre.toUpperCase()

        /* --------------------------
           IGNORAR BASURA
        -------------------------- */

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

        /* --------------------------
           EXISTE
        -------------------------- */

        const existe = await Conductor.query()

          .whereRaw('UPPER(nombre) = ?', [nombre])

          .first()

        /* --------------------------
           CREAR
        -------------------------- */

        if (!existe) {
          await Conductor.create({
            nombre,

            estado: 'activo',
          })
        }
      }

      /* --------------------------
         DATA LIMPIA
      -------------------------- */

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

        ruta: limpiarTexto(row['RUTA']),

        zona: limpiarTexto(row['ZONA']),

        planilla,

        peso: limpiarNumero(row['PESO']),

        volumen: limpiarNumero(row['VOLUMEN']),

        numeroFacturas: limpiarNumero(row['N° FACTURAS']),

        numeroClientes: limpiarNumero(row['N° CLIENTES']),

        reenvio: limpiarNumero(row['REENVIO']),

        valorReenvio: limpiarDinero(row['VALOR REENVIO']),

        valorRuta: limpiarDinero(row['VALOR RUTA']),

        valorDevolucion: limpiarDinero(row['VALOR DEVOLUCION FACTURAS']),

        efectividad: limpiarTexto(row['% EFECTIVIDAD FACTURAS']),

        /*
        --------------------------------
        HORAS
        --------------------------------
        */

        inicioRuta: limpiarHora(row['PROGRAMACION RUTA']),

        finRuta: limpiarHora(row['FIN RUTA']),

        tiempoEnRuta: limpiarHora(row['TIEMPO EN RUTA']),

        turno: limpiarTexto(row['TURNO']),

        horaExtra: limpiarTexto(row['HORA EXTRA RUTA']),

        kmInicial,

        kmFinal,

        totalKilometros:
          kmFinal && kmInicial ? kmFinal - kmInicial : limpiarNumero(row['TOTAL KILOMETROS']),

        semana: limpiarTexto(row['SEMANA']),

        observaciones: limpiarTexto(row['OBSERVACIONES Y/O NOVEDADES']),
      }

      /* --------------------------
         CREAR / ACTUALIZAR
      -------------------------- */

      if (rutaExistente) {
        await rutaExistente.merge(dataLimpia).save()

        actualizados++
      } else {
        await Ruta.create(dataLimpia)

        creados++
      }
    }

    /* --------------------------
       RESPONSE
    -------------------------- */

    return response.ok({
      message: 'Sincronización completa',

      creados,

      actualizados,

      errores: errores.length,

      detalleErrores: errores.slice(0, 10),
    })
  }
}
