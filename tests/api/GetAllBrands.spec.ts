import {test,request,expect} from '@playwright/test'

test('should get all brands',async ()=>{

const api = await request.newContext()

const response = await api.get('https://automationexercise.com/api/brandsList')

const body = await response.json()

console.log(body)

const brand = body.brands

const poloBrand = brand.find(id => id.brand === 'Biba');
const poloBrand1 = brand.filter(item=>item.brand==='Biba');

console.log(poloBrand1);

expect(poloBrand1.length).toBeGreaterThan(1)

})