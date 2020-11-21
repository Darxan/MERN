import React from 'react'

export const LinkCard = ({link}) => {
    return (

        <>
            <h2>LINK</h2>
            <p>Short URL: <a href={link.to} target="_blank" rel="nooperer noreferrer">{link.to}</a></p>
            <p>From URL or Origin: <a href={link.from} target="_blank" rel="nooperer noreferrer">{link.from}</a></p>
            <p>Counts clicked: <strong>{link.clicks}</strong> </p>
            <p>Crated at: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>

        </>
    )
}