import('emailjs').then((emailjs) => {

// Function to generate a random OTP
function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// Function to send OTP via EmailJS
function sendOTP(userEmail) {
  const OTP = generateOTP();

  // Replace with your EmailJS user ID, service ID, and template ID
  const emailjsConfig = {
    user: 'nyzmtQXNKmLbgOrjI',
    serviceId: 'service_y6p22li',
    templateId: 'YOUR_TEMPLATE_ID',
  };

  const emailServer = emailjs.server.connect({
    user: emailjsConfig.user,
    service_id: emailjsConfig.serviceId,
  });

  const emailParams = {
    to_email: userEmail,
    otp: OTP,
  };

  emailServer.send(
    {
      text: `Your OTP is: ${OTP}`,
      from: 'srikanthkarthi2003@gmail.c0m', // Replace with the sender's email address
      to: userEmail,
      subject: 'Your One-Time Password (OTP)',
      'h:Reply-To': 'sender@example.com', // Replace with the sender's email address
      attachment: [
        {
          data: `<html>Your OTP is: <strong>${OTP}</strong></html>`,
          alternative: true,
        },
      ],
    },
    (err, message) => {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent!', message);
      }
    }
  );
}

// Example usage
const userEmail = '20tuec216@skct.edu.in'; // Replace with the recipient's email address
sendOTP(userEmail);
}).catch((error) => {
    console.error('Error importing emailjs:', error);
  });