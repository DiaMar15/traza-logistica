import type { HttpContext } from '@adonisjs/core/http'
import ExcelJS from 'exceljs'
import Ruta from '#models/ruta'

export default class ImportExcelController {
  async importar({ request }: HttpContext) {
    const archivo = request.file('excel', {
      extnames: ['xlsx'],
      size: '10mb',
    })

    /*
    --------------------------------
    VALIDAR ARCHIVO
    --------------------------------
    */

    if (!archivo) {
      return {
        error: 'Debe subir un archivo Excel',
      }
    }

    /*
    --------------------------------
    LEER EXCEL
    --------------------------------
    */

    const workbook = new ExcelJS.Workbook()

    await workbook.xlsx.readFile(archivo.tmpPath!)

    const hoja = workbook.getWorksheet('BASE DATOS')

    if (!hoja) {
      return {
        error: 'No existe la hoja BASE DATOS',
      }
    }

    /*
    --------------------------------
    DETECTAR COLUMNAS
    --------------------------------
    */

    const encabezados: Record<string, number> = {}

    hoja.getRow(2).eachCell((cell, col) => {
      const valor = (cell.text || '')
        .toUpperCase()
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

      console.log('COLUMNA:', col, '=>', valor)

      /*
      --------------------------------
      HORA INICIO
      --------------------------------
      */

      if (valor.includes('PROGRAM') || valor.includes('INICIO')) {
        encabezados.inicio = col
      }

      /*
      --------------------------------
      HORA FIN
      --------------------------------
      */

      if (valor.includes('FIN RUTA') || valor === 'FIN') {
        encabezados.fin = col
      }

      /*
      --------------------------------
      KM
      --------------------------------
      */

      if (valor.includes('KM INICIAL')) {
        encabezados.kmInicial = col
      }

      if (valor.includes('KM FINAL')) {
        encabezados.kmFinal = col
      }

      /*
      --------------------------------
      DATOS GENERALES
      --------------------------------
      */

      if (valor.includes('PLACA')) {
        encabezados.placa = col
      }

      if (valor.includes('CONDUCTOR')) {
        encabezados.conductor = col
      }

      if (valor.includes('EMPRESA')) {
        encabezados.empresa = col
      }

      if (valor.includes('DESTINO') && !valor.includes('TIPOLOGIA')) {
        encabezados.destino = col
      }
    })

    console.log('ENCABEZADOS DETECTADOS:')
    console.log(encabezados)

    /*
    --------------------------------
    VALIDAR COLUMNAS
    --------------------------------
    */

    if (!encabezados.inicio) {
      return {
        error: 'No se detectó la columna PROGRAMACION RUTA',
      }
    }

    if (!encabezados.fin) {
      return {
        error: 'No se detectó la columna FIN RUTA',
      }
    }

    const rutas: any[] = []

    /*
    --------------------------------
    CONVERTIR HORAS
    --------------------------------
    */

    function convertirHora(valor: any) {
      if (!valor) return null

      /*
      --------------------------------
      SI ES FECHA
      --------------------------------
      */

      if (valor instanceof Date) {
        const h = String(valor.getHours()).padStart(2, '0')

        const m = String(valor.getMinutes()).padStart(2, '0')

        return `${h}:${m}`
      }

      /*
      --------------------------------
      SI ES NUMERO EXCEL
      --------------------------------
      */

      if (typeof valor === 'number') {
        const minutosTotales = Math.round(valor * 24 * 60)

        const horas = Math.floor(minutosTotales / 60)

        const minutos = minutosTotales % 60

        return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`
      }

      /*
      --------------------------------
      SI ES TEXTO
      --------------------------------
      */

      if (typeof valor === 'string') {
        valor = valor
          .replace(' a. m.', '')
          .replace(' p. m.', '')
          .replace(' AM', '')
          .replace(' PM', '')
          .trim()

        const partes = valor.split(':')

        if (partes.length >= 2) {
          return `${partes[0].padStart(2, '0')}:${partes[1].padStart(2, '0')}`
        }
      }

      return null
    }

    /*
    --------------------------------
    CALCULAR TIEMPO
    --------------------------------
    */

    function calcularTiempo(inicio: string, fin: string) {
      const [h1, m1] = inicio.split(':').map(Number)

      const [h2, m2] = fin.split(':').map(Number)

      const inicioMin = h1 * 60 + m1

      const finMin = h2 * 60 + m2

      let diff = finMin - inicioMin

      /*
      --------------------------------
      SI PASA MEDIANOCHE
      --------------------------------
      */

      if (diff < 0) {
        diff += 24 * 60
      }

      const horas = Math.floor(diff / 60)

      const minutos = diff % 60

      return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`
    }

    /*
    --------------------------------
    RECORRER FILAS
    --------------------------------
    */

    hoja.eachRow((row, index) => {
      if (index <= 2) return

      /*
      --------------------------------
      DATOS GENERALES
      --------------------------------
      */

      const placa = row.getCell(encabezados.placa)?.text?.trim() || ''

      const conductor = row.getCell(encabezados.conductor)?.text?.trim() || ''

      const empresa = row.getCell(encabezados.empresa)?.text?.trim() || ''

      const destino = row.getCell(encabezados.destino)?.text?.trim() || ''

      /*
      --------------------------------
      HORAS
      --------------------------------
      */

      const inicio = convertirHora(row.getCell(encabezados.inicio)?.value)

      const fin = convertirHora(row.getCell(encabezados.fin)?.value)

      /*
      --------------------------------
      VALIDAR HORAS
      --------------------------------
      */

      if (!inicio || !fin) {
        console.log('Fila ignorada por horas inválidas:', index)

        return
      }

      /*
      --------------------------------
      KM
      --------------------------------
      */

      const kmInicialRaw = row.getCell(encabezados.kmInicial)?.value

      const kmFinalRaw = row.getCell(encabezados.kmFinal)?.value

      const kmInicial = Number(kmInicialRaw)

      const kmFinal = Number(kmFinalRaw)

      /*
      --------------------------------
      VALIDAR KM
      --------------------------------
      */

      if (Number.isNaN(kmInicial) || Number.isNaN(kmFinal)) {
        console.log('Fila ignorada por KM inválido:', index)

        return
      }

      /*
      --------------------------------
      CALCULAR TIEMPO
      --------------------------------
      */

      const tiempo = calcularTiempo(inicio, fin)

      const hoy = new Date()

      rutas.push({
        placa,
        conductor,
        empresa,
        destino,

        fecha: hoy.toISOString().split('T')[0],

        mes: hoy.toLocaleString('es', {
          month: 'long',
        }),

        dia: hoy.toLocaleString('es', {
          weekday: 'long',
        }),

        inicio_ruta: inicio,
        fin_ruta: fin,
        tiempo_en_ruta: tiempo,

        km_inicial: kmInicial,
        km_final: kmFinal,

        total_kilometros: Math.max(0, kmFinal - kmInicial),
      })
    })

    /*
    --------------------------------
    INSERTAR SIN DUPLICADOS
    --------------------------------
    */

    let insertados = 0

    for (const ruta of rutas) {
      const existe = await Ruta.query()
        .where('placa', ruta.placa)
        .where('inicio_ruta', ruta.inicio_ruta)
        .where('fin_ruta', ruta.fin_ruta)
        .first()

      if (!existe) {
        await Ruta.create(ruta)

        insertados++
      }
    }

    /*
    --------------------------------
    RESPUESTA FINAL
    --------------------------------
    */

    return {
      message: 'Importación completada',

      procesados: rutas.length,

      insertados,

      duplicados: rutas.length - insertados,
    }
  }
}
