import type { HttpContext } from '@adonisjs/core/http'
import ExcelJS from 'exceljs'
import Ruta from '#models/ruta'

export default class ImportExcelController {

  async importar({ request }: HttpContext) {

    const archivo = request.file('excel', {
      extnames: ['xlsx'],
      size: '10mb'
    })

    if (!archivo) {
      return { error: 'Debe subir un archivo Excel' }
    }

    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(archivo.tmpPath!)

    const hoja = workbook.getWorksheet('BASE DATOS')

    if (!hoja) {
      return { error: 'No existe la hoja BASE DATOS' }
    }

    /*
    --------------------------------
    DETECTAR COLUMNAS AUTOMÁTICAMENTE
    --------------------------------
    */

    const encabezados: Record<string, number> = {}

    hoja.getRow(2).eachCell((cell, col) => {

      const valor = (cell.text || "").toUpperCase()

      if (valor.includes('INICIO')) encabezados.inicio = col
      if (valor.includes('FIN')) encabezados.fin = col
      if (valor.includes('KM INICIAL')) encabezados.kmInicial = col
      if (valor.includes('KM FINAL')) encabezados.kmFinal = col
      if (valor.includes('PLACA')) encabezados.placa = col
      if (valor.includes('CONDUCTOR')) encabezados.conductor = col
      if (valor.includes('EMPRESA')) encabezados.empresa = col
      if (valor.includes('DESTINO')) encabezados.destino = col

    })

    const rutas: any[] = []

    /*
    --------------------------------
    CONVERTIR HORAS
    --------------------------------
    */

    function convertirHora(valor: any) {

      if (!valor) return null

      if (valor instanceof Date) {

        const h = String(valor.getHours()).padStart(2,'0')
        const m = String(valor.getMinutes()).padStart(2,'0')

        return `${h}:${m}`
      }

      if (typeof valor === "number") {

        const minutosTotales = Math.round(valor * 24 * 60)

        const horas = Math.floor(minutosTotales / 60)
        const minutos = minutosTotales % 60

        return `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}`
      }

      if (typeof valor === "string") {

        const partes = valor.split(":")

        if (partes.length >= 2) {
          return `${partes[0].padStart(2,"0")}:${partes[1].padStart(2,"0")}`
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

      const [h1, m1] = inicio.split(":").map(Number)
      const [h2, m2] = fin.split(":").map(Number)

      const inicioMin = h1 * 60 + m1
      const finMin = h2 * 60 + m2

      let diff = finMin - inicioMin

      if (diff < 0) diff += 24 * 60

      const horas = Math.floor(diff / 60)
      const minutos = diff % 60

      return `${String(horas).padStart(2,"0")}:${String(minutos).padStart(2,"0")}`
    }

    /*
    --------------------------------
    PROCESAR FILAS
    --------------------------------
    */

    hoja.eachRow((row, index) => {

      if (index <= 2) return

      const placa = row.getCell(encabezados.placa)?.text || ""
      const conductor = row.getCell(encabezados.conductor)?.text || ""
      const empresa = row.getCell(encabezados.empresa)?.text || ""
      const destino = row.getCell(encabezados.destino)?.text || ""

      let inicio = convertirHora(row.getCell(encabezados.inicio)?.value)
      let fin = convertirHora(row.getCell(encabezados.fin)?.value)

      const kmInicial = Number(row.getCell(encabezados.kmInicial)?.value || 0)
      const kmFinal = Number(row.getCell(encabezados.kmFinal)?.value || 0)

      if (!inicio || !fin) return

      const tiempo = calcularTiempo(inicio, fin)

      const hoy = new Date()

      rutas.push({

        placa,
        conductor,
        empresa,
        destino,

        fecha: hoy.toISOString().split("T")[0],
        mes: hoy.toLocaleString("es", { month: "long" }),
        dia: hoy.toLocaleString("es", { weekday: "long" }),

        inicio_ruta: inicio,
        fin_ruta: fin,
        tiempo_en_ruta: tiempo,

        km_inicial: kmInicial,
        km_final: kmFinal,
        total_kilometros: kmFinal - kmInicial

      })

    })

    /*
    --------------------------------
    INSERTAR EN BD
    --------------------------------
    */

    if (rutas.length > 0) {
      await Ruta.createMany(rutas)
    }

    return {
      message: "Importación completada",
      insertados: rutas.length
    }

  }

}
