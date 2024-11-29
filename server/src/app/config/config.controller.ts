import { Request, Response } from 'express'
import { verifyToken } from '../middlewares/auth.middleware'
import { ACCESS } from '../../config/config.auth'
import { prisma } from '../prisma'

import asyncHandler from 'express-async-handler'

import type { UserConfig } from '../../types/type.config'


export default {
    updateSettings: asyncHandler( async ( req: Request, res: Response ) => {
        const config: UserConfig = req.body

        let access_token
        let userFound

        if( req.headers.authorization?.startsWith('Bearer') ) {
            access_token = req.headers.authorization.split( ' ' )[1]
        }
        
        if ( access_token ) userFound = await verifyToken( access_token, ACCESS )

        await prisma.config.update({
            where: {
                userId: userFound?.id
            },
            data: config
        })

        res.status( 200 ).json( { message: 'updated config' } )
    } )
}