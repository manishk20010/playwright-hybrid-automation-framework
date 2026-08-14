import {Locator, Page} from '@playwright/test'

export class ProductPage{
     page:Page

     ProductLink:Locator
     SearchProducts:Locator
     SearchProductButton:Locator
     SearchedProducts:Locator
     ClickViewProduct:Locator

constructor(page:Page){
     this.page=page
    
      this.ProductLink = page.getByRole('link',{name:' Products'})
      this.SearchProducts = page.getByPlaceholder('Search Product')
      this.SearchProductButton = page.locator('#submit_search')
      this.SearchedProducts = page.locator('div.col-sm-9.padding-right')
                                 .locator('div.product-image-wrapper')

     this.ClickViewProduct = this.SearchedProducts.locator('a[ href="/product_details/1"]')
                                 

                     

    } 

    
    async Navigate(){
        await this.page.goto('/')
    }

    async ClickProductLink(){

        await this.ProductLink.click()
    }
  
     async EnterProducts(product:string){
        
        await this.SearchProducts.click()
        await this.SearchProducts.fill(product) 
        await this.SearchProductButton.click()
       
     }

     ValidateSearchedProduct(productname: string) {
    return this.SearchedProducts.filter({ hasText: productname });
     }
     
    async ViewProduct(){

        await this.ClickViewProduct.click() 
    }

}