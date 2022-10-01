<script setup>
    import { ref, watchEffect, computed } from 'vue'
    import { computePosition, offset, flip, shift } from '@floating-ui/dom'

    const { x, y, reference, floating, strategy } = useFloating()

    function useFloating() {
        const strategy = ref('absolute')
        const floating = ref(null)
        const reference = ref(null)
        const x = ref(0)
        const y = ref(0)
        const xPX = computed(() => x.value + 'px')
        const yPX = computed(() => y.value + 'px')

        watchEffect(async () => {
            if (!reference.value || !floating.value) return

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

            console.log(yValue, xValue, x.value)
        })

        return { x: xPX, y: yPX, reference, floating, strategy }
    }
</script>

<template>
    <div id="app">
        <button ref="reference">Button</button>
        <div
            ref="floating"
            :style="{
                position: strategy,
                top: y,
                left: x,
            }"
        >
            Tooltip
        </div>
    </div>
</template>

<style scoped>
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.vue:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
    }
</style>
