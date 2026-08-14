import {Page} from '@playwright/test'
import { randomnumber } from './random'

  export async function TakeScreenshot(page:Page){
  
   await page.screenshot({ 
    path:`src/screenshot/signup${randomnumber()}.png`

   })

}