import { APIRequest,APIRequestContext,APIResponse } from "@playwright/test";

export class BaseAPI{
protected api: APIRequestContext;
    constructor(api: APIRequestContext){
    this.api = api;
    }

   




}