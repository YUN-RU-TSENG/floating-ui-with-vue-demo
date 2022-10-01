<script setup>
    import { useFloating } from './composables/useFloating'

    const { x, y, reference, floating, strategy } = useFloating()
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
