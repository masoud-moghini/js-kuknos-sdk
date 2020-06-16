# kuknos sdk

*js-kuknos-sdk* is a js-based library that enables software developers ,to easily build , submit and do things with kuknos transactions

# installation
just type 

> npm install js-kuknos-sdk

# sample
to create new transaction follow instructions bellow

```javascript
import sdk from 'js-kuknos-sdk'
//url example is horizon provided by your anchor
const server = new StellarSdk.Server(url);
const account = await server.loadAccount(sourcePublicKey);
const publicKey ="GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D"
const sourceSecretKey='SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4';

// Derive Keypair object and public key (that starts with a G) from the secret
const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
transaction = new StellarSdk.TransactionBuilder(account,{"fee":BaseFee, "networkPassphrase": sdk.Network.PUBLIC})//OR CAN BE HARDCODED
                    .addOperation(StellarSdk.Operation.createAccount({
                      destination: destinationId,
                      startingBalance: amount.toString(),
                      source: publicKey
                    }))
                    // A memo allows you to add your own metadata to a transaction. It's
                    // optional and does not affect how Stellar treats the transaction.
                    .addMemo(memoValue.length === 0 ? StellarSdk.Memo.none() : memoParam)
                    .setTimeout(60000)
                    .build();
 transaction.sign(sourceKeypair);
 const transactionResult = await server.submitTransaction(transaction);

```    


