import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.update': { paramsTuple?: []; params?: {} }
    'profile.avatar': { paramsTuple?: []; params?: {} }
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
    'vehiculos.sincronizar': { paramsTuple?: []; params?: {} }
    'conductores.index': { paramsTuple?: []; params?: {} }
    'conductores.store': { paramsTuple?: []; params?: {} }
    'conductores.sync': { paramsTuple?: []; params?: {} }
    'conductores.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'conductores.inactivar': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'conductores.reactivar': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'conductores.sincronizar': { paramsTuple?: []; params?: {} }
    'import_excel.importar': { paramsTuple?: []; params?: {} }
    'import_vehiculos.importar': { paramsTuple?: []; params?: {} }
    'dashboard.principal': { paramsTuple?: []; params?: {} }
    'dashboard.semanas': { paramsTuple?: []; params?: {} }
    'dashboard.rutas_count': { paramsTuple?: []; params?: {} }
    'dashboard.kilometros': { paramsTuple?: []; params?: {} }
    'dashboard.conductores': { paramsTuple?: []; params?: {} }
    'dashboard.viajes': { paramsTuple?: []; params?: {} }
    'rendimiento.rutas_por_dia': { paramsTuple?: []; params?: {} }
    'rendimiento.km_por_zona': { paramsTuple?: []; params?: {} }
    'rendimiento.rendimiento': { paramsTuple?: []; params?: {} }
    'rendimiento.entregas_completadas': { paramsTuple?: []; params?: {} }
    'rendimiento.capacidad_logistica': { paramsTuple?: []; params?: {} }
    'rendimiento.rendimiento_vehiculos': { paramsTuple?: []; params?: {} }
    'rendimiento.vehiculo_menor_kilometraje': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_am_vehiculos': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_pm_vehiculos': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_am_zona': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_pm_zona': { paramsTuple?: []; params?: {} }
    'rendimiento.horas_extra_zona': { paramsTuple?: []; params?: {} }
    'costos.costos': { paramsTuple?: []; params?: {} }
    'costos.costos_detalle': { paramsTuple?: []; params?: {} }
    'personal.personal_diario': { paramsTuple?: []; params?: {} }
    'personal.personal_semanal': { paramsTuple?: []; params?: {} }
    'personal.personal_mensual': { paramsTuple?: []; params?: {} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
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
    'vehiculos.sincronizar': { paramsTuple?: []; params?: {} }
    'conductores.index': { paramsTuple?: []; params?: {} }
    'dashboard.principal': { paramsTuple?: []; params?: {} }
    'dashboard.semanas': { paramsTuple?: []; params?: {} }
    'dashboard.rutas_count': { paramsTuple?: []; params?: {} }
    'dashboard.kilometros': { paramsTuple?: []; params?: {} }
    'dashboard.conductores': { paramsTuple?: []; params?: {} }
    'dashboard.viajes': { paramsTuple?: []; params?: {} }
    'rendimiento.rutas_por_dia': { paramsTuple?: []; params?: {} }
    'rendimiento.km_por_zona': { paramsTuple?: []; params?: {} }
    'rendimiento.rendimiento': { paramsTuple?: []; params?: {} }
    'rendimiento.entregas_completadas': { paramsTuple?: []; params?: {} }
    'rendimiento.capacidad_logistica': { paramsTuple?: []; params?: {} }
    'rendimiento.rendimiento_vehiculos': { paramsTuple?: []; params?: {} }
    'rendimiento.vehiculo_menor_kilometraje': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_am_vehiculos': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_pm_vehiculos': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_am_zona': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_pm_zona': { paramsTuple?: []; params?: {} }
    'rendimiento.horas_extra_zona': { paramsTuple?: []; params?: {} }
    'costos.costos': { paramsTuple?: []; params?: {} }
    'costos.costos_detalle': { paramsTuple?: []; params?: {} }
    'personal.personal_diario': { paramsTuple?: []; params?: {} }
    'personal.personal_semanal': { paramsTuple?: []; params?: {} }
    'personal.personal_mensual': { paramsTuple?: []; params?: {} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
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
    'vehiculos.sincronizar': { paramsTuple?: []; params?: {} }
    'conductores.index': { paramsTuple?: []; params?: {} }
    'dashboard.principal': { paramsTuple?: []; params?: {} }
    'dashboard.semanas': { paramsTuple?: []; params?: {} }
    'dashboard.rutas_count': { paramsTuple?: []; params?: {} }
    'dashboard.kilometros': { paramsTuple?: []; params?: {} }
    'dashboard.conductores': { paramsTuple?: []; params?: {} }
    'dashboard.viajes': { paramsTuple?: []; params?: {} }
    'rendimiento.rutas_por_dia': { paramsTuple?: []; params?: {} }
    'rendimiento.km_por_zona': { paramsTuple?: []; params?: {} }
    'rendimiento.rendimiento': { paramsTuple?: []; params?: {} }
    'rendimiento.entregas_completadas': { paramsTuple?: []; params?: {} }
    'rendimiento.capacidad_logistica': { paramsTuple?: []; params?: {} }
    'rendimiento.rendimiento_vehiculos': { paramsTuple?: []; params?: {} }
    'rendimiento.vehiculo_menor_kilometraje': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_am_vehiculos': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_pm_vehiculos': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_am_zona': { paramsTuple?: []; params?: {} }
    'rendimiento.tiempo_cedi_pm_zona': { paramsTuple?: []; params?: {} }
    'rendimiento.horas_extra_zona': { paramsTuple?: []; params?: {} }
    'costos.costos': { paramsTuple?: []; params?: {} }
    'costos.costos_detalle': { paramsTuple?: []; params?: {} }
    'personal.personal_diario': { paramsTuple?: []; params?: {} }
    'personal.personal_semanal': { paramsTuple?: []; params?: {} }
    'personal.personal_mensual': { paramsTuple?: []; params?: {} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'test.send': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'profile.avatar': { paramsTuple?: []; params?: {} }
    'rutas.store': { paramsTuple?: []; params?: {} }
    'vehiculos.store': { paramsTuple?: []; params?: {} }
    'conductores.store': { paramsTuple?: []; params?: {} }
    'conductores.sync': { paramsTuple?: []; params?: {} }
    'conductores.sincronizar': { paramsTuple?: []; params?: {} }
    'import_excel.importar': { paramsTuple?: []; params?: {} }
    'import_vehiculos.importar': { paramsTuple?: []; params?: {} }
    'password.forgot': { paramsTuple?: []; params?: {} }
    'password.reset': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'profile.update': { paramsTuple?: []; params?: {} }
    'rutas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'vehiculos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'conductores.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'conductores.inactivar': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'conductores.reactivar': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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