import vine from '@vinejs/vine'

const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

export const createRutaValidator = vine.compile(
  vine.object({

    fecha: vine.string().trim().optional(),
    mes: vine.string().trim().optional(),
    dia: vine.string().trim().optional(),

    placa: vine.string().trim().maxLength(10),

    tipo_vehiculo: vine.string().trim().optional(),

    empresa: vine.string().trim(),

    conductor: vine.string().trim(),

    auxiliar: vine.string().trim().optional(),

    destino: vine.string().trim(),

    zona: vine.string().trim().optional(),

    peso: vine.number().positive().optional(),

    volumen: vine.number().positive().optional(),

    numero_facturas: vine.number().min(0).optional(),

    numero_clientes: vine.number().min(0).optional(),

    inicio_ruta: vine.string().trim().regex(horaRegex),

    fin_ruta: vine.string().trim().regex(horaRegex),

    km_inicial: vine.number().min(0),

    km_final: vine.number().min(0),

    /*
    Calculados por backend
    */

    tiempo_en_ruta: vine.string().trim().regex(horaRegex).optional(),

    total_kilometros: vine.number().min(0).optional(),

    observaciones: vine.string().trim().optional(),

  })
)

/*
PATCH validator
*/

export const patchRutaValidator = vine.compile(
  vine.object({

    fecha: vine.string().trim().optional(),
    mes: vine.string().trim().optional(),
    dia: vine.string().trim().optional(),

    placa: vine.string().trim().maxLength(10).optional(),

    tipo_vehiculo: vine.string().trim().optional(),

    empresa: vine.string().trim().optional(),

    conductor: vine.string().trim().optional(),

    auxiliar: vine.string().trim().optional(),

    destino: vine.string().trim().optional(),

    zona: vine.string().trim().optional(),

    peso: vine.number().min(0).optional(),
    volumen: vine.number().min(0).optional(),

    numero_facturas: vine.number().min(0).optional(),

    numero_clientes: vine.number().min(0).optional(),

    inicio_ruta: vine.string().trim().regex(horaRegex).optional(),

    fin_ruta: vine.string().trim().regex(horaRegex).optional(),

    km_inicial: vine.number().min(0).optional(),

    km_final: vine.number().min(0).optional(),

    tiempo_en_ruta: vine.string().trim().regex(horaRegex).optional(),

    total_kilometros: vine.number().min(0).optional(),

    observaciones: vine.string().trim().optional(),

  })
)
