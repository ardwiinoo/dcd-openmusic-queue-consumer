const autoBind = require('auto-bind')

class Listener {
    constructor(playlistsService, mailSender) {
        this._playlistsService = playlistsService,
        this._mailSender = mailSender

        autoBind(this)
    }

    async listen(message) {
        try {
            const { userId, playlistId, targetEmail } = JSON.parse(message.content.toString())

            const playlist = await this._playlistsService.getPlaylistDetails(playlistId, userId)
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify({ playlist }))

            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = Listener