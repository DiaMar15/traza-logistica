/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.register': {
    methods: ["POST"]
    pattern: '/api/v1/auth/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'rutas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rutas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'rutas.count': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rutas/count'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'rutas.kilometros': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rutas/kilometros'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'rutas.buscar': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rutas/buscar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'rutas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/rutas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'rutas.store': {
    methods: ["POST"]
    pattern: '/api/v1/rutas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'rutas.update': {
    methods: ["PUT"]
    pattern: '/api/v1/rutas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'rutas.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/rutas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'rutas.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/rutas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'vehiculos.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/vehiculos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'vehiculos.store': {
    methods: ["POST"]
    pattern: '/api/v1/vehiculos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'vehiculos.update': {
    methods: ["PUT"]
    pattern: '/api/v1/vehiculos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'vehiculos.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/vehiculos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'conductores.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/conductores'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'conductores.store': {
    methods: ["POST"]
    pattern: '/api/v1/conductores'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'conductores.sync': {
    methods: ["POST"]
    pattern: '/api/v1/conductores/sync'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'conductores.update': {
    methods: ["PUT"]
    pattern: '/api/v1/conductores/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'conductores.inactivar': {
    methods: ["PUT"]
    pattern: '/api/v1/conductores/:id/inactivar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'conductores.reactivar': {
    methods: ["PUT"]
    pattern: '/api/v1/conductores/:id/reactivar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'import_excel.importar': {
    methods: ["POST"]
    pattern: '/api/v1/importar-excel'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'google_sheets_rutas.sync': {
    methods: ["POST"]
    pattern: '/api/v1/sync-rutas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/google_sheets_rutas_controller').default['sync']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/google_sheets_rutas_controller').default['sync']>>>
    }
  }
  'import_vehiculos.importar': {
    methods: ["POST"]
    pattern: '/api/v1/importar-vehiculos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.rutas_count': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/rutas-count'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.kilometros': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/kilometros'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.rutas_por_dia': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/rutas-por-dia'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.km_por_zona': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/km-por-zona'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.rendimiento': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/rendimiento'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.costos': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/costos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.personal': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/personal'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.conductores': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/conductores'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.viajes': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/viajes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.entregas_completadas': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/entregas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.capacidad_logistica': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/capacidad'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.costos_detalle': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/costos-detalle'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'dashboard.rendimiento_vehiculos': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/rendimiento-vehiculos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'password.forgot': {
    methods: ["POST"]
    pattern: '/forgot-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'password.reset': {
    methods: ["POST"]
    pattern: '/reset-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'test.send': {
    methods: ["GET","HEAD"]
    pattern: '/test-mail'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
