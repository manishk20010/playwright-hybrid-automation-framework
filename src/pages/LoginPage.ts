import { Locator, Page } from "@playwright/test";


export class LoginPage {
    page: Page

    EmailAddress: Locator
    Password: Locator
    Loginbtn: Locator
    ErrorMessage: Locator
    Logout: Locator

    constructor(page: Page) {
        this.page = page

        this.EmailAddress = page.getByPlaceholder('Email Address').nth(0)
        this.Password = page.getByPlaceholder('Password')
        this.Loginbtn = page.getByRole('button', { name: 'Login' })
        this.ErrorMessage = page.locator("form[action='/login'] p");
        this.Logout = page.getByRole('link', { name: ' Logout' })
    }

    async EnterUsername(username: string) {

        await this.EmailAddress.fill(username)
    }


    async EnterPassword(password: string) {

        await this.Password.fill(password)
    }

    async ClickLogin() {

        await this.Loginbtn.click()
    }

    async Login(username: string, password: string) {

        await this.EmailAddress.fill(username)
        await this.Password.fill(password)
        await this.Loginbtn.click()

    }





}