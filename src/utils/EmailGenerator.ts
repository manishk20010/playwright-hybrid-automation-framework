import { randomnumber } from "./random"

export function email(){
    
    const random = randomnumber()
    return { 
        email:`signup${random}@gmail.com`,
        password: 'Test123*'
    }
       
}


export function existingemail(){
    
   
    return `signup8104@gmail.com`
}