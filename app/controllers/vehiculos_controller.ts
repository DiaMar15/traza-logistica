import Vehiculo from '#models/vehiculo'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehiculosController {

  async index() {

    return await Vehiculo.all()

  }

  async store({ request }: HttpContext) {

    const data = request.only([
      'placa',
      'marca',
      'conductor',
      'tipo'
    ])

    return await Vehiculo.create(data)

  }

  async update({ params, request }: HttpContext) {

    const vehiculo = await Vehiculo.findOrFail(params.id)

    const data = request.only([
      'placa',
      'marca',
      'conductor',
      'tipo'
    ])

    vehiculo.merge(data)

    await vehiculo.save()

    return vehiculo
  }

  async destroy({ params }: HttpContext) {

    const vehiculo = await Vehiculo.findOrFail(params.id)

    await vehiculo.delete()

    return { message: 'Vehículo eliminado' }
  }

}
