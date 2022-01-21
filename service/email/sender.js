import sgMail from "@sendgrid/mail"

class SenderSendGrig {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    return sgMail.send({ ...msg, from: process.env.SENDER_SENDGRID })
  }
}

export default SenderSendGrig
