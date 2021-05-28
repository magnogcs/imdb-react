import React from 'react'

const MovieDetails = (props) => {
    return (
        <div>
            {props.data.original_title}
            {props.data.release_date}
            {props.data.vote_average}
            {props.data.vote_count}
        </div>
    )
}

export default MovieDetails
