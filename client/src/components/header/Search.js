import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBAL_TYPE } from "../../redux/actions/globalType";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading-circle.gif";

const Search = () => {
  const [search, setSearch] = useState();
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (search) {
  //     getDataAPI(`search?username=${search}`, auth.token)
  //       .then((res) => setUsers(res.data.users))
  //       .catch((error) => {
  //         dispatch({type: GLOBAL_TYPE.ALERT, payload: {error: error.response.data.message}})
  //       });
  //   } else {
  //     setUsers([])
  //   }
  // }, [search, auth.token, dispatch]);

  const handleCloseSearch = () => {
    setSearch("");
    setUsers([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (error) {
      dispatch({
        type: GLOBAL_TYPE.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        id="search"
        title="Enter to Search"
        value={search || ""}
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />

      <div className="search-icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">search</span>
        <span>Enter to Search</span>
      </div>
      <div
        className="close-search"
        style={{ opacity: users.length === 0 ? 0 : 1 }}
        onClick={handleCloseSearch}
      >
        &times;
      </div>

      <button type="submit" style={{ display: "none" }}>
        Search
      </button>

      {load && <img className="loading-icon" src={LoadIcon} alt="loading" />}

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleCloseSearch={handleCloseSearch}
            />
          ))}
      </div>
    </form>
  );
};

export default Search;
