const { createTransport } = require('nodemailer')

class MailSender {
    constructor() {
        this._transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: 'Open Music App <no-reply@openmusicapp.com>',
            to: targetEmail,
            subject: 'Ekspor Playlist Songs',
            text: 'Terlampir hasil dari ekspor playlist songs',
            attachments: [
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