const { createTransport } = require('nodemailer')

class MailSender {
    constructor() {
        this._transporter = createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: 'Open Music App',
            to: targetEmail,
            subject: 'Ekspor Playlist Songs',
            text: 'Terlampir hasil dari ekspor playlist songs',
            attachment: [
                {
                    filename: 'playlist_songs.json',
                    content
                }
            ]
        }

        return this._transporter.sendMail(message)
    }
}

module.exports = MailSender