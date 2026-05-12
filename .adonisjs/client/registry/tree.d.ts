/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
  }
  profile: {
    show: typeof routes['profile.show']
  }
  rutas: {
    index: typeof routes['rutas.index']
    count: typeof routes['rutas.count']
    kilometros: typeof routes['rutas.kilometros']
    buscar: typeof routes['rutas.buscar']
    show: typeof routes['rutas.show']
    store: typeof routes['rutas.store']
    update: typeof routes['rutas.update']
    patch: typeof routes['rutas.patch']
    destroy: typeof routes['rutas.destroy']
  }
  vehiculos: {
    index: typeof routes['vehiculos.index']
    store: typeof routes['vehiculos.store']
    update: typeof routes['vehiculos.update']
    destroy: typeof routes['vehiculos.destroy']
  }
  conductores: {
    index: typeof routes['conductores.index']
    store: typeof routes['conductores.store']
    sync: typeof routes['conductores.sync']
    update: typeof routes['conductores.update']
    inactivar: typeof routes['conductores.inactivar']
    reactivar: typeof routes['conductores.reactivar']
  }
  importExcel: {
    importar: typeof routes['import_excel.importar']
  }
  googleSheetsRutas: {
    sync: typeof routes['google_sheets_rutas.sync']
  }
  importVehiculos: {
    importar: typeof routes['import_vehiculos.importar']
  }
  dashboard: {
    rutasCount: typeof routes['dashboard.rutas_count']
    kilometros: typeof routes['dashboard.kilometros']
    rutasPorDia: typeof routes['dashboard.rutas_por_dia']
    kmPorZona: typeof routes['dashboard.km_por_zona']
    rendimiento: typeof routes['dashboard.rendimiento']
    costos: typeof routes['dashboard.costos']
    personal: typeof routes['dashboard.personal']
    conductores: typeof routes['dashboard.conductores']
    viajes: typeof routes['dashboard.viajes']
    entregasCompletadas: typeof routes['dashboard.entregas_completadas']
    capacidadLogistica: typeof routes['dashboard.capacidad_logistica']
    costosDetalle: typeof routes['dashboard.costos_detalle']
    rendimientoVehiculos: typeof routes['dashboard.rendimiento_vehiculos']
  }
  password: {
    forgot: typeof routes['password.forgot']
    reset: typeof routes['password.reset']
  }
  test: {
    send: typeof routes['test.send']
  }
}
