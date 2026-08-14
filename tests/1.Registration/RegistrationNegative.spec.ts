import {expect, test} from '../../src/fixture/baseFixture'
import {existingemail} from '../../src/utils/EmailGenerator'
import { TakeScreenshot } from '../../src/utils/screenshotUtil'


test('Should not allow registration with existing email',async({signup})=>{

  await signup.ClickSignUp()
  const Email = existingemail()
 await signup.EnterSignupDetails('Smith',Email)

 await expect(await signup.existingUserMessage()).toBeVisible()
 await expect(await signup.existingUserMessage()).toHaveText('Email Address already exist!')







})