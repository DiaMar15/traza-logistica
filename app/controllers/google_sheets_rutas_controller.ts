import type { HttpContext } from '@adonisjs/core/http'
import Ruta from '#models/ruta'

import {
  limpiarTexto,
  limpiarNumero,
  limpiarDinero,
  limpiarHora
} from '../utils/limpieza.ts'

export default class GoogleSheetsRutasController {

  async sync({ response }: HttpContext) {

    const SHEET_ID = "11PO2p9GI5FEJ8mRwESr9Iyg7DnNKBbrShRajR3SRTBg"

    const url = `https://opensheet.elk.sh/${SHEET_ID}/API_RUTAS`

    const res = await fetch(url)
    const data = (await res.json()) as any[]

    const errores: any[] = []
    let creados = 0
    let actualizados = 0

    for (const row of data) {

      // Evitar duplicados en encabezados
      if (row["PLACA"] === "PLACA") continue

      // ignorar filas vacías
      if (!row || Object.keys(row).length === 0) continue

      const placa = limpiarTexto(row["PLACA"])
      const planilla = limpiarTexto(row["N° planilla"])

      // ignorar filas sin placa
      if (!placa) continue

      const kmInicial = limpiarNumero(row["KM INICIAL"])
      const kmFinal = limpiarNumero(row["KM FINAL"])

      // validación de kilómetros
      if (kmFinal < kmInicial) {
        errores.push({
          error: "KM inconsistente",
          placa,
          kmInicial,
          kmFinal
        })
        continue
      }

      // buscar y evitar duplicado (placa + planilla)
      let rutaExistente = null

      if (planilla) {
        rutaExistente = await Ruta
          .query()
          .where('placa', placa)
          .where('planilla', planilla)
          .first()
      }

      const dataLimpia = {

        placa,
        conductor: limpiarTexto(row["CONDUCTOR"]),
        empresa: limpiarTexto(row["EMPRESA"]),
        destino: limpiarTexto(row["DESTINO"]),

        fecha: limpiarTexto(row["FECHA"]),
        mes: limpiarTexto(row["MES"]),
        dia: limpiarTexto(row["DIA"]),
        festivos: limpiarTexto(row["FESTIVOS"]),

        tipoVehiculo: limpiarTexto(row["TIPO VEHICULO"]),
        capacidadKg: limpiarNumero(row["CAPACIDAD KG"]),

        auxiliar: limpiarTexto(row["AUXILIAR"]),
        destinoTipologia: limpiarTexto(row["DESTINO TIPOLOGIA"]),

        tarifa: limpiarDinero(row["TARIFA"]),
        combustible: limpiarDinero(row["COMBUSTIBLE"]),
        peajes: limpiarDinero(row["PEAJES"]),
        calibrada: limpiarDinero(row["CALIBRADA"]),
        parqueadero: limpiarDinero(row["PARQUEADERO"]),
        taxis: limpiarDinero(row["TAXIS"]),
        apoyoAuxiliar: limpiarTexto(row["APOYO AUXLIAR"]),

        ruta: limpiarTexto(row["Ruta"]),
        zona: limpiarTexto(row["Zona"]),
        planilla,

        peso: limpiarNumero(row["PESO"]),
        volumen: limpiarNumero(row["VOLUMEN"]),

        numeroFacturas: limpiarNumero(row["N° FACTURAS"]),
        numeroClientes: limpiarNumero(row["N° CLIENTES"]),

        reenvio: limpiarNumero(row["REENVIO"]),

        valorReenvio: limpiarDinero(row["VALOR REENVIO"]),
        valorRuta: limpiarDinero(row[" VALOR RUTA "]),
        valorDevolucion: limpiarDinero(row[" VALOR DEVOLUCION FACTURAS "]),

        efectividad: limpiarTexto(row["% EFECTIVIDAD FACTURAS"]),

        inicioRuta: limpiarHora(row["INICIO RUTA"]),
        finRuta: limpiarHora(row["FIN RUTA"]),
        tiempoEnRuta: limpiarHora(row["TIEMPO EN RUTA"]),

        turno: limpiarTexto(row["TURNO"]),
        horaExtra: limpiarTexto(row["HORA EXTRA RUTA"]),

        kmInicial,
        kmFinal,
        totalKilometros: limpiarNumero(row["TOTAL KILOMETROS"]),

        semana: limpiarTexto(row["SEMANA"]),
        observaciones: limpiarTexto(row["Observaciones y/o novedades"])
      }

      // (crear o actualizar)
      if (rutaExistente) {

        await rutaExistente.merge(dataLimpia).save()
        actualizados++

      } else {

        await Ruta.create(dataLimpia)
        creados++

      }
    }

    return response.ok({
      message: "Sincronización completa",
      creados,
      actualizados,
      errores: errores.length,
      detalleErrores: errores.slice(0, 10)
    })
  }

}
