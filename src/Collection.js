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
    const url = this.configs.baseUrl + "/collection/" + this.configs.version + "/requesttopay";

    params.callbackUrl = "exemple.com";
    params.targetEnveironment = "sandbox";

    const headers = {
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjBmNDY0MTk2LTZiNDMtNDhiZi05NDE4LTQzNTE0ZTNkZGY5YyIsImV4cGlyZXMiOiIyMDIxLTExLTA3VDA3OjIwOjE0LjgwMyIsInNlc3Npb25JZCI6IjEwNjRmOTg3LTI4MjUtNDU3NC1iMDUyLTdhNjM0MWEyNjVjZCJ9.jUqj5yPHi7BLlHS_X-OcsVl-csHMhhJ5iUmdJRuwdRHMviQffF3mvaa2HdE01fQj4oQaoH2yRGXMT_8d2V5jlUi__0r_xlTVsRREDyOIeG4-Fle0dESfTvBBpGeMjGaxsg9D3uxUbTPKWto8NQttWZmHXodpnHh9ceYTcBM6c8SDcVNweHqSFDvcwwBRwLMzO4QIiBYonYGAwPmPm9V6nZ2JZjej6jMx7EQNSZ2m5RAuxMc9rTaN360mNQxjrIoQn7kYjaWjMYG_oPQerbOYFMUZ1-Xss1iNWDYTcRSj6FqAFijzYn4QulOW5G8BaE9SV5pwDrt6v8hn1MRWpgiG5Q",
      "Content-Type": "application/json",
      "X-Reference-Id": this.configs.xReferenceId,
      "X-target-Environment": params.targetEnveironment,
      "Ocp-Apim-Subscription-Key": this.configs.subscriptionKey,
      "X-Callback-url": params.callbackUrl
    }; 

    params.amount = "100";
    params.curerency = "EUR";
    params.externalId = "12345";
    params.payerMessage = "payement";
    params.payeeNote = "payement2";

    const body = JSON.stringify({
      amount: params.amount,
      curerency: params.curerency,
      externalId: params.externalId,
      payer: {
        partyIdType: "MSISDN",
        partyId: "673815661"
      },
      payerMessage: params.payerMessage,
      payeeNote: params.payeeNote
    });

    try {
      const res = await fetch(url, {
        method: "POST",
        headers, body
      });

      const bodyRes = await res.text();

      console.log(res);
      console.log(bodyRes);
    } catch (error) {
      console.log(error);
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