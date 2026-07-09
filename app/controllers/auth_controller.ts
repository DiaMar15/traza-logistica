import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  /*
  -------------------------
  REGISTER
  -------------------------
  */
  async register({ request }: HttpContext) {
    const { nombre, correo, password } = request.only(['nombre', 'correo', 'password'])

    const user = await User.create({
      nombre,
      correo,
      password,
    })

    return {
      message: 'Usuario creado',
      user,
    }
  }

  /*
  -------------------------
  LOGIN (100% FUNCIONAL)
  -------------------------
  */
  async login({ request, auth, response }: HttpContext) {
    try {
      const { correo, password } = request.only(['correo', 'password'])

      const user = await User.verifyCredentials(correo, password)

      const token = await auth.use('api').createToken(user)

      return token
    } catch (error) {
      return response.badRequest({
        message: 'Credenciales inválidas',
      })
    }
  }
}
