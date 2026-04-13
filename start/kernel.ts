/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| Aquí registras middleware global, de router y middleware nombrados
|
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

/**
 * Error handler
 */
server.errorHandler(() => import('#exceptions/handler'))

/**
 * Middleware global (para TODAS las requests)
 */
server.use([
  () => import('#middleware/force_json_response_middleware'),
  () => import('#middleware/container_bindings_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

/**
 * Middleware del router (solo rutas registradas)
 */
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/session/session_middleware'),
  () => import('@adonisjs/shield/shield_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
  () => import('#middleware/silent_auth_middleware'),
])

/**
 * Middleware nombrados (los que usas en rutas)
 */
export const middleware = router.named({

  auth: () => import('#middleware/auth_middleware'),

  role: () => import('#middleware/role_middleware'),

})
