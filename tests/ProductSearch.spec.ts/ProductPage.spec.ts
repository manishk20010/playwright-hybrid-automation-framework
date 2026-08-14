import {expect, test} from '../../src/fixture/baseFixture'
import { TakeScreenshot } from '../../src/utils/screenshotUtil'
import fs from 'fs'

test('Should search Products',async({login,Products,page})=>{

    const user = JSON.parse(
        fs.readFileSync('test-data/user.json','utf-8')
    )
    await login.Login(user.email,user.password)
    
await Products.Navigate()
await Products.ClickProductLink()
await expect(Products.page).toHaveURL('/products')
await Products.EnterProducts('Blue')
const expectedProduct = 'Blue Top';
await expect(Products.ValidateSearchedProduct(expectedProduct)).toBeVisible();
await Products.ViewProduct()
await TakeScreenshot(page)
})