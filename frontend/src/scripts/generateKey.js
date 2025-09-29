// utils/generateKeys.js
import crypto from 'crypto'

// Генерируем правильные ключи
const encryptionKey = crypto.randomBytes(32).toString('base64') // 32 байта
const signingKey = crypto.randomBytes(64).toString('base64') // 64 байта

console.log('ENCRYPTION_KEY=', encryptionKey)
console.log('SIGNING_KEY=', signingKey)
