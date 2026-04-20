import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'
import User from '#models/user'
import { randomUUID } from 'crypto'
import Mail from '@adonisjs/mail/services/main'

export default class PasswordController {

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

await Mail.send((message) => {
  message
    .to(correo)
    .from(process.env.MAIL_FROM_ADDRESS!)
    .subject('Recuperar contraseña')
    .html(`
      <h3>Recuperación de contraseña</h3>
      <p>Haz clic en el siguiente enlace:</p>
      <a href="http://localhost:5173/auth/reset-password?token=${token}">
        Restablecer contraseña
      </a>
    `)
})

    return response.ok({
      message: 'Correo enviado correctamente'
    })
  }

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
