/* eslint-disable @adonisjs/prefer-lazy-controller-import */
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import Profile from '#controllers/profile_controller'
import RutasController from '#controllers/rutas_controller'
import ImportExcelController from '#controllers/import_excels_controller'
import VehiculosController from '#controllers/vehiculos_controller'
import ImportVehiculosController from '#controllers/import_vehiculos_controller'
import AuthController from '#controllers/auth_controller'
import PasswordController from '#controllers/password_controller'
import TestController from '#controllers/Http/TestController'
import DashboardController from '#controllers/dashboard_controller'
import RendimientoController from '#controllers/rendimiento_controller'
import CostosController from '#controllers/costos_controller'
import PersonalController from '#controllers/personal_controller'
import ConductoresController from '#controllers/conductores_controller'

/*
|--------------------------------------------------------------------------
| ROOT
|--------------------------------------------------------------------------
*/

router.get('/', () => {
  return { hello: 'world' }
})

/*
|--------------------------------------------------------------------------
| API V1
|--------------------------------------------------------------------------
*/

router
  .group(() => {
    /*
    -------------------------
    🔐 AUTENTICACIÓN
    -------------------------
    */

    router

      .group(() => {
        router.post(
          'register',

          [AuthController, 'register']
        )

        router.post(
          'login',

          [AuthController, 'login']
        )
      })

      .prefix('auth')

    /*
    -------------------------
    👤 CUENTA
    -------------------------
    */

    router

      .group(() => {
        router.get(
          'profile',

          [Profile, 'show']
        )
      })

      .prefix('account')

      .use(middleware.auth())

    /*
    -------------------------
    🚚 RUTAS
    -------------------------
    */

    router

      .group(() => {
        router.get(
          '/',

          [RutasController, 'index']
        )

        router.get(
          '/count',

          [RutasController, 'count']
        )

        router.get(
          '/kilometros',

          [RutasController, 'kilometros']
        )

        router.get(
          '/buscar',

          [RutasController, 'buscar']
        )

        router.get(
          '/:id',

          [RutasController, 'show']
        )

        router.post(
          '/',

          [RutasController, 'store']
        )

        router.put(
          '/:id',

          [RutasController, 'update']
        )

        router.patch(
          '/:id',

          [RutasController, 'patch']
        )

        router.delete(
          '/:id',

          [RutasController, 'destroy']
        )
      })

      .prefix('rutas')

    /*
    -------------------------
    🚛 VEHÍCULOS
    -------------------------
    */

    router

      .group(() => {
        // LISTAR
        router.get(
          '/',

          [VehiculosController, 'index']
        )

        // CREAR
        router.post(
          '/',

          [VehiculosController, 'store']
        )

        // ACTUALIZAR
        router.put(
          '/:id',

          [VehiculosController, 'update']
        )

        // ELIMINAR
        router.delete(
          '/:id',

          [VehiculosController, 'destroy']
        )

        // 🔥 SINCRONIZAR GOOGLE SHEETS
        router.get(
          '/sync',

          [VehiculosController, 'sincronizar']
        )
      })

      .prefix('vehiculos')

    /*
    -------------------------
    👨‍✈️ CONDUCTORES
    -------------------------
    */

    router

      .group(() => {
        // LISTAR
        router.get(
          '/',

          [ConductoresController, 'index']
        )

        // CREAR
        router.post(
          '/',

          [ConductoresController, 'store']
        )

        // SINCRONIZAR
        router.post(
          '/sync',

          [ConductoresController, 'sync']
        )

        // ACTUALIZAR
        router.put(
          '/:id',

          [ConductoresController, 'update']
        )

        // INACTIVAR
        router.put(
          '/:id/inactivar',

          [ConductoresController, 'inactivar']
        )

        // REACTIVAR
        router.put(
          '/:id/reactivar',

          [ConductoresController, 'reactivar']
        )
      })

      .prefix('conductores')

    /*
    -------------------------
    📊 IMPORTAR / SYNC
    -------------------------
    */

    // IMPORTAR EXCEL
    router.post(
      'importar-excel',

      [ImportExcelController, 'importar']
    )

    // 🔥 SYNC RUTAS GOOGLE SHEETS
    router.get(
      'sync-rutas',

      [() => import('#controllers/google_sheets_rutas_controller'), 'sync']
    )

    // IMPORTAR VEHÍCULOS
    router.post(
      'importar-vehiculos',

      [ImportVehiculosController, 'importar']
    )

    /*
    -------------------------
    📈 DASHBOARD
    -------------------------
    */

    router.get(
      'dashboard/principal',

      [DashboardController, 'principal']
    )

    router.get(
      'dashboard/rutas-count',

      [DashboardController, 'rutasCount']
    )

    router.get(
      'dashboard/kilometros',

      [DashboardController, 'kilometros']
    )

    router.get(
      'dashboard/conductores',

      [DashboardController, 'conductores']
    )

    router.get(
      'dashboard/viajes',

      [DashboardController, 'viajes']
    )

    router.get(
      'dashboard/rutas-por-dia',

      [RendimientoController, 'rutasPorDia']
    )

    router.get(
      'dashboard/km-por-zona',

      [RendimientoController, 'kmPorZona']
    )

    router.get(
      'dashboard/rendimiento',

      [RendimientoController, 'rendimiento']
    )

    router.get(
      'dashboard/entregas',

      [RendimientoController, 'entregasCompletadas']
    )

    router.get(
      'dashboard/capacidad',

      [RendimientoController, 'capacidadLogistica']
    )

    router.get(
      'dashboard/rendimiento-vehiculos',

      [RendimientoController, 'rendimientoVehiculos']
    )

    router.get(
      'dashboard/costos',

      [CostosController, 'costos']
    )

    router.get(
      'dashboard/costos-detalle',

      [CostosController, 'costosDetalle']
    )

    router.get(
      'dashboard/personal',

      [PersonalController, 'personal']
    )
  })

  .prefix('/api/v1')

/*
|--------------------------------------------------------------------------
| 🔐 RECUPERAR PASSWORD
|--------------------------------------------------------------------------
*/

router.post(
  '/forgot-password',

  [PasswordController, 'forgot']
)

router.post(
  '/reset-password',

  [PasswordController, 'reset']
)

/*
|--------------------------------------------------------------------------
| 📧 TEST EMAIL
|--------------------------------------------------------------------------
*/

router.get(
  '/test-mail',

  [TestController, 'send']
)
