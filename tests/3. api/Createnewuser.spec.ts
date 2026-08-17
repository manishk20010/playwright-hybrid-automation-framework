import {test,request, expect} from '@playwright/test'

test('Post to create new user',async()=>{

const api = await request.newContext()  // creating new context //

const response = await api.post('https://automationexercise.com/api/createAccount',
    {
      form: {
           name: 'Manish Kumar',
            email: `mk${Date.now()}@gmail.com`, // Unique email
            password: 'Test123*',
            title: 'Mr',
            birth_date: '10',
            birth_month: 'May',
            birth_year: '1990',
            firstname: 'MK',
            lastname: 'Kumar',
            company: 'ABC Pvt Ltd',
            address1: 'Pune',
            address2: 'Near Railway Station',
            country: 'India',
            zipcode: '411001',
            state: 'Maharashtra',
            city: 'Pune',
            mobile_number: '9876543210'
     }
    }
)
    const body = await response.json();
    expect(response.status()).toBe(200)

    console.log(response)
    //expect(body.response).toBe(201);
    expect(body.message).toBe('User created!');
})