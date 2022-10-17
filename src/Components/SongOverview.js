import React, { Component } from "react"
import SongForm from "./SongForm"
import SongList from "./SongList"

class SongOverview extends Component {

    constructor() {
        super()
        this.state =
        {
            songs: [],
            songValue: "",
            artistValue: "",
            genreValue: "",
            ratingValue: "",
            key: 0,
            sortedBy: "",
            reversed: false,
        }
        this.addSong = this.addSong.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.sortSongs = this.sortSongs.bind(this)
        this.logState = this.logState.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    sortList(array, sortBy) {
        if (sortBy) {
            const sortedSongs = array.sort((a, b) => {
                const lowA = a[sortBy].toLowerCase()
                const lowB = b[sortBy].toLowerCase()
                if (lowA < lowB) {
                    return -1;
                }
                if (lowA > lowB) {
                    return 1;
                }
                return 0;
            })
            if (sortBy === "rating") sortedSongs.reverse() //not reversing would put low rated songs at the top
            return sortedSongs
        }

    }

    addSong(event) {
        event.preventDefault()
        const { songs, songValue, artistValue, genreValue, ratingValue, sortedBy, key } = this.state
        let updatedSongs = [
            ...songs,
            {
                song: songValue,
                artist: artistValue,
                genre: genreValue,
                rating: ratingValue,
                key: key
            }
        ]
        if (this.state.sortedBy) {
            updatedSongs = this.sortList(updatedSongs, sortedBy)
            if (this.state.reversed) updatedSongs.reverse()
        }
        this.setState({
            songs: updatedSongs,
            key: key + 1,
        })
    }


    sortSongs(event) {
        const { songs, sortedBy, reversed } = this.state
        const clicked = event.target.innerText.toLowerCase()
        if (sortedBy !== clicked) {
            const sortedSongs = this.sortList(songs, clicked)
            this.setState({
                songs: sortedSongs,
                sortedBy: clicked,
                reversed: false
            })
        } else {
            const sortedSongs = [...songs].reverse()
            this.setState({
                songs: sortedSongs,
                reversed: !reversed
            })
        }

    }

    logState() {
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <SongForm
                    addSong={this.addSong}
                    songValue={this.state.songValue}
                    artistValue={this.state.artistValue}
                    genreValue={this.state.genreValue}
                    ratingValue={this.state.ratingValue}
                    handleChange={this.handleChange}
                />
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr className="song-header">
                            <th className="song-row__item" onClick={this.sortSongs}>Song</th>
                            <th className="song-row__item" onClick={this.sortSongs}>Artist</th>
                            <th className="song-row__item" onClick={this.sortSongs}>Genre</th>
                            <th className="song-row__item" onClick={this.sortSongs}>Rating</th>
                        </tr>
                    </thead>
                    <SongList songs={this.state.songs} />
                </table>
                <button onClick={this.logState}>Log State</button>
            </div>
        );
    }
}

export default SongOverview;