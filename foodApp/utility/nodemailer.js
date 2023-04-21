// wnewndrkfqhzszin;
// "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function(str,data) {
  console.log("nodemailer called");
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mishrasudhanshu855@gmail.com", // generated ethereal user
      pass: "wnewndrkfqhzszin", // generated ethereal password
    },
  });
  let eSubj,eHtml;
  if(str == "signup"){
    eSubj = `Thank you for signing ${data.name}`;
    eHtml = `
           <h1>Welcome to foodApp.com</h1>
           Hope you have great experience
           Here are your details
           Name - ${data.name}
           Email - ${data.email}
    `;
  } else if(str == "forgetpassword") {
    eSubj = "Reset password"
    eHtml = `
            <h1>foodApp.com<h1/>
            Here is your Link to reset Password : ${data.resetPasswordlink}
    `;
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FoodApp 🥗" <mishrasudhanshu855@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: eSubj, // Subject line
    // text: , // plain text body
    html: eHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  
}

// main().catch(console.error);

