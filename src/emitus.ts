interface EmitusEvents {
  [key: string]: any
}

export type EmitusHandler = (type?: string, args?: any) => void

export interface Emitus {
  on (type: string, func: EmitusHandler): void
  off (type: string, func?: EmitusHandler): void
  emit (type: string, args?: any): void
}

export function emitus (): Emitus {
  const events: EmitusEvents = Object.create(null)

  const emitter: Emitus = {
    on (type: string, func: EmitusHandler): void {
      (events[type] || (events[type] = [])).push(func)
    },

    off (type: string, func?: EmitusHandler): void {
      if (events[type]) {
        events[type].splice(events[type].indexOf(func), 1)
      }
    },

    emit (type: string, args?: any): void {
      (events[type] || []).map((func: EmitusHandler) => {
        if (func && typeof func === 'function') {
          func(type, args)
        }
      })
    }
  }

  return emitter
}
