import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyASZvjLF56WanM4GHiESdNPw3DeGAg9At8',
  authDomain: 'advinhe-a-palavra.firebaseapp.com',
  projectId: 'advinhe-a-palavra',
  storageBucket: 'advinhe-a-palavra.appspot.com',
  messagingSenderId: '1085141096311',
  appId: '1:1085141096311:web:5459cacc32b238f7d97372',
  measurementId: 'G-BEC1NQ85SK',
}

const app = initializeApp(firebaseConfig)
const STORAGE_FOLDER_PATH = 'gs://advinhe-a-palavra.appspot.com'
export const storage = getStorage(app, STORAGE_FOLDER_PATH)
