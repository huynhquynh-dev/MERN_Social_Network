import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '../header/Avatar'

const Info = () => {

    const {id} = useParams()
    const { auth } = useSelector(state => state)
    const { dispatch } = useDispatch()

    const [userData, setUserData] = useState([])

    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user])
        }
    }, [id, auth.user])

    return (
        <div>
            {
                userData.map(user => (
                    <div className="info-container" key={user._id}>
                        <Avatar src={user.avatar} size="super-avatar" />
                        <div className="info-content">
                            <div className="info-content-title">
                                <h2>{user.username}</h2>
                                <button className="btn btn-outline-info">Edit profile</button>
                            </div>
                            <div className="info-content-body">
                                <span>
                                    { user.followers.length } Followers
                                </span>
                                <span>
                                    { user.following.length } Following
                                </span>
                                <h6>{user.fullname}</h6>
                                <p>{user.address}</p>
                                <h6>{user.email}</h6>
                                <a href={user.website} target="_blank" rel="noreferrer">
                                    { user.website }
                                </a>
                                <p>{user.story}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Info
