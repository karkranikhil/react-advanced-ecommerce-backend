import 'dotenv/config'
import {createAuth} from '@keystone-next/auth'
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';
import { config, createSchema, list } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';
const databaseurl = process.env.DATABASE_URL || 'mongodb://localhost/nik-advanced-react'

const sessionConfig={
    maxAge: 60* 60*24*360, // how long they stay signed in
    secret:process.env.COOKIE_SECRET
}

const {withAuth} = createAuth({
    listKey:'User',
    identityField:'email',
    secretField:'password',
    initFirstItem:{
        fields:['name', 'email', 'password'],
        // Add in initial roles here
    }
})
export default withAuth(config({
    server:{
        cors:{
            origin:[process.env.FRONTEND_URL],
            credentials:true
        }
    },
    db:{
        adapter:'mongoose',
        url:databaseurl,
        //todo add data seediing here
        async onConnect(keystone){
            console.log("Connected to DB...")
            if(process.argv.includes('--seed-data')){
                await insertSeedData(keystone)
            }
        }
    },
    lists:createSchema({
        //schema items go in here
        User,
        Product,
        ProductImage
    }),
    ui:{
        // Show Ui Only who pass this Auth
        isAccessAllowed:({session})=>{
            // console.log(session)
            return session?.data
        }
    },
    // Add session values here
    session:withItemData(statelessSessions(sessionConfig),{
        User:`id name email` // data return about user
    })
}))