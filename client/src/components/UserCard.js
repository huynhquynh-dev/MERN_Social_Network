import React from 'react'
import Avatar from './header/Avatar'
import { Link } from 'react-router-dom'

const UserCard = ({user, border,handleCloseSearch}) => {

    const handleCloseAll = () => {
        if(handleCloseSearch) handleCloseSearch()
    }

    return (
        <Link to={`/profile/${user._id}`} onClick={handleCloseAll} >
            <div className={`d-flex p-2 align-item-center ${border}`}>
                <Avatar src={user.avatar} size="big-avatar" />
                <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
                    <span className="d-block">{user.username}</span>
                    <small style={{opacity: 0.7}}>{user.fullname}</small>
                </div>
            </div>
        </Link>
    )
}

export default UserCard
