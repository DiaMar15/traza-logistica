/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['access_token.store']['types'],
  },
  'access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['access_token.destroy']['types'],
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
  'rutas.rendimiento': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/rendimiento',
    tokens: [{"old":"/api/v1/dashboard/rendimiento","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/rendimiento","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/rendimiento","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/rendimiento","type":0,"val":"rendimiento","end":""}],
    types: placeholder as Registry['rutas.rendimiento']['types'],
  },
  'rutas.costos': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/costos',
    tokens: [{"old":"/api/v1/dashboard/costos","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/costos","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/costos","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/costos","type":0,"val":"costos","end":""}],
    types: placeholder as Registry['rutas.costos']['types'],
  },
  'rutas.personal': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/personal',
    tokens: [{"old":"/api/v1/dashboard/personal","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/personal","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/personal","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/personal","type":0,"val":"personal","end":""}],
    types: placeholder as Registry['rutas.personal']['types'],
  },
  'test.send': {
    methods: ["GET","HEAD"],
    pattern: '/test-mail',
    tokens: [{"old":"/test-mail","type":0,"val":"test-mail","end":""}],
    types: placeholder as Registry['test.send']['types'],
  },
  'auth.create_user': {
    methods: ["POST"],
    pattern: '/create-user',
    tokens: [{"old":"/create-user","type":0,"val":"create-user","end":""}],
    types: placeholder as Registry['auth.create_user']['types'],
  },
  'auth.forgot_password': {
    methods: ["POST"],
    pattern: '/forgot-password',
    tokens: [{"old":"/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['auth.forgot_password']['types'],
  },
  'auth.reset_password': {
    methods: ["POST"],
    pattern: '/reset-password',
    tokens: [{"old":"/reset-password","type":0,"val":"reset-password","end":""}],
    types: placeholder as Registry['auth.reset_password']['types'],
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
