import Mailgen from "mailgen"
import getEmailServiceLink from "../../helpers/getEmailServiceLink"

class EmailService {
  constructor(env, sender) {
    this.sender = sender
    this.link = getEmailServiceLink(env)
  }

  createEmailTemplate(username, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Fecore 35",
        link: this.link,
      },
    })

    const email = {
      body: {
        name: username,
        intro: "Welcome! We're very excited to have you on board.",
        action: {
          instructions: "To get started with our API, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    }

    return mailGenerator.generate(email)
  }

  async sendVerifyEmail(email, username, verifyToken) {
    const emailBody = this.createEmailTemplate(username, verifyToken)
    const msg = {
      to: email,
      subject: "Welcome to Fecore-35 API - Verify your email address",
      html: emailBody,
    }
    try {
      const result = await this.sender.send(msg)
      console.log(
        "🚀 ~ file: service.js ~ line 48 ~ EmailService ~ sendVerifyEmail ~ result",
        result
      )

      return true
    } catch (error) {
      console.error(error.massage)
      return false
    }
  }
}

export default EmailService
