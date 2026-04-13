import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'
import User from '#models/user'
import { randomUUID } from 'crypto'

export default class PasswordController {

  /*
  --------------------------------
  Generar token
  --------------------------------
  */
  async forgot({ request, response }: HttpContext) {

    const correo = request.input('correo')

    const user = await User.findBy('correo', correo)

    if (!user) {
      return response.notFound({
        message: 'Usuario no existe'
      })
    }

    const token = randomUUID()

    await Database.table('password_resets').insert({
      correo,
      token,
      created_at: new Date()
    })

    return response.ok({
      message: 'Token generado',
      token
    })
  }

  /*
  --------------------------------
  Resetear contraseña
  --------------------------------
  */
  async reset({ request, response }: HttpContext) {

    const token = request.input('token')
    const password = request.input('password')

    const record = await Database
      .from('password_resets')
      .where('token', token)
      .first()

    if (!record) {
      return response.badRequest({
        message: 'Token inválido'
      })
    }

    const user = await User.findByOrFail('correo', record.correo)

    user.password = password
    await user.save()

    await Database
      .from('password_resets')
      .where('correo', record.correo)
      .delete()

    return response.ok({
      message: 'Contraseña actualizada'
    })
  }
}
