<template>
    <n-button strong secondary type="primary" size="large"
        :style="{
            '--n-color': `${ colorDisplay }`, 
            '--n-color-hover': `${ colorHover }`,
            '--n-color-pressed': `${ colorHover }`,
            '--n-color-focus': `${ colorHover }`,
            '--n-text-color': `${ colorText }`,
            '--n-text-color-hover': `${ colorText }`,
            '--n-border-radius': `8px`,
        }"
    >
        {{ content }}
    </n-button>
</template>

<script>
export default {
    name: 'TagEntry',
    props: {
        content: String,
        colorDisplay: String,
        colorHover: String,
        colorText: String,
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
