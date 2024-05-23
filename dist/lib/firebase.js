"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
var app_1 = require("firebase/app");
var storage_1 = require("firebase/storage");
var firebaseConfig = {
    apiKey: 'AIzaSyASZvjLF56WanM4GHiESdNPw3DeGAg9At8',
    authDomain: 'advinhe-a-palavra.firebaseapp.com',
    projectId: 'advinhe-a-palavra',
    storageBucket: 'advinhe-a-palavra.appspot.com',
    messagingSenderId: '1085141096311',
    appId: '1:1085141096311:web:5459cacc32b238f7d97372',
    measurementId: 'G-BEC1NQ85SK',
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var STORAGE_FOLDER_PATH = 'gs://advinhe-a-palavra.appspot.com';
exports.storage = (0, storage_1.getStorage)(app, STORAGE_FOLDER_PATH);
