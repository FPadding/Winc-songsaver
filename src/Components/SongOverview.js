import React, { Component } from "react"
import SongForm from "./SongForm"
import SongList from "./SongList"
import { Link } from "react-router-dom"

class SongOverview extends Component {

    constructor() {
        super()
        this.state =
        {
            savedSongs: [],
            displayedSongs: [],
            songValue: "",
            artistValue: "",
            genreValue: "",
            ratingValue: "",
            key: 0,
            sortIndex: -1, //index for the table column the list is sorted by (titel = 0, genre = 2 etc.)
            isReversed: false,
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

    sortList(array, index) {
        const sortCategories = ["song", "artist", "genre", "rating"] //
        const sortedSongs = array.sort((a, b) => {
            const lowA = a[sortCategories[index]].toLowerCase()
            const lowB = b[sortCategories[index]].toLowerCase()
            if (lowA < lowB) {
                return -1
            }
            if (lowA > lowB) {
                return 1
            }
            return 0
        })
        return sortedSongs
    }

    reverseSortList(array, index) {
        const sortCategories = ["song", "artist", "genre", "rating"]
        const sortedSongs = array.sort((a, b) => {
            const lowA = a[sortCategories[index]].toLowerCase()
            const lowB = b[sortCategories[index]].toLowerCase()
            if (lowA > lowB) {
                return -1
            }
            if (lowA < lowB) {
                return 1
            }
            return 0
        })
        return sortedSongs
    }

    addSong(event) {
        event.preventDefault()
        const { savedSongs, songValue, artistValue, genreValue, ratingValue, sortIndex, isReversed, key } = this.state
        let updatedSongs = [
            ...savedSongs,
            {
                song: songValue,
                artist: artistValue,
                genre: genreValue,
                rating: ratingValue,
                key: key
            }
        ]
        let updatedDisplayedSongs = updatedSongs
        if (sortIndex > -1) {
            if (isReversed || (isReversed === false && sortIndex === 3)) { //has an exception for rating (sortIndex === 3)
                updatedDisplayedSongs = this.reverseSortList([...updatedSongs], sortIndex)
            }
            else {
                updatedDisplayedSongs = this.sortList([...updatedSongs], sortIndex)
            }
        }
        this.setState({
            savedSongs: updatedSongs,
            displayedSongs: updatedDisplayedSongs,
            key: key + 1,
        })

    }


    sortSongs(event) {
        const { savedSongs, sortIndex, isReversed } = this.state
        let newIndex = event.target.cellIndex
        let sortedSongs = []
        let newReversed = false
        if (sortIndex !== newIndex) {
            sortedSongs = newIndex !== 3 ? this.sortList([...savedSongs], newIndex) : this.reverseSortList([...savedSongs], newIndex)
        } else if (isReversed === false) {
            sortedSongs = newIndex !== 3 ? this.reverseSortList([...savedSongs], newIndex) : this.sortList([...savedSongs], newIndex)
            newReversed = true
        } else {
            sortedSongs = [...savedSongs]
            newIndex = -1
        }
        this.setState({
            displayedSongs: sortedSongs,
            isReversed: newReversed,
            sortIndex: newIndex,
        })
    }
    showTriangle(index) { //this method adds a small triangle to show which column the list is sorted by
        if (this.state.sortIndex === index) {
            if (this.state.isReversed) {
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
                    <SongList songs={this.state.displayedSongs} />
                </table>
                <Link to="/about"><button>Over dit project</button></Link>
                {/* {<button onClick={this.logState}>Log State</button>} */}
                <footer>
                    Gemaakt door Frits Padding
                </footer>
            </div>
        );
    }
}

export default SongOverview;