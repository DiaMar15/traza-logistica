/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
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
  'import_excel.importar': {
    methods: ["POST"],
    pattern: '/api/v1/importar-excel',
    tokens: [{"old":"/api/v1/importar-excel","type":0,"val":"api","end":""},{"old":"/api/v1/importar-excel","type":0,"val":"v1","end":""},{"old":"/api/v1/importar-excel","type":0,"val":"importar-excel","end":""}],
    types: placeholder as Registry['import_excel.importar']['types'],
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
