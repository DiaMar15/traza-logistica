export function limpiarTexto(valor: any) {
  return valor ? valor.toString().trim() : null
}

export function limpiarNumero(valor: any) {
  if (!valor) return 0
  return Number(
    valor
      .toString()
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  ) || 0
}

export function limpiarDinero(valor: any) {
  if (!valor) return 0
  return Number(
    valor
      .toString()
      .replace("$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  ) || 0
}

export function limpiarHora(valor: any) {
  if (!valor) return null
  return valor.toString().trim()
}
