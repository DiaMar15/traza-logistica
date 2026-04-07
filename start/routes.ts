/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import NewAccount from '#controllers/new_account_controller'
import AccessToken from '#controllers/access_token_controller'
import Profile from '#controllers/profile_controller'
import RutasController from '#controllers/rutas_controller'
import ImportExcelController from '#controllers/import_excels_controller'
import VehiculosController from '#controllers/vehiculos_controller'
import ImportVehiculosController from '#controllers/import_vehiculos_controller'
import AuthController from '#controllers/auth_controller'
import TestController from '#controllers/Http/TestController'

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

    /*
    -------------------------
    CUENTA DE USUARIO
    -------------------------
    */
    router
      .group(() => {
        router.get('profile', [Profile, 'show'])
      })
      .prefix('account')
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
        router.get('/', [VehiculosController, 'index'])
        router.post('/', [VehiculosController, 'store'])
        router.put('/:id', [VehiculosController, 'update'])
        router.delete('/:id', [VehiculosController, 'destroy'])
      })
      .prefix('vehiculos')

    /*
    -------------------------
    Importar Excel y Google Sheets
    -------------------------
    */
    router.post('importar-excel', [ImportExcelController, 'importar'])

    router.post('sync-rutas', [
      () => import('#controllers/google_sheets_rutas_controller'),
      'sync'
    ])

    /*
    -------------------------
    IMPORTAR VEHICULOS
    -------------------------
    */
    router.post('importar-vehiculos', [ImportVehiculosController, 'importar'])

    /*
    -------------------------
    DASHBOARD - RENDIMIENTO, COSTOS, PERSONAL
    -------------------------
    */
    router.get('dashboard/rendimiento', [RutasController, 'rendimiento'])
    router.get('dashboard/costos', [RutasController, 'costos'])
    router.get('dashboard/personal', [RutasController, 'personal'])

  })
  .prefix('/api/v1')

  /*
    -------------------------
   La Autenticación y recuperación de contraseña
    -------------------------
    */

router.get('/test-mail', [TestController, 'send'])

router.post('/create-user', [AuthController, 'createUser'])
router.post('/forgot-password', [AuthController, 'forgotPassword'])
router.post('/reset-password', [AuthController, 'resetPassword'])
