import type { HttpContext } from '@adonisjs/core/http'
import ExcelJS from 'exceljs'
import Vehiculo from '#models/vehiculo'

export default class ImportVehiculosController {

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

    const hoja = workbook.worksheets[0]

    const vehiculos: any[] = []

    hoja.eachRow((row, index) => {

      if (index === 1) return // encabezados

      const placa = row.getCell(1).value?.toString() || ""
      const marca = row.getCell(3).value?.toString() || ""
      const conductor = row.getCell(4).value?.toString() || ""

      if (!placa) return

      vehiculos.push({
        placa,
        marca,
        conductor,
        tipo: null
      })

    })

    if (vehiculos.length > 0) {
      await Vehiculo.createMany(vehiculos)
    }

    return {
      message: "Vehículos importados",
      total: vehiculos.length
    }

  }

}
