/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/api/v1/auth/register',
    tokens: [{"old":"/api/v1/auth/register","type":0,"val":"api","end":""},{"old":"/api/v1/auth/register","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/register","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'rutas.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rutas',
    tokens: [{"old":"/api/v1/rutas","type":0,"val":"api","end":""},{"old":"/api/v1/rutas","type":0,"val":"v1","end":""},{"old":"/api/v1/rutas","type":0,"val":"rutas","end":""}],
    types: placeholder as Registry['rutas.index']['types'],
  },
  'rutas.count': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rutas/count',
    tokens: [{"old":"/api/v1/rutas/count","type":0,"val":"api","end":""},{"old":"/api/v1/rutas/count","type":0,"val":"v1","end":""},{"old":"/api/v1/rutas/count","type":0,"val":"rutas","end":""},{"old":"/api/v1/rutas/count","type":0,"val":"count","end":""}],
    types: placeholder as Registry['rutas.count']['types'],
  },
  'rutas.kilometros': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rutas/kilometros',
    tokens: [{"old":"/api/v1/rutas/kilometros","type":0,"val":"api","end":""},{"old":"/api/v1/rutas/kilometros","type":0,"val":"v1","end":""},{"old":"/api/v1/rutas/kilometros","type":0,"val":"rutas","end":""},{"old":"/api/v1/rutas/kilometros","type":0,"val":"kilometros","end":""}],
    types: placeholder as Registry['rutas.kilometros']['types'],
  },
  'rutas.buscar': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rutas/buscar',
    tokens: [{"old":"/api/v1/rutas/buscar","type":0,"val":"api","end":""},{"old":"/api/v1/rutas/buscar","type":0,"val":"v1","end":""},{"old":"/api/v1/rutas/buscar","type":0,"val":"rutas","end":""},{"old":"/api/v1/rutas/buscar","type":0,"val":"buscar","end":""}],
    types: placeholder as Registry['rutas.buscar']['types'],
  },
  'rutas.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/rutas/:id',
    tokens: [{"old":"/api/v1/rutas/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rutas/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rutas/:id","type":0,"val":"rutas","end":""},{"old":"/api/v1/rutas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['rutas.show']['types'],
  },
  'rutas.store': {
    methods: ["POST"],
    pattern: '/api/v1/rutas',
    tokens: [{"old":"/api/v1/rutas","type":0,"val":"api","end":""},{"old":"/api/v1/rutas","type":0,"val":"v1","end":""},{"old":"/api/v1/rutas","type":0,"val":"rutas","end":""}],
    types: placeholder as Registry['rutas.store']['types'],
  },
  'rutas.update': {
    methods: ["PUT"],
    pattern: '/api/v1/rutas/:id',
    tokens: [{"old":"/api/v1/rutas/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rutas/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rutas/:id","type":0,"val":"rutas","end":""},{"old":"/api/v1/rutas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['rutas.update']['types'],
  },
  'rutas.patch': {
    methods: ["PATCH"],
    pattern: '/api/v1/rutas/:id',
    tokens: [{"old":"/api/v1/rutas/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rutas/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rutas/:id","type":0,"val":"rutas","end":""},{"old":"/api/v1/rutas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['rutas.patch']['types'],
  },
  'rutas.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/rutas/:id',
    tokens: [{"old":"/api/v1/rutas/:id","type":0,"val":"api","end":""},{"old":"/api/v1/rutas/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/rutas/:id","type":0,"val":"rutas","end":""},{"old":"/api/v1/rutas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['rutas.destroy']['types'],
  },
  'vehiculos.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/vehiculos',
    tokens: [{"old":"/api/v1/vehiculos","type":0,"val":"api","end":""},{"old":"/api/v1/vehiculos","type":0,"val":"v1","end":""},{"old":"/api/v1/vehiculos","type":0,"val":"vehiculos","end":""}],
    types: placeholder as Registry['vehiculos.index']['types'],
  },
  'vehiculos.store': {
    methods: ["POST"],
    pattern: '/api/v1/vehiculos',
    tokens: [{"old":"/api/v1/vehiculos","type":0,"val":"api","end":""},{"old":"/api/v1/vehiculos","type":0,"val":"v1","end":""},{"old":"/api/v1/vehiculos","type":0,"val":"vehiculos","end":""}],
    types: placeholder as Registry['vehiculos.store']['types'],
  },
  'vehiculos.update': {
    methods: ["PUT"],
    pattern: '/api/v1/vehiculos/:id',
    tokens: [{"old":"/api/v1/vehiculos/:id","type":0,"val":"api","end":""},{"old":"/api/v1/vehiculos/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/vehiculos/:id","type":0,"val":"vehiculos","end":""},{"old":"/api/v1/vehiculos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['vehiculos.update']['types'],
  },
  'vehiculos.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/vehiculos/:id',
    tokens: [{"old":"/api/v1/vehiculos/:id","type":0,"val":"api","end":""},{"old":"/api/v1/vehiculos/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/vehiculos/:id","type":0,"val":"vehiculos","end":""},{"old":"/api/v1/vehiculos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['vehiculos.destroy']['types'],
  },
  'conductores.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/conductores',
    tokens: [{"old":"/api/v1/conductores","type":0,"val":"api","end":""},{"old":"/api/v1/conductores","type":0,"val":"v1","end":""},{"old":"/api/v1/conductores","type":0,"val":"conductores","end":""}],
    types: placeholder as Registry['conductores.index']['types'],
  },
  'conductores.store': {
    methods: ["POST"],
    pattern: '/api/v1/conductores',
    tokens: [{"old":"/api/v1/conductores","type":0,"val":"api","end":""},{"old":"/api/v1/conductores","type":0,"val":"v1","end":""},{"old":"/api/v1/conductores","type":0,"val":"conductores","end":""}],
    types: placeholder as Registry['conductores.store']['types'],
  },
  'conductores.sync': {
    methods: ["POST"],
    pattern: '/api/v1/conductores/sync',
    tokens: [{"old":"/api/v1/conductores/sync","type":0,"val":"api","end":""},{"old":"/api/v1/conductores/sync","type":0,"val":"v1","end":""},{"old":"/api/v1/conductores/sync","type":0,"val":"conductores","end":""},{"old":"/api/v1/conductores/sync","type":0,"val":"sync","end":""}],
    types: placeholder as Registry['conductores.sync']['types'],
  },
  'conductores.update': {
    methods: ["PUT"],
    pattern: '/api/v1/conductores/:id',
    tokens: [{"old":"/api/v1/conductores/:id","type":0,"val":"api","end":""},{"old":"/api/v1/conductores/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/conductores/:id","type":0,"val":"conductores","end":""},{"old":"/api/v1/conductores/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['conductores.update']['types'],
  },
  'conductores.inactivar': {
    methods: ["PUT"],
    pattern: '/api/v1/conductores/:id/inactivar',
    tokens: [{"old":"/api/v1/conductores/:id/inactivar","type":0,"val":"api","end":""},{"old":"/api/v1/conductores/:id/inactivar","type":0,"val":"v1","end":""},{"old":"/api/v1/conductores/:id/inactivar","type":0,"val":"conductores","end":""},{"old":"/api/v1/conductores/:id/inactivar","type":1,"val":"id","end":""},{"old":"/api/v1/conductores/:id/inactivar","type":0,"val":"inactivar","end":""}],
    types: placeholder as Registry['conductores.inactivar']['types'],
  },
  'conductores.reactivar': {
    methods: ["PUT"],
    pattern: '/api/v1/conductores/:id/reactivar',
    tokens: [{"old":"/api/v1/conductores/:id/reactivar","type":0,"val":"api","end":""},{"old":"/api/v1/conductores/:id/reactivar","type":0,"val":"v1","end":""},{"old":"/api/v1/conductores/:id/reactivar","type":0,"val":"conductores","end":""},{"old":"/api/v1/conductores/:id/reactivar","type":1,"val":"id","end":""},{"old":"/api/v1/conductores/:id/reactivar","type":0,"val":"reactivar","end":""}],
    types: placeholder as Registry['conductores.reactivar']['types'],
  },
  'import_excel.importar': {
    methods: ["POST"],
    pattern: '/api/v1/importar-excel',
    tokens: [{"old":"/api/v1/importar-excel","type":0,"val":"api","end":""},{"old":"/api/v1/importar-excel","type":0,"val":"v1","end":""},{"old":"/api/v1/importar-excel","type":0,"val":"importar-excel","end":""}],
    types: placeholder as Registry['import_excel.importar']['types'],
  },
  'google_sheets_rutas.sync': {
    methods: ["POST"],
    pattern: '/api/v1/sync-rutas',
    tokens: [{"old":"/api/v1/sync-rutas","type":0,"val":"api","end":""},{"old":"/api/v1/sync-rutas","type":0,"val":"v1","end":""},{"old":"/api/v1/sync-rutas","type":0,"val":"sync-rutas","end":""}],
    types: placeholder as Registry['google_sheets_rutas.sync']['types'],
  },
  'import_vehiculos.importar': {
    methods: ["POST"],
    pattern: '/api/v1/importar-vehiculos',
    tokens: [{"old":"/api/v1/importar-vehiculos","type":0,"val":"api","end":""},{"old":"/api/v1/importar-vehiculos","type":0,"val":"v1","end":""},{"old":"/api/v1/importar-vehiculos","type":0,"val":"importar-vehiculos","end":""}],
    types: placeholder as Registry['import_vehiculos.importar']['types'],
  },
  'dashboard.rutas_count': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/rutas-count',
    tokens: [{"old":"/api/v1/dashboard/rutas-count","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/rutas-count","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/rutas-count","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/rutas-count","type":0,"val":"rutas-count","end":""}],
    types: placeholder as Registry['dashboard.rutas_count']['types'],
  },
  'dashboard.kilometros': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/kilometros',
    tokens: [{"old":"/api/v1/dashboard/kilometros","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/kilometros","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/kilometros","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/kilometros","type":0,"val":"kilometros","end":""}],
    types: placeholder as Registry['dashboard.kilometros']['types'],
  },
  'dashboard.rutas_por_dia': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/rutas-por-dia',
    tokens: [{"old":"/api/v1/dashboard/rutas-por-dia","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/rutas-por-dia","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/rutas-por-dia","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/rutas-por-dia","type":0,"val":"rutas-por-dia","end":""}],
    types: placeholder as Registry['dashboard.rutas_por_dia']['types'],
  },
  'dashboard.km_por_zona': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/km-por-zona',
    tokens: [{"old":"/api/v1/dashboard/km-por-zona","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/km-por-zona","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/km-por-zona","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/km-por-zona","type":0,"val":"km-por-zona","end":""}],
    types: placeholder as Registry['dashboard.km_por_zona']['types'],
  },
  'dashboard.rendimiento': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/rendimiento',
    tokens: [{"old":"/api/v1/dashboard/rendimiento","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/rendimiento","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/rendimiento","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/rendimiento","type":0,"val":"rendimiento","end":""}],
    types: placeholder as Registry['dashboard.rendimiento']['types'],
  },
  'dashboard.costos': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/costos',
    tokens: [{"old":"/api/v1/dashboard/costos","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/costos","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/costos","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/costos","type":0,"val":"costos","end":""}],
    types: placeholder as Registry['dashboard.costos']['types'],
  },
  'dashboard.personal': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/personal',
    tokens: [{"old":"/api/v1/dashboard/personal","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/personal","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/personal","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/personal","type":0,"val":"personal","end":""}],
    types: placeholder as Registry['dashboard.personal']['types'],
  },
  'dashboard.conductores': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/conductores',
    tokens: [{"old":"/api/v1/dashboard/conductores","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/conductores","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/conductores","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/conductores","type":0,"val":"conductores","end":""}],
    types: placeholder as Registry['dashboard.conductores']['types'],
  },
  'dashboard.viajes': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/viajes',
    tokens: [{"old":"/api/v1/dashboard/viajes","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/viajes","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/viajes","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/viajes","type":0,"val":"viajes","end":""}],
    types: placeholder as Registry['dashboard.viajes']['types'],
  },
  'dashboard.entregas_completadas': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/entregas',
    tokens: [{"old":"/api/v1/dashboard/entregas","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/entregas","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/entregas","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/entregas","type":0,"val":"entregas","end":""}],
    types: placeholder as Registry['dashboard.entregas_completadas']['types'],
  },
  'dashboard.capacidad_logistica': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/capacidad',
    tokens: [{"old":"/api/v1/dashboard/capacidad","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/capacidad","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/capacidad","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/capacidad","type":0,"val":"capacidad","end":""}],
    types: placeholder as Registry['dashboard.capacidad_logistica']['types'],
  },
  'dashboard.costos_detalle': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/costos-detalle',
    tokens: [{"old":"/api/v1/dashboard/costos-detalle","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/costos-detalle","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/costos-detalle","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/costos-detalle","type":0,"val":"costos-detalle","end":""}],
    types: placeholder as Registry['dashboard.costos_detalle']['types'],
  },
  'dashboard.rendimiento_vehiculos': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/rendimiento-vehiculos',
    tokens: [{"old":"/api/v1/dashboard/rendimiento-vehiculos","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/rendimiento-vehiculos","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/rendimiento-vehiculos","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/rendimiento-vehiculos","type":0,"val":"rendimiento-vehiculos","end":""}],
    types: placeholder as Registry['dashboard.rendimiento_vehiculos']['types'],
  },
  'password.forgot': {
    methods: ["POST"],
    pattern: '/forgot-password',
    tokens: [{"old":"/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['password.forgot']['types'],
  },
  'password.reset': {
    methods: ["POST"],
    pattern: '/reset-password',
    tokens: [{"old":"/reset-password","type":0,"val":"reset-password","end":""}],
    types: placeholder as Registry['password.reset']['types'],
  },
  'test.send': {
    methods: ["GET","HEAD"],
    pattern: '/test-mail',
    tokens: [{"old":"/test-mail","type":0,"val":"test-mail","end":""}],
    types: placeholder as Registry['test.send']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
