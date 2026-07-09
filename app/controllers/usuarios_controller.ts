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

        created_at: user.created_at,
      }))
    )
  }
}
