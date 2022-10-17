import React from "react"
import ListItem from "./ListItem"

const SongList = ({ songs }) =>
    <tbody>
        {songs.map(({ song, artist, genre, rating, key }) => (
            <ListItem song={song} artist={artist} genre={genre} rating={rating} key={key}></ListItem>
        ))}
    </tbody>


export default SongList