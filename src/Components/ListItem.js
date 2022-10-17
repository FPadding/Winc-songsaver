import React from "react";

const ListItem = ({ song, artist, genre, rating }) =>
    <tr>
        <td>{song}</td>
        <td>{artist}</td>
        <td>{genre}</td>
        <td>{rating}</td>
    </tr>

export default ListItem