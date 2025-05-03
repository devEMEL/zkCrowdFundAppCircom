const {CurveType, Library, zkVerifySession, ZkVerifyEvents} = require("zkverifyjs");
const dotenv = require("dotenv");
const fs = require("fs");
const vk = require("./vkey.json");

dotenv.config();

const main = async() => {

    // const session = await zkVerifySession.start().Testnet().withAccount(process.env.ZKVERIFY_SEED_PHRASE);
    const session = await zkVerifySession
        .start()
        .Volta()
        .withAccount("rebuild match beyond top water bullet surge ecology asset hood noise wish");


    const { events, transactionResult } = await session
    .registerVerificationKey()
    .groth16(Library.gnark, CurveType.bn128) 
    .execute(vk); 

    // const { statementHash } = await transactionResult;
    // console.log(`vk hash: ${statementHash}`);

    // events.on(ZkVerifyEvents.Finalized, (eventData) => {
    //     console.log('Verification finalized:', eventData);
    //     fs.writeFileSync('veekey.json', JSON.stringify({"veekey": eventData.statementHash}, null, 2));
    //     return eventData.statementHash;
    // })

    events.on('finalized', (eventData) => {
        console.log('Transaction finalized:', eventData);
    });


};

main().then().catch(err => console.log(err));

// node register_vk.js

// node snarkjs2zkv convert-proof ../proof-submission/proof.json  -o ../proof-submission/proof_zkv.json

// node snarkjs2zkv convert-vk ../proof-submission/vkey.json  -o ../proof-submission/verification_key_zkv.json


// node snarkjs2zkv convert-public ../proof-submission/public_inputs.json  -o ../proof-submission/public_zkv.json -c bn128


