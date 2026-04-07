import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'
import { loginValidator } from '#validators/user'
import UserTransformer from '#transformers/user_transformer'

export default class AccessTokenController {

  /*
  --------------------------------
  LOGIN
  --------------------------------
  */
  async store({ request, response }: HttpContext) {

    const { email, password } =
      await request.validateUsing(loginValidator)

    const user = await User.findBy('email', email)

    if (!user) {
      return response.unauthorized({
        message: 'Credenciales inválidas'
      })
    }

    const isValidPassword = await Hash.verify(user.password, password)

    if (!isValidPassword) {
      return response.unauthorized({
        message: 'Credenciales inválidas'
      })
    }

    const token = await User.accessTokens.create(user)

    return response.ok({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }


  /*
  --------------------------------
  LOGOUT
  --------------------------------
  */
  async destroy({ auth, response }: HttpContext) {

    const user = auth.user!

    await User.accessTokens.delete(
      user,
      user.currentAccessToken!.identifier
    )

    return response.ok({
      message: 'Logout exitoso'
    })
  }

}
