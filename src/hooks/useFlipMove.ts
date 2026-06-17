import { useCallback, useLayoutEffect, useRef } from 'react'

// --- FLIP ANIMATION ---
// Animates cards between kanban columns using FLIP (First, Last, Invert, Play).
// The moved card gets overshoot easing + a lift (scale + shadow).
// Displaced neighbours get plain ease, no overshoot.
//
// Usage:
//   const setCardRef = useFlipMove(orderKey, movedId)
//   <div ref={setCardRef(card.id)} ...>
//
// `orderKey` must change whenever card order/column changes (join of all ids in
// render order). `movedId` is the id of the card whose column just changed;
// pass null when no single card is the actor.

export interface FlipMoveOptions {
  /** Settle duration for the moved card, ms. Default 320. */
  movedDurationMs?: number
  /** Reflow duration for displaced neighbours, ms. Default 240. */
  neighbourDurationMs?: number
  /** Easing for the moved card. Default has a touch of overshoot. */
  movedEasing?: string
  /** Easing for neighbours. Default standard ease, no overshoot. */
  neighbourEasing?: string
  /** Lift scale applied to the moved card while in flight. Default 1.04. */
  liftScale?: number
  /** Box-shadow applied to the moved card while in flight. */
  liftShadow?: string
  /** Disable all animation (falls back to instant). Default false. */
  disabled?: boolean
}

const DEFAULTS = {
  movedDurationMs: 320,
  neighbourDurationMs: 240,
  movedEasing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  neighbourEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  liftScale: 1.04,
  liftShadow: '0 8px 20px rgba(0, 0, 0, 0.18)',
  disabled: false,
} satisfies Required<FlipMoveOptions>

export function useFlipMove(
  orderKey: string,
  movedId: string | null,
  options?: FlipMoveOptions,
): (id: string) => (el: HTMLElement | null) => void {
  const opts = { ...DEFAULTS, ...options }

  const els = useRef(new Map<string, HTMLElement>())
  const prevRects = useRef(new Map<string, DOMRect>())

  const setRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) els.current.set(id, el)
      else els.current.delete(id)
    },
    [],
  )

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // Neutralise any in-flight transforms so getBoundingClientRect() reads
    // true layout position, not the visually-transformed one. Prevents
    // accumulated offset error on rapid successive moves.
    els.current.forEach((el) => {
      el.style.transition = 'none'
      el.style.transform = ''
    })

    // Measure "Last": the new committed layout.
    const last = new Map<string, DOMRect>()
    els.current.forEach((el, id) => last.set(id, el.getBoundingClientRect()))

    const first = prevRects.current
    const shouldAnimate = !opts.disabled && !prefersReduced && first.size > 0

    if (shouldAnimate) {
      // Invert: place each card back at its old visual position.
      els.current.forEach((el, id) => {
        const f = first.get(id)
        const l = last.get(id)
        if (!f || !l) return // newly mounted card — nothing to invert from
        const dx = f.left - l.left
        const dy = f.top - l.top
        if (dx === 0 && dy === 0) return

        const isMoved = id === movedId
        el.style.transition = 'none'
        el.style.transform =
          `translate(${dx}px, ${dy}px)` +
          (isMoved ? ` scale(${opts.liftScale})` : '')
        el.style.willChange = 'transform'
        if (isMoved) {
          el.style.boxShadow = opts.liftShadow
          el.style.zIndex = '5'
        }
      })

      // Force one synchronous reflow so the inverted state is committed
      // before we start the play transition.
      void document.body.offsetHeight

      // Play: transition every inverted card to identity.
      requestAnimationFrame(() => {
        els.current.forEach((el, id) => {
          if (!el.style.transform) return
          const isMoved = id === movedId

          el.style.transition = isMoved
            ? `transform ${opts.movedDurationMs}ms ${opts.movedEasing}, ` +
              `box-shadow ${opts.movedDurationMs}ms ease`
            : `transform ${opts.neighbourDurationMs}ms ${opts.neighbourEasing}`
          el.style.transform = 'translate(0px, 0px) scale(1)'
          if (isMoved) el.style.boxShadow = 'none'

          const cleanup = (e: TransitionEvent) => {
            if (e.propertyName !== 'transform') return
            el.style.transition = ''
            el.style.transform = ''
            el.style.boxShadow = ''
            el.style.zIndex = ''
            el.style.willChange = ''
            el.removeEventListener('transitionend', cleanup)
          }
          el.addEventListener('transitionend', cleanup)
        })
      })
    }

    // Store this commit's true layout as "First" for the next move.
    prevRects.current = last
  }, [orderKey, movedId, opts.disabled])

  return setRef
}
// --- END FLIP ANIMATION ---
