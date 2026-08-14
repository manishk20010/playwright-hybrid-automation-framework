import { Locator, Page } from "@playwright/test";

export class SignUp{
   page:Page

   signuplink:Locator
   Name:Locator
   EmailAddress:Locator
   Signup:Locator
   Title:Locator
   Password:Locator
   DateOfBirthDay:Locator
   DateOfBirthMonth:Locator
   DateOfBirthYear:Locator

   FirstName:Locator
   LastName:Locator
   Address:Locator
   Country:Locator
   State:Locator
   City:Locator
   Zipcode:Locator
   MobileNumber:Locator
   CreateAccountButton:Locator
   AccountCreated:Locator
   ContinueLink:Locator
   ErrorMessage:Locator

    constructor(page:Page){
      this.page=page

      this.signuplink = page.getByRole('link',{name:' Signup / Login'})
      this.Name = page.locator('[placeholder="Name"]')
      this.EmailAddress = page.locator('form[action="/signup"]').getByPlaceholder('Email Address')
      this.Signup = page.getByRole('button',{name:'Signup'})

      this.Title = page.locator('#id_gender1')
      this.Password = page.getByLabel('Password ')
      this.DateOfBirthDay = page.locator('#days')
      this.DateOfBirthMonth= page.locator('#months')
      this.DateOfBirthYear= page.locator('#years')
      this.FirstName = page.getByLabel('First name ')
      this.LastName = page.getByLabel('Last name ')
      this.Address = page.getByLabel('Address ').nth(0)
      this.Country = page.getByLabel('Country ')
      this.State = page.getByLabel('State ')
      this.City = page.getByLabel('City ')
      this.Zipcode = page.locator('#zipcode')
      this.MobileNumber = page.getByLabel('Mobile Number ')
      this.CreateAccountButton = page.getByRole('button',{name:'Create Account'})
      this.AccountCreated = page.locator('h2.title.text-center',{hasText:'Account Created!'})
      this.ContinueLink = page.getByRole('link',{name:'Continue'})
      this.ErrorMessage = page.getByText('Email Address already exist!')
    }

    async ClickSignUp(){
        await this.signuplink.click()
    }
    
    async EnterSignupDetails(name:string,email:string){

        await this.Name.fill(name)
        await this.EmailAddress.fill(email)
        await this.Signup.click()
    }
 
     async EnterTitle(){

        await this.Title.check()

     }

    async EnterPassword(password:string){

        await this.Password.fill(password)

     }

     async EnterDOB(){

        await this.DateOfBirthDay.selectOption({label: '1'})
        await this.DateOfBirthMonth.selectOption({value:'2'})
        await this.DateOfBirthYear.selectOption({value:'1990'})
        }
        

     async EnterFirstName(Firstname:string){

        await this.FirstName.fill(Firstname)
     }

     
      async EnterLastName(lastname:string){

        await this.LastName.fill(lastname)
     }

    async EnterAddress(address:string){

        await this.Address.fill(address)
     }

    async SelectCountry(){

        await this.Country.selectOption({value: 'United States'})
     }

    async EnterState(state:string){

        await this.State.fill(state)
     }
    
     async EnterCity(state:string){

        await this.City.fill(state)
     }
  
     async EnterZip(zip:string){

        await this.Zipcode.fill(zip)
     }

     async EnterMobile(mobile:string){

        await this.MobileNumber.fill(mobile)
     }

     async ClickCreateAccountButton(){

        await this.CreateAccountButton.click()
     }

     async Accountcreated(){
        await this.AccountCreated.highlight()
     }

     async ClickContinue(){
        await this.ContinueLink.click()
     }    

      async existingUserMessage() {
      return this.ErrorMessage
     }

}