/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
  }
  profile: {
    show: typeof routes['profile.show']
    update: typeof routes['profile.update']
    avatar: typeof routes['profile.avatar']
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
    sincronizar: typeof routes['vehiculos.sincronizar']
  }
  conductores: {
    index: typeof routes['conductores.index']
    store: typeof routes['conductores.store']
    sync: typeof routes['conductores.sync']
    update: typeof routes['conductores.update']
    inactivar: typeof routes['conductores.inactivar']
    reactivar: typeof routes['conductores.reactivar']
    sincronizar: typeof routes['conductores.sincronizar']
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
    principal: typeof routes['dashboard.principal']
    semanas: typeof routes['dashboard.semanas']
    rutasCount: typeof routes['dashboard.rutas_count']
    kilometros: typeof routes['dashboard.kilometros']
    conductores: typeof routes['dashboard.conductores']
    viajes: typeof routes['dashboard.viajes']
  }
  rendimiento: {
    rutasPorDia: typeof routes['rendimiento.rutas_por_dia']
    kmPorZona: typeof routes['rendimiento.km_por_zona']
    rendimiento: typeof routes['rendimiento.rendimiento']
    entregasCompletadas: typeof routes['rendimiento.entregas_completadas']
    capacidadLogistica: typeof routes['rendimiento.capacidad_logistica']
    rendimientoVehiculos: typeof routes['rendimiento.rendimiento_vehiculos']
    vehiculoMenorKilometraje: typeof routes['rendimiento.vehiculo_menor_kilometraje']
    tiempoCediAmVehiculos: typeof routes['rendimiento.tiempo_cedi_am_vehiculos']
    tiempoCediPmVehiculos: typeof routes['rendimiento.tiempo_cedi_pm_vehiculos']
    tiempoCediAmZona: typeof routes['rendimiento.tiempo_cedi_am_zona']
    tiempoCediPmZona: typeof routes['rendimiento.tiempo_cedi_pm_zona']
    horasExtraZona: typeof routes['rendimiento.horas_extra_zona']
  }
  costos: {
    costos: typeof routes['costos.costos']
    costosDetalle: typeof routes['costos.costos_detalle']
  }
  personal: {
    personalDiario: typeof routes['personal.personal_diario']
    personalSemanal: typeof routes['personal.personal_semanal']
    personalMensual: typeof routes['personal.personal_mensual']
  }
  usuarios: {
    index: typeof routes['usuarios.index']
  }
  password: {
    forgot: typeof routes['password.forgot']
    reset: typeof routes['password.reset']
  }
  test: {
    send: typeof routes['test.send']
  }
}
