const twilio = require('twilio');

// Set up your Twilio credentials
const accountSid = 'ACbf0fa219bc60d70e4de744ceebf17955';
const authToken = '61d451fca18201cfddce40daf6cf7c58';

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Define your bot's behavior
client.messages.create({
  body: 'Hello from your WhatsApp bot!',
  from: 'whatsapp:+1 4155238886',
  to: 'whatsapp:7742571106'
})
.then(message => console.log(message.sid))
.catch(error => console.error(error));
