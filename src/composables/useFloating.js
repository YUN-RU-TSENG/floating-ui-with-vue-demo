import { ref, watchEffect, computed, onBeforeUnmount } from 'vue'
import { computePosition, offset, flip, shift, autoUpdate } from '@floating-ui/dom'



export function useFloating() {
    const strategy = ref('absolute')
    const floating = ref(null)
    const reference = ref(null)

    const x = ref(0)
    const y = ref(0)
    const xPX = computed(() => x.value + 'px')
    const yPX = computed(() => y.value + 'px')

    let cleanupAutoUpdate = null

    const stopWatchEffect = watchEffect(function startListeningPosition() {
        if (!reference.value || !floating.value) return

        cleanupAutoUpdate = autoUpdate(reference.value, floating.value, async () => {
            const { x: xValue, y: yValue } = await computePosition(
                reference.value,
                floating.value,
                {
                    placement: 'bottom',
                    middleware: [offset(6), flip(), shift()],
                }
            )

            x.value = xValue
            y.value = yValue
        })

        stopWatchEffect()
    })

    onBeforeUnmount(() => {
        cleanupAutoUpdate()
    })

    return { x: xPX, y: yPX, reference, floating, strategy }
}
