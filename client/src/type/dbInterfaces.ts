
export interface Post{
    post_id:String,
    provider_id:String,
    text:String,
    images:string[],
    date:Date,
    provider:Provider
}

export interface Provider{
    provider_id:string,
    provider_name:String
}