'use server'
import Query from "@/type/query"
import { prisma } from "./db"
import { Post } from "@/type/dbInterfaces"


export const getQuriedPosts = async (query:Query|undefined,page:number,postsPerPage:number):Promise<Post[]>=>{
    if(typeof query == "undefined" || query?.providerIds.length===0){
        return []
    }

    const skipping:number = (page-1)*postsPerPage

    const option = {
        where: {
            provider_id:{in:query.providerIds},
            text:{contains:query.keyword,
                    mode: 'insensitive',},
            
        },
        include: {
            provider: true,
        },
        take:postsPerPage,
        skip:skipping,
        orderBy:{
            date:"desc"
        }
        }

    if(query.dateAfter){
        //@ts-expect-error modify option
        option.where.date = {gte:query.dateAfter}
    }

    //console.log(option)

    try {
    // @ts-expect-error
    const posts = await prisma.post.findMany(option)
        //console.log(skipping,postsPerPage)
        // @ts-expect-error
        return posts
    } catch (error) {
        console.log(error)
        return []
    }
}