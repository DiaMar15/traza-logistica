import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'rutas.index': { paramsTuple?: []; params?: {} }
    'rutas.count': { paramsTuple?: []; params?: {} }
    'rutas.kilometros': { paramsTuple?: []; params?: {} }
    'rutas.buscar': { paramsTuple?: []; params?: {} }
    'rutas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rutas.store': { paramsTuple?: []; params?: {} }
    'rutas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rutas.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rutas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'vehiculos.index': { paramsTuple?: []; params?: {} }
    'vehiculos.store': { paramsTuple?: []; params?: {} }
    'vehiculos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'vehiculos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'import_excel.importar': { paramsTuple?: []; params?: {} }
    'import_vehiculos.importar': { paramsTuple?: []; params?: {} }
    'rutas.rendimiento': { paramsTuple?: []; params?: {} }
    'rutas.costos': { paramsTuple?: []; params?: {} }
    'rutas.personal': { paramsTuple?: []; params?: {} }
    'password.forgot': { paramsTuple?: []; params?: {} }
    'password.reset': { paramsTuple?: []; params?: {} }
    'test.send': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.show': { paramsTuple?: []; params?: {} }
    'rutas.index': { paramsTuple?: []; params?: {} }
    'rutas.count': { paramsTuple?: []; params?: {} }
    'rutas.kilometros': { paramsTuple?: []; params?: {} }
    'rutas.buscar': { paramsTuple?: []; params?: {} }
    'rutas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'vehiculos.index': { paramsTuple?: []; params?: {} }
    'rutas.rendimiento': { paramsTuple?: []; params?: {} }
    'rutas.costos': { paramsTuple?: []; params?: {} }
    'rutas.personal': { paramsTuple?: []; params?: {} }
    'test.send': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.show': { paramsTuple?: []; params?: {} }
    'rutas.index': { paramsTuple?: []; params?: {} }
    'rutas.count': { paramsTuple?: []; params?: {} }
    'rutas.kilometros': { paramsTuple?: []; params?: {} }
    'rutas.buscar': { paramsTuple?: []; params?: {} }
    'rutas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'vehiculos.index': { paramsTuple?: []; params?: {} }
    'rutas.rendimiento': { paramsTuple?: []; params?: {} }
    'rutas.costos': { paramsTuple?: []; params?: {} }
    'rutas.personal': { paramsTuple?: []; params?: {} }
    'test.send': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'rutas.store': { paramsTuple?: []; params?: {} }
    'vehiculos.store': { paramsTuple?: []; params?: {} }
    'import_excel.importar': { paramsTuple?: []; params?: {} }
    'import_vehiculos.importar': { paramsTuple?: []; params?: {} }
    'password.forgot': { paramsTuple?: []; params?: {} }
    'password.reset': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'rutas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'vehiculos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'rutas.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'rutas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'vehiculos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}