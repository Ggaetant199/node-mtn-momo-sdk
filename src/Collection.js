import fetch from "node-fetch";
import https from "https";
import fs from "fs";

const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
});

export default class Collection {
    constructor (InstanceMomoSDK) {
        this.momoSDK = InstanceMomoSDK;
        this.configs = this.momoSDK.getConfigs();
    }

    async requestToPay (params = {}) {
        try {
            
        } catch (error) {
            return error;
        }
    }

    async generateAccessToken () {
        const url = this.configs.baseUrl + "/collection/token";
        const Authorization = this.momoSDK.createBasicAuthorization();
        
        const headers = {
            "Authorization": Authorization,
            "Ocp-Apim-Subscription-Key": this.configs.subscriptionKey,
        }
        
        try {
            const res = await fetch(url, {method: "POST", headers, agent: httpsAgent});

            if (res.status == 200) {
                const resBody = await res.json();
                resBody.timeout_expires_in = Date.now() + resBody.expires_in * 1000;

                fs.writeFileSync('mtnMomoCollectionAccessToken.json', JSON.stringify(resBody));

                return resBody;
            }

            return res;
        } catch (error) {
            return error;
        }
    }
}