import { ref } from "vue";

export const useWindowSize = () => {
    const width = ref(0)
    const height = ref(0)
    window.addEventListener('resize', () => {
        width.value = window.innerWidth
        height.value = window.innerHeight
    })

    width.value = window.innerWidth
    height.value = window.innerHeight

    return {
        width,
        height
    }
}