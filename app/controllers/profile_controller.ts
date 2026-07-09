import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
console.log('ProfileController cargado')

export default class ProfileController {
  /* --------------------------
     OBTENER PERFIL
  -------------------------- */
  async show({ auth }: HttpContext) {
    const user = await auth.getUserOrFail()

    await user.load('userRoles', (query) => {
      query.preload('role')
    })

    return {
      id: user.id,

      nombre: user.nombre,

      apellido: user.apellido,

      correo: user.correo,

      numero_telefono: user.numero_telefono,

      avatar: user.avatar,

      roles: user.userRoles.map((ur) => ur.role),
    }
  }

  /* --------------------------
   ACTUALIZAR PERFIL
-------------------------- */
  async update({ auth, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()

    const data = request.only(['nombre', 'apellido', 'numero_telefono'])

    if (data.nombre !== undefined && data.nombre !== null) {
      user.nombre = data.nombre.trim()
    }

    if (data.apellido !== undefined && data.apellido !== null) {
      user.apellido = data.apellido.trim()
    }

    if (data.numero_telefono !== undefined && data.numero_telefono !== null) {
      user.numero_telefono = data.numero_telefono.trim()
    }

    await user.save()

    await user.load('userRoles', (query) => {
      query.preload('role')
    })

    return response.ok({
      message: 'Perfil actualizado correctamente',

      user: {
        id: user.id,

        nombre: user.nombre,

        apellido: user.apellido,

        correo: user.correo,

        numero_telefono: user.numero_telefono,

        avatar: user.avatar,

        roles: user.userRoles.map((ur) => ur.role),
      },
    })
  }

  /* --------------------------
   CAMBIAR AVATAR
-------------------------- */
  async avatar({ auth, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()

    const avatar = request.file('avatar', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })

    if (!avatar) {
      return response.badRequest({
        message: 'Debe seleccionar una imagen',
      })
    }

    if (!avatar.isValid) {
      return response.badRequest({
        message: avatar.errors[0]?.message ?? 'Imagen inválida',
      })
    }

    const fileName = `${randomUUID()}.${avatar.extname}`

    await avatar.move(app.publicPath('uploads/avatars'), {
      name: fileName,
      overwrite: true,
    })

    if (!avatar.fileName) {
      return response.internalServerError({
        message: 'No fue posible guardar la imagen',
      })
    }

    if (user.avatar) {
      const rutaAnterior = app.publicPath(user.avatar)

      if (fs.existsSync(rutaAnterior)) {
        fs.unlinkSync(rutaAnterior)
      }
    }

    user.avatar = `uploads/avatars/${fileName}`

    await user.save()

    return response.ok({
      message: 'Avatar actualizado correctamente',

      avatar: user.avatar,
    })
  }
}
