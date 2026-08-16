import { test, expect } from '../../src/fixture/baseFixture'
import validData from '../../src/test-data/validData.json'
import { TakeScreenshot } from '../../src/utils/screenshotUtil'
import fs from 'fs'

test('should login successfully',async({login})=>{

const user = JSON.parse(
    fs.readFileSync('test-data/user.json','utf-8')
)
await login.Login(user.email,user.password)




})