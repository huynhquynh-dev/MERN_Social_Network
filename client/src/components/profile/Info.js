import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '../header/Avatar'

import { getProfileUsers } from '../../redux/actions/profileAction'
import EditProfile from './EditProfile'
import FollowButton from '../FollowButton'

const Info = () => {

    const { id } = useParams()
    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()

    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user])
        } else {
            dispatch(getProfileUsers({users: profile.users, id, auth}))
            const newUser = profile.users.filter(user => user._id === id)
            setUserData(newUser)
        }
    }, [id, auth, dispatch, profile.users])

    return (
        <div>
            {
                userData.map(user => (
                    <div className="info-container mt-4" key={user._id}>
                        <Avatar src={user.avatar} size="supper-avatar" />
                        <div className="info-content">
                            <div className="info-content-title">
                                <h2>{user.username}</h2>
                                {
                                    user._id === auth.user._id 
                                    ? 
                                        <button className="btn btn-outline-info" onClick={() => setOnEdit(true)}>Edit profile</button>
                                    :
                                        <FollowButton />
                                }
                            </div>
                            <div className="info-content-body">
                                <div className="follow-btn my-2">
                                    <span className="mr-4">
                                        { user.followers.length } Followers
                                    </span>
                                    <span className="ml-4">
                                        { user.following.length } Following
                                    </span>
                                </div>
                                <h6>{user.fullname} - {user.mobile}</h6>
                                <p className="m-0">{user.address}</p>
                                <h6>{user.email}</h6>
                                <a href={user.website} target="_blank" rel="noreferrer">
                                    { user.website }
                                </a>
                                <p>{user.story}</p>
                            </div>
                        </div>
                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit}/>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Info
