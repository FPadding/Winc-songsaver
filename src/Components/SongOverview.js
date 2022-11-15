import React, { Component } from "react"
import SongForm from "./SongForm"
import SongList from "./SongList"
import { Link } from "react-router-dom"

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
            sortIndex: -1, //index for the table column the sorting category belongs to (titel = 0, genre = 2 etc.)
            reversed: false,
        }
        this.addSong = this.addSong.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.sortSongs = this.sortSongs.bind(this)
        this.logState = this.logState.bind(this)
        this.showTriangle = this.showTriangle.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    sortList(array, sortIndex) { //
        if (sortIndex > -1) {
            const songKeys = ["song", "artist", "genre", "rating"]
            const sortedSongs = array.sort((a, b) => {
                const lowA = a[songKeys[sortIndex]].toLowerCase()
                const lowB = b[songKeys[sortIndex]].toLowerCase()
                if (lowA < lowB) {
                    return -1;
                }
                if (lowA > lowB) {
                    return 1;
                }
                return 0;
            })
            if (sortIndex === 3) sortedSongs.reverse() //not reversing would put low rated songs at the top
            return sortedSongs
        }

    }

    addSong(event) {
        event.preventDefault()
        const { songs, songValue, artistValue, genreValue, ratingValue, sortIndex, key } = this.state
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
        if (this.state.sortIndex > -1) {
            updatedSongs = this.sortList(updatedSongs, sortIndex)
            if (this.state.reversed) updatedSongs.reverse()
        }
        this.setState({
            songs: updatedSongs,
            key: key + 1,
        })
    }


    sortSongs(event) {
        console.log(event)
        const { songs, sortIndex, reversed } = this.state
        const clickedIndex = event.target.cellIndex
        if (sortIndex !== clickedIndex) {
            const sortedSongs = this.sortList(songs, clickedIndex)
            this.setState({
                songs: sortedSongs,
                sortIndex: clickedIndex,
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
    showTriangle(index) { //this method adds a small triangle to show which column the list is sorted by
        if (this.state.sortIndex === index) {
            if (this.state.reversed) {
                return "reversed"
            }
            return "alphabetic"
        }
        return ""
    }

    logState() { //debug function
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h1>SONGSAVER</h1>
                <SongForm
                    addSong={this.addSong}
                    songValue={this.state.songValue}
                    artistValue={this.state.artistValue}
                    genreValue={this.state.genreValue}
                    ratingValue={this.state.ratingValue}
                    handleChange={this.handleChange}
                />
                <table>
                    <thead>
                        <tr onClick={this.sortSongs}>
                            <th className={this.showTriangle(0)}>Titel</th>
                            <th className={this.showTriangle(1)}>Artiest</th>
                            <th className={this.showTriangle(2)}>Genre</th>
                            <th className={this.showTriangle(3)}>Rating</th>
                        </tr>
                    </thead>
                    <SongList songs={this.state.songs} />
                </table>
                <Link to="/about"><button>Over dit project</button></Link>
                {/* <button onClick={this.logState}>Log State</button> */}
            </div>
        );
    }
}

export default SongOverview;