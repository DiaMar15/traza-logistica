/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

import NewAccount from '#controllers/new_account_controller'
import AccessToken from '#controllers/access_token_controller'
import Profile from '#controllers/profile_controller'
import RutasController from '#controllers/rutas_controller'
import ImportExcelController from '#controllers/import_excels_controller'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {

    /*
    -------------------------
    AUTH
    -------------------------
    */

    router
      .group(() => {
        router.post('signup', [NewAccount, 'store'])
        router.post('login', [AccessToken, 'store'])
        router.post('logout', [AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    /*
    -------------------------
    ACCOUNT
    -------------------------
    */

    router
      .group(() => {
        router.get('/profile', [Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    /*
    -------------------------
    CRUD RUTAS
    -------------------------
    */

    router
      .group(() => {

        // obtener rutas (paginación)
        router.get('/', [RutasController, 'index'])

        // total rutas (dashboard)
        router.get('/count', [RutasController, 'count'])

        // total kilometros (dashboard)
        router.get('/kilometros', [RutasController, 'kilometros'])

        // búsqueda
        router.get('/buscar', [RutasController, 'buscar'])

        // obtener ruta por id
        router.get('/:id', [RutasController, 'show'])

        // crear ruta
        router.post('/', [RutasController, 'store'])

        // actualizar ruta completa
        router.put('/:id', [RutasController, 'update'])

        // actualización parcial
        router.patch('/:id', [RutasController, 'patch'])

        // eliminar ruta
        router.delete('/:id', [RutasController, 'destroy'])

      })
      .prefix('rutas')

    /*
    -------------------------
    IMPORTAR EXCEL
    -------------------------
    */

    router.post('/importar-excel', [ImportExcelController, 'importar'])

  })
  .prefix('/api/v1')
