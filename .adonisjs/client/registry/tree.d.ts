/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
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
  importExcel: {
    importar: typeof routes['import_excel.importar']
  }
  googleSheetsRutas: {
    sync: typeof routes['google_sheets_rutas.sync']
  }
  importVehiculos: {
    importar: typeof routes['import_vehiculos.importar']
  }
}
