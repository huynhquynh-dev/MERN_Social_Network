import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBAL_TYPE } from '../../redux/actions/globalType'
import { Link } from 'react-router-dom'
import UserCard from '../UserCard'

const Search = () => {
  const [search, setSearch] = useState();
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search) {
      getDataAPI(`search?username=${search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((error) => {
          dispatch({type: GLOBAL_TYPE.ALERT, payload: {error: error.response.data.message}})
        });
    } else {
      setUsers([])
    }
  }, [search, auth.token, dispatch]);

  const handleCloseSearch = () => {
    setSearch('')
    setUsers([])
  }

  return (
    <form className="search-form">
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />
      <div className="search-icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">search</span>
        <span>search</span>
      </div>
      <div className="close-search" style={{opacity: users.length === 0 ? 0 : 1}} onClick={handleCloseSearch}>
        &times;
      </div>
      <div className="users">
        {
            search && users.map(user => (
              <Link key={user._id} to={`/profile/${user._id}`} onClick={handleCloseSearch} >
                <UserCard user={user} border="border"/>
              </Link>
            ))
        }
      </div>
    </form>
  );
};

export default Search;
