import { test, expect, request } from '@playwright/test';

test('Get All Products', async () => {

    const api = await request.newContext()
    
    const response = await api.get('https://automationexercise.com/api/productsList')

    const body = await response.json()
    
   
    //console.log(body)
    
    console.log(body.products[2])

    expect(response.status()).toBe(200)





});