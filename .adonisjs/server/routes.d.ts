import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'rutas.index': { paramsTuple?: []; params?: {} }
    'rutas.count': { paramsTuple?: []; params?: {} }
    'rutas.kilometros': { paramsTuple?: []; params?: {} }
    'rutas.buscar': { paramsTuple?: []; params?: {} }
    'rutas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rutas.store': { paramsTuple?: []; params?: {} }
    'rutas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rutas.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rutas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'import_excel.importar': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'rutas.index': { paramsTuple?: []; params?: {} }
    'rutas.count': { paramsTuple?: []; params?: {} }
    'rutas.kilometros': { paramsTuple?: []; params?: {} }
    'rutas.buscar': { paramsTuple?: []; params?: {} }
    'rutas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'rutas.index': { paramsTuple?: []; params?: {} }
    'rutas.count': { paramsTuple?: []; params?: {} }
    'rutas.kilometros': { paramsTuple?: []; params?: {} }
    'rutas.buscar': { paramsTuple?: []; params?: {} }
    'rutas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'rutas.store': { paramsTuple?: []; params?: {} }
    'import_excel.importar': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'rutas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'rutas.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'rutas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}