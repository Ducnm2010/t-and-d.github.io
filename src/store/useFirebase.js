import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase.config'
import _array from 'lodash/array'
import { message } from 'ant-design-vue'

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

    const filterFunction = ref(val => val)
    const listSessions = ref([])
    const listSessionsFiltered = computed(() => listSessions.value.filter(filterFunction.value))
    const listSessionsPaginated = computed(() => _array.chunk(listSessionsFiltered.value, pagination.value.pageSize))


    const pagination = ref({
        pageNumber: 1,
        pageSize: 6,
        totalPages: computed(() => Math.ceil(listSessionsFiltered.value.length / pagination.value.pageSize) || 0),
        totalRecords: computed(() => listSessionsFiltered.value.length)
    })
    const sessionInstance = ref({
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
        listSessions.value = response.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        console.log('@fetchSessions', listSessions.value)
        // pagination.value.totalPages = Math.ceil(listSessionsFiltered.value.length / pagination.value.pageSize)
        // pagination.value.totalRecords = listSessionsFiltered.value.length
    }

    const fetchSessionDetail = async (id) => {
        try {
            const sessionRef = await doc(db, 'sessions', id)
            const response = await getDoc(sessionRef)
            Object.assign(sessionInstance.value, response.data())
        } catch (error) {
            console.log(error)
        }
    }

    const createNewSession = async (data) => {
        const newSession = filterInvalidFields(createSession(data))
        try {
            const response = await addDoc(sessionCollectionRef, newSession)
            console.log('response', response)
        } catch (error) {
            console.log(error)
            message.error(error.message)
        }
    }

    const updateSession = async ({ id, ...data }) => {
        try {
            const sessionRef = doc(db, 'sessions', id)
            const response = await updateDoc(sessionRef, data)
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
            message.error(error.message)
        }
    }
    return {
        filterFunction,
        listSessions,
        listSessionsFiltered,
        listSessionsPaginated,
        pagination,
        sessionInstance,
        fetchSessions,
        fetchSessionDetail,
        createNewSession,
        updateSession,
        uploadImage
    }
})