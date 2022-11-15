import React from "react"

const SongForm = ({ addSong, songValue, artistValue, genreValue, ratingValue, handleChange }) =>
    <div>
        <form onSubmit={addSong} autoComplete="off">
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
            <select
                name="ratingValue"
                value={ratingValue}
                onChange={handleChange}
            >
                <option selected hidden>rating</option>
                <option disabled>rating</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <button>Voeg toe</button>
        </form>
    </div>


export default SongForm