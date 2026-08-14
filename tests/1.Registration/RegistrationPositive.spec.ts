import {expect, test} from '../../src/fixture/baseFixture'
import {email} from '../../src/utils/EmailGenerator'
import { TakeScreenshot } from '../../src/utils/screenshotUtil'
import fs from 'fs'


test('Should Sign Up successfully-Happy FLOW',async({signup,page})=>{   
 
 await signup.ClickSignUp()
 const Email = email()
 await signup.EnterSignupDetails('Smith',Email.email)
 const user = {
  email: Email.email,
  password: Email.password
};

fs.writeFileSync(  
  'test-data/user.json',
  JSON.stringify(user, null, 2)
);

 await TakeScreenshot(page)
 await expect(signup.page).toHaveURL('/signup') 
 await signup.EnterTitle()
 await signup.EnterPassword(Email.password)


 await signup.EnterDOB()
 await signup.EnterFirstName('Smith')
 await signup.EnterLastName('John')
 await signup.EnterAddress('100 high street')
 await signup.SelectCountry()
 await signup.EnterState('Bih')
 await signup.EnterCity('Kgg')
 await signup.EnterZip('413256')
 await signup.EnterMobile('123456789')
 await signup.ClickCreateAccountButton() 
await expect(signup.AccountCreated).toHaveText('Account Created!')
await TakeScreenshot(page)
await signup.ClickContinue()
await TakeScreenshot(page)

})