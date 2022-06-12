import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase.config'
import _array from 'lodash/array'

const createSession = ({ isCanceled, startTime, endTime, startingPrice, name, description, address, imgSrc }) => ({
    isCanceled: isCanceled, //
    startTime: startTime, //
    startingPrice: startingPrice, //
    endTime: endTime,
    name: name,
    description: description,
    address: address,
    imgSrc: imgSrc,
})

const filterInvalidFields = (obj) => {
    return Object.keys(obj).reduce((prev, curr) => {
        if (!obj[curr]) return { ...prev }
        return { ...prev, [curr]: obj[curr] }
    }, {})
}

export const useFirebase = defineStore('firebaseStore', () => {
    const sessionCollectionRef = collection(db, 'sessions')

    const listSessions = ref([])
    const listSessionsPaginated = computed(() => _array.chunk(listSessions.value, pagination.value.pageSize))

    const pagination = ref({
        pageNumber: 1,
        pageSize: 6,
        totalPages: 0,
        totalRecords: 0
    })
    const session = ref({
        isCanceled: false,
        startTime: '',
        startingPrice: '',
        endTime: '',
        name: '',
        description: '',
        address: '',
        imgSrc: ''
    })

    const fetchSessions = async () => {
        const response = await getDocs(sessionCollectionRef)
        listSessions.value = response.docs.map(doc => ({ ...doc.data() }))
        pagination.value.totalPages = Math.ceil(listSessions.value.length / pagination.value.pageSize)
        pagination.value.totalRecords = listSessions.value.length
    }

    const createNewSession = async (data) => {
        const newSession = filterInvalidFields(createSession(data))
        try {
            const response = await addDoc(sessionCollectionRef, newSession)
            console.log('response', response)
        } catch (error) {
            console.log(error)
        }
    }

    const updateSession = async ({ id, ...data }) => {
        try {
            const updatedSession = doc(db, 'sessions', id)
            const response = await updateDoc(updatedSession, data)
            console.log('response', response)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async (file) => {
        try {
            const imageRef = storageRef(storage, `images/${file.name + file.uid}`)
            await uploadBytes(imageRef, file.originFileObj)
            return await getDownloadURL(imageRef)
        } catch (error) {
            console.log(error)
        }
    }
    return {
        listSessions,
        listSessionsPaginated,
        pagination,
        fetchSessions,
        createNewSession,
        updateSession,
        uploadImage
    }
})