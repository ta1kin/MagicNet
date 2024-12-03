import nodemailer from 'nodemailer'
import ejs from 'ejs'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: 'src/.env' })
 
const HOST = 'magicnet.site'
const PORT = process.env.PORT || 3000

const MAIL_SERVICE = process.env.EMAIL_SERVICE
const MAIL_HOST = process.env.EMAIL_HOST
const MAIL_PORT = Number( process.env.EMAIL_PORT )
const MAIL_USER = process.env.EMAIL_USER
const MAIL_PASS = process.env.EMAIL_PASS

if(
    !MAIL_SERVICE ||
    !MAIL_HOST ||
    !MAIL_PORT ||
    !MAIL_USER ||
    !MAIL_PASS
) {
    throw Error( 'Don`t have one of the mail settings!' )
} 


const transporter = nodemailer.createTransport( {
    service: MAIL_SERVICE,
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: true,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
} )

export const sendVerifyToEmail = async ( to: string, access_token: string ) => {

    const ejsPath = path.join( __dirname, '../../public/emailVerify-template.ejs' )
    
    const mailOptions = {
        from: MAIL_USER,
        to: to,
        subject: 'Подтверждение регистрации!',
        html: await ejs.renderFile( ejsPath, { HOST, access_token } )
    }

    return await transporter.sendMail( mailOptions)
}

export const sendRecoveryToEmail = async( to: string, secret_code: string ) => {

    const ejsPath = path.join( __dirname, '../../public/emailRecovery-template.ejs' )

    const mailOptions = {
        from: MAIL_USER,
        to: to,
        subject: 'Восстановление пароля!',
        html: await ejs.renderFile( ejsPath, { secret_code } )
    }

    return await transporter.sendMail( mailOptions)
}
