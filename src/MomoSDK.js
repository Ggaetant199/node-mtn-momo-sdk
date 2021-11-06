import uuidv4 from "./utils/uuidv4.js";
import basicAuthorization from "./utils/basicAutorization.js";
import fetch from "node-fetch";

export default class MomoSDK {
    /**
     * 
     * @param {Object} configs configurations parameters
     */
    constructor (configs = {}) {
        this.configs =  configs;

        this.setConfigs(configs);
    }

    setConfigs () {
        if (typeof this.configs != "object") {
            console.log("Err: paramètre d'instantiation de MomoSDk invalide, le paramètre de configuration doit être un object");
            this.configs = {};
        }

        if (!this.configs.baseUrl) {
            this.configs.baseUrl = "https://sandbox.momodeveloper.mtn.com";
        }

        if (!this.configs.version) {
            this.configs.version = "v1_0";
        }
    
        if (!this.configs.env) {
            this.configs.env = "sanbox";
        }

        if (!this.configs.subscriptionKey) {
            this.configs.subscriptionKey = "ca52dc8a38ee44a58204912a6495a409";
        }
        
        if (!this.configs.xReferenceId) {
            this.configs.xReferenceId = "";
        }

        if (!this.configs.apiKey) {
            this.configs.apiKey = "";
        }
        
        if (this.configs.callbackUrl) {
            this.configs.callbackUrl = "exemplate.com";
        }
    }

    async createApiUser (callbacks = null) {
        const url = this.configs.baseUrl + "/" + this.configs.version + "/apiuser";
        const xReferenceId = uuidv4();

        console.log(xReferenceId);

        const headers = {
            "X-Reference-Id": xReferenceId,
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": this.configs.subscriptionKey,
        }
        
        const body = JSON.stringify({
            "providerCallbackHost": this.configs.callbackUrl
        })
        
        try {
            const res = await fetch(url, {method: "POST", headers, body});
            

            if (res.status == 201) {
                return res;
            }
        } catch (error) {
            return error;
        }
    }

    async getApiUser (callback = null) {
        const url = this.configs.baseUrl + "/" + this.configs.version + "/apiuser/" + this.configs.xReferenceId;

        const headers = {
            "Ocp-Apim-Subscription-Key": this.configs.subscriptionKey,
        }
        
        try {
            const res = await fetch(url, {method: "GET", headers});
            
            if (typeof callbacks != "function") {
                return res;
            }

            if (res.status == 200) {
                const bold = await res.json();
                
                callback(bold, null, res);
            } else {
                callback(null, bold, res);
            }

            return res;
        } catch (error) {
            return error;
        }
    }

    async createApiKey (callbacks = null) {
        const url = this.configs.baseUrl + "/" + this.configs.version + "/apiuser/" + this.configs.xReferenceId + "/apikey";

        const headers = {
            "Ocp-Apim-Subscription-Key": this.configs.subscriptionKey,
        }
        
        try {
            const res = await fetch(url, {method: "POST", headers});

            if (res.status == 201) {
                const bold = await res.json();
                return bold;
            }

            return res;
        } catch (error) {
            return error;
        }
    }

    createBasicAuthorization () {
        const username = this.configs.xReferenceId;
        const password = this.configs.apiKey;
        
        return basicAuthorization(username, password);
    }

    getConfigs () {
        return this.configs;
    }
}