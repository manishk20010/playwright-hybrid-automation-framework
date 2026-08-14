import { request,test,expect } from "@playwright/test";

test('should verify Login details',async()=>{

 const api = await request.newContext()

 const response = await api.post('https://automationexercise.com/api/verifyLogin',
  {  
    form:{
          email: 'signup5446@gmail.com',
          password: 'Test123*'

    }
}
 )
 expect(response.status()).toBe(200);
 const body = await response.json()

 console.log(body)


})
