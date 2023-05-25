<template>
    <n-button :class="{'animate__animated animate__fadeInLeft': shouldAnimate && !isLoggedIn}" strong secondary type="primary" size="large" :focusable="false"
    
        :style="{
            'animation-delay': `${0.5 + index * 0.04}s`,
            '--n-color': `${ colorDisplay }`, 
            '--n-color-hover': `${ colorHover }`,
            '--n-color-pressed': `${ colorHover }`,
            '--n-color-focus': `${ colorHover }`,
            '--n-text-color': `${ colorText }`,
            '--n-text-color-hover': `${ colorText }`,
            '--n-text-color-pressed': `${ colorText }`,
            '--n-text-color-focus': `${ colorText }`,
            '--n-border-radius': `8px`,
        }"
    >
        {{ content }}
    </n-button>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'TagEntry',
    computed: {
        ...mapState(['isLoggedIn']),
    },
    props: {
        index: Number,
        content: String,
        colorDisplay: String,
        colorHover: String,
        colorText: String,
        shouldAnimate: Boolean,
    },
    data() {
        return {

        }
    },
    methods: {
        jumpSearchTag() {
            console.log('I\'ll jump to ' + this.content)
        }
    }
}
</script>

<style>

</style>
