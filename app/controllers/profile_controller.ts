import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  async show({ auth }: HttpContext) {
    const user = await auth.getUserOrFail()

    await user.load('userRoles', (query) => {
      query.preload('role')
    })

    return {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      roles: user.userRoles.map((ur) => ur.role)
    }
  }
}

