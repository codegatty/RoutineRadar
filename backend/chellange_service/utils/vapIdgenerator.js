const webpush = require('web-push');

function generateVAPIDKeys() {


const vapidKeys = webpush.generateVAPIDKeys();

console.log('Public Key:', vapidKeys.publicKey);
console.log('Private Key:', vapidKeys.privateKey);
}
module.exports=generateVAPIDKeys