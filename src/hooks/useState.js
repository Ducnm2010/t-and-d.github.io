import { ref } from 'vue'

export const useState = (defaultValue) => {
    const state = ref(defaultValue)

    const setState = newVal => {
        state.value = newVal
    }

    return [state, setState]
}