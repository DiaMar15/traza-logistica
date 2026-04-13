import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {

  async show({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      // 🔥 Si quieres incluir roles
      await user.load('userRoles', (query) => {
        query.preload('role')
      })

      return {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        numero_telefono: user.numero_telefono,

        roles: user.userRoles.map((ur) => ({
          id: ur.role.id,
          nombre: ur.role.nombre,
        })),
      }

    } catch (error) {
      return response.unauthorized({
        message: 'No autorizado',
      })
    }
  }
}
