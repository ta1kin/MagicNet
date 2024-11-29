import dotenv from 'dotenv'

import type { TokenVariant } from '../types/type.auth'

dotenv.config({ path: '.env' })

const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const RESET_SECRET = process.env.ACCESS_SECRET

if ( !ACCESS_SECRET || !REFRESH_SECRET || !RESET_SECRET ) {
    throw new Error( 'Don`t have a secret!' )
}

const ACCESS_TTL = process.env.ACCESS_TTL
const REFRESH_TTL = process.env.REFRESH_TTL
const RESET_TTL = process.env.RESET_TTL

if ( !ACCESS_TTL || !REFRESH_TTL || !RESET_TTL ) {
    throw new Error( 'Don`t have a ttl!' )
}

export const REFRESH_MS = Number( process.env.REFRESH_MS )
export const ACCESS_MS = Number( process.env.ACCESS_MS )
export const RESET_MS = Number( process.env.RESET_MS )

if ( !REFRESH_MS || !ACCESS_MS || !RESET_MS ) {
    throw new Error( 'Don`t have a ms!' )
}

export const ACCESS = 'access'
export const REFRESH = 'refresh'
export const RESET = 'reset'

export const tokenVariant: TokenVariant = {
    access: {
        secret: ACCESS_SECRET,
        time: ACCESS_TTL
    },
    refresh: {
        secret: REFRESH_SECRET,
        time: REFRESH_TTL
    },
    reset: {
        secret: RESET_SECRET,
        time: RESET_TTL
    }
}
