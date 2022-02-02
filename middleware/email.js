const sgMail = require("@sendgrid/mail");

const key = process.env.API_KEY;

const email = (email, subject) => {
  sgMail.setApiKey(key);

  const message = {
    to: `percymuiruris2@gmail.com`,
    from: "dennismuiruridev@gmail.com",
    subject: "portfolio website",
    text: `${subject}`,
    html: `<h1>${subject}</h1>`,
  };

  sgMail
    .send(message)
    .then((res) => console.log("Email sent"))
    .catch((error) => console.log(error.message));
};

module.exports = email;
