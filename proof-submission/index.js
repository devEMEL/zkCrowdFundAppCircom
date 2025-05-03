
// import { CurveType, Library, zkVerifySession } from 'zkverifyjs';
const {CurveType, Library, zkVerifySession} = require("zkverifyjs");
const dotenv = require("dotenv");

// const fs = require("fs");
const proof = require("./proof.json");
const vkey = require("./vkey.json");
const pub_inputs = require("./public_inputs.json");

dotenv.config();

const main = async() => {

    
    // const session = await zkVerifySession.start().Testnet().withAccount(process.env.ZKVERIFY_SEED_PHRASE);
    const session = await zkVerifySession
        .start()
        .Testnet()
        .withAccount("rebuild match beyond top water bullet surge ecology asset hood noise wish"); // dummy account


    const { events, transactionResult } = await session
    .verify()
    .groth16(Library.gnark, CurveType.bn128) 
    .execute({
        proofData: {
        vk:  vkey,
        proof: proof,
        publicSignals: pub_inputs,
        },
        domainId: 3, //op sepolia
    }); 

    events.on('includedInBlock', (eventData) => {
        console.log('Transaction included in block:', eventData);
    });
    
    events.on('finalized', (eventData) => {
        console.log('Transaction finalized:', eventData);
    });
    
    events.on('error', (error) => {
        console.error('An error occurred during the transaction:', error);
    });
    
    try {
        // Await the final transaction result
        // const transactionInfo: VerifyTransactionInfo = await transactionResult;
        const transactionInfo = await transactionResult;
    
        // Log the final transaction result
        console.log('Transaction completed successfully:', transactionInfo);
      } catch (error) {
        // Handle any errors that occurred during the transaction
        console.error('Transaction failed:', error);
      } finally {
        // Close the session when done
        await session.close();
      }
};

main().then().catch(err => console.log(err));