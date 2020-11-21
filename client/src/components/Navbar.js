import React, {useContext} from 'react'
import {NavLink, useHistory } from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logOutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
                <a href="/" className="brand-logo">Generate Link</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links List</NavLink></li>
                    <li><a href="/" onClick={logOutHandler}>Logout</a> </li>
                </ul>
            </div>
        </nav>
    )
}