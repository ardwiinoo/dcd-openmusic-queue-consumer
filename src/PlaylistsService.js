const { Pool } = require('pg')

class PlaylistsService {
    constructor() {
        this._pool = new Pool()
    }

    async _getPlaylistById(playlistId, owner) {
        const query = {
            text: 'SELECT id, name FROM playlists WHERE id = $1 AND owner = $2',
            values: [playlistId, owner],
        }

        const { rows } = await this._pool.query(query)
        return rows[0]
    }

    async _getPlaylistSongs(playlistId) {
        const query = {
            text: 'SELECT s.id, s.title, s.performer FROM playlist_songs AS ps JOIN songs AS s ON s.id = ps.song_id WHERE ps.playlist_id = $1',
            values: [playlistId],
        }

        const { rows } = await this._pool.query(query)
        return rows
    }

    async getPlaylistDetails(playlistId, owner) {
        const playlist = await this._getPlaylistById(playlistId, owner)
        const songs = await this._getPlaylistSongs(playlistId)

        return {
            ...playlist,
            songs,
        }
    }
}

module.exports = PlaylistsService