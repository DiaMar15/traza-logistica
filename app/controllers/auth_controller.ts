import type { HttpContext } from '@adonisjs/core/http'
import { randomBytes } from 'crypto'
import mail from '@adonisjs/mail/services/main'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {

  // 👤 1. Crear usuario
  async createUser({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const existingUser = await db.from('users').where('email', email).first()

    if (existingUser) {
      return response.badRequest({ message: 'El usuario ya existe' })
    }

    const hashedPassword = await hash.make(password)

    await db.table('users').insert({
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    })

    return { message: 'Usuario creado correctamente' }
  }

  // 🔐 2. Solicitar recuperación
  async forgotPassword({ request, response }: HttpContext) {
    const email = request.input('email')

    const user = await db.from('users').where('email', email).first()

    if (!user) {
      return response.badRequest({ message: 'Usuario no existe' })
    }

    const token = randomBytes(32).toString('hex')

    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 30)

    await db.table('password_resets').insert({
      email,
      token,
      expires_at: expiresAt,
    })

    const resetLink = `http://localhost:5173/reset-password?token=${token}`

    await mail.send((message) => {
      message
        .to(email)
        .from(process.env.MAIL_FROM_ADDRESS!)
        .subject('Recuperar contraseña')
        .html(`
          <h2>Recuperación de contraseña</h2>
          <p>Haz clic en el siguiente enlace:</p>
          <a href="${resetLink}">Restablecer contraseña</a>
          <p>Este enlace expira en 30 minutos.</p>
        `)
    })

    return { message: 'Correo de recuperación enviado' }
  }

  // 🔄 3. Resetear contraseña
  async resetPassword({ request, response }: HttpContext) {
    const { token, password } = request.only(['token', 'password'])

    const record = await db
      .from('password_resets')
      .where('token', token)
      .first()

    if (!record) {
      return response.badRequest({ message: 'Token inválido' })
    }

    if (new Date(record.expires_at) < new Date()) {
      return response.badRequest({ message: 'Token expirado' })
    }

    const user = await db
      .from('users')
      .where('email', record.email)
      .first()

    if (!user) {
      return response.badRequest({ message: 'Usuario no existe' })
    }

    const hashedPassword = await hash.make(password)

    await db
      .from('users')
      .where('email', record.email)
      .update({ password: hashedPassword })

    await db
      .from('password_resets')
      .where('email', record.email)
      .delete()

    return { message: 'Contraseña actualizada correctamente' }
  }
}
