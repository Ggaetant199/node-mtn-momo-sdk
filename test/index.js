import { MomoSDK, Collection } from "../index.js";
import fs from "fs";

//0f464196-6b43-48bf-9418-43514e3ddf9c

const sdk = new MomoSDK({
    xReferenceId: "0f464196-6b43-48bf-9418-43514e3ddf9c",
    apiKey: "f1c5c40c6ab1499abb5c5af5076e6533",
});

// sdk.createApiKey().then(res=>console.log(res))

const collection = new Collection(sdk);

// collection.generateAccessToken();
