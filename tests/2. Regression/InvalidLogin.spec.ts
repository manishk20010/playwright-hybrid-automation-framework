import {test} from '../../src/fixture/baseFixture'
import InvalidData from '../../src/test-data/InvalidData.json'

for(const invaliduser of InvalidData){   
test(`Invalid data-${invaliduser.testCase}`,async ({login})=>{

   await login.Login(
    invaliduser.username,
    invaliduser.password,
    
   )  


 })

}