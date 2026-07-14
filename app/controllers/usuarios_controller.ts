import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsuariosController {
  async index({ response }: HttpContext) {
    const usuarios = await User.query().orderBy('created_at', 'desc')

    return response.ok(
      usuarios.map((user) => ({
        id: user.id,

        nombre: user.nombre,

        apellido: user.apellido,

        correo: user.correo,

        numero_telefono: user.numero_telefono,

        avatar: user.avatar,

        estado: user.estado,

        created_at: user.created_at,
      }))
    )
  }
  async inactivar({ params, response }: HttpContext) {
    const usuario = await User.findOrFail(params.id)

    usuario.estado = 'INACTIVO'

    await usuario.save()

    return response.ok({
      message: 'Usuario inactivado correctamente',
    })
  }

  async update({ params, request, response }: HttpContext) {
    const usuario = await User.findOrFail(params.id)

    const data = request.only(['nombre', 'apellido', 'correo', 'numero_telefono'])

    usuario.merge({
      nombre: data.nombre?.trim(),
      apellido: data.apellido?.trim(),
      correo: data.correo?.trim().toLowerCase(),
      numero_telefono: data.numero_telefono?.trim(),
    })

    await usuario.save()

    return response.ok({
      message: 'Usuario actualizado correctamente',
      usuario,
    })
  }

  async reactivar({ params, response }: HttpContext) {
    const usuario = await User.findOrFail(params.id)

    usuario.estado = 'ACTIVO'

    await usuario.save()

    return response.ok({
      message: 'Usuario reactivado correctamente',
    })
  }
}
