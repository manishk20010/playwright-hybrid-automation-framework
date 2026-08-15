import {test as base,expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { SignUp } from '../pages/signupPage'
import { ProductPage } from '../pages/ProductPage'


type myFixture = {
    
    signup:SignUp
    login:LoginPage
    Products:ProductPage
}

export const test = base.extend<myFixture>({

       login: async({page},use)=>{

        await page.goto('/login') 

        const loginPage = new LoginPage(page)

        await use(loginPage)

       },

      signup: async({page},use)=>{
        
        await page.goto('/') 
        const signupobj = new SignUp(page)
        await use(signupobj)    

      },

      Products:async({page},use)=>{
        
        const productpage = new ProductPage(page)
        await use(productpage)
      }
         
})
export { expect };
