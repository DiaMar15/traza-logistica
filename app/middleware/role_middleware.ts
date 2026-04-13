import type { HttpContext } from '@adonisjs/core/http'

export default class RoleMiddleware {

  async handle(
    { auth, response }: HttpContext,
    next: () => Promise<void>,
    roles: string[]  // roles permitidos para esta ruta
  ) {

    try {
      const user = auth.getUserOrFail()

      // carga de roles
      await user.load('userRoles', (query) => {
        query.preload('role')
      })

      const userRoles = user.userRoles.map((ur) => ur.role.nombre)

      //  verificacion si tiene roles permitidos
      const hasRole = roles.some((role) => userRoles.includes(role))

      if (!hasRole) {
        return response.forbidden({
          message: 'No tienes permisos para acceder a este recurso',
        })
      }

      await next()

    } catch (error) {
      return response.unauthorized({
        message: 'No autenticado',
      })
    }
  }
}
