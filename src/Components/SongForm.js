import React from "react"

const SongForm = ({ addSong, songValue, artistValue, genreValue, ratingValue, handleChange }) =>
    <div>
        <form onSubmit={addSong}>
            <input
                name="songValue"
                value={songValue}
                placeholder="titel"
                onChange={handleChange}
            />
            <input
                name="artistValue"
                value={artistValue}
                placeholder="artiest"
                onChange={handleChange}
            />
            <input
                name="genreValue"
                value={genreValue}
                placeholder="genre"
                onChange={handleChange}
            />
            <input
                name="ratingValue"
                value={ratingValue}
                placeholder="rating"
                onChange={handleChange}
            />
            <button>toevoegen</button>
        </form>
    </div>


export default SongForm