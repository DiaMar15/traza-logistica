/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

import NewAccount from '#controllers/new_account_controller'
import AccessToken from '#controllers/access_token_controller'
import Profile from '#controllers/profile_controller'
import RutasController from '#controllers/rutas_controller'
import ImportExcelController from '#controllers/import_excels_controller'
import VehiculosController from '#controllers/vehiculos_controller'
import ImportVehiculosController from '#controllers/import_vehiculos_controller'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {

    /*
    -------------------------
    Autenticación
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
    CUENTA DE USUARIO
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

        router.get('/', [RutasController, 'index'])
        router.get('/count', [RutasController, 'count'])
        router.get('/kilometros', [RutasController, 'kilometros'])
        router.get('/buscar', [RutasController, 'buscar'])
        router.get('/:id', [RutasController, 'show'])
        router.post('/', [RutasController, 'store'])
        router.put('/:id', [RutasController, 'update'])
        router.patch('/:id', [RutasController, 'patch'])
        router.delete('/:id', [RutasController, 'destroy'])

      })
      .prefix('rutas')

    /*
    -------------------------
    VEHICULOS
    -------------------------
    */

    router
      .group(() => {

        // listar vehículos
        router.get('/', [VehiculosController, 'index'])

        // crear vehículo
        router.post('/', [VehiculosController, 'store'])

        // actualizar vehículo
        router.put('/:id', [VehiculosController, 'update'])

        // eliminar vehículo
        router.delete('/:id', [VehiculosController, 'destroy'])

      })
      .prefix('vehiculos')

    /*
    -------------------------
    Importar Excel y Google Sheets
    -------------------------
    */

    router.post('/importar-excel', [ImportExcelController, 'importar'])

    router.post('/sync-rutas', [
  () => import('#controllers/google_sheets_rutas_controller'),
  'sync'
])

    /*
    -------------------------
    IMPORTAR VEHICULOS
    -------------------------
    */

    router.post('/importar-vehiculos', [ImportVehiculosController, 'importar'])

  })
  .prefix('/api/v1')
