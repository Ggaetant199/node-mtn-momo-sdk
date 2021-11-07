import { MomoSDK, Collection } from "../index.js";
import fs from "fs";

//0f464196-6b43-48bf-9418-43514e3ddf9c

const sdk = new MomoSDK({
  xReferenceId: "0f464196-6b43-48bf-9418-43514e3ddf9c",
  apiKey: "fda053248cac4e1eae635779a7680a93",
});

// sdk.createApiKey().then(res=>console.log(res))
console.log(sdk.createBasicAuthorization());
const collection = new Collection(sdk);

// collection.requestToPay();
// collection.generateAccessToken();
