import crypto from "crypto"
import * as dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-256-cbc"
const secretKey = crypto.createHash('sha256').update(String(process.env.SECRET)).digest('base64').substr(0, 32); 
const iv = crypto.randomBytes(16)

function encrypt (text : string) : string { 
    const cipher = crypto.createCipheriv(algorithm, secretKey , iv  );
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted , cipher.final()])
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

function decrypt (text : string) : string {
    console.log(text);
    const [ivHex , encryptedHex] = text.split(':')
    const iv = Buffer.from(ivHex , 'hex')
    const encrypted = Buffer.from(encryptedHex, 'hex')
    const decipher = crypto.createDecipheriv(algorithm , secretKey , iv)
    let decrypted = decipher.update(encrypted)
    decrypted = Buffer.concat([decrypted , decipher.final()])
    return decrypted.toString()
}

export {decrypt , encrypt}