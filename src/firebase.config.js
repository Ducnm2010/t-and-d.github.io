import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyBdbGmzuST6h96dwDlAe-rwaIrfOzBZqag',
    authDomain: 'dapp-demo-25b55.firebaseapp.com',
    projectId: 'dapp-demo-25b55',
    storageBucket: 'dapp-demo-25b55.appspot.com',
    messagingSenderId: '351109488954',
    appId: '1:351109488954:web:8841834071dad11e943003',
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)