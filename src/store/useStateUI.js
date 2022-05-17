import { useState } from '../hooks'
import { defineStore } from 'pinia'

export const useStateUI = defineStore('stateUIStore', () => {
    const [screenLoading, setScreenLoading] = useState(false)

    return {
        screenLoading,
        setScreenLoading
    }
})