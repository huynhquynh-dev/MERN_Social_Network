import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkImage } from "../../utils/ImageUpload"
import { GLOBAL_TYPE } from "../../redux/actions/globalType"

const EditProfile = ({ setOnEdit }) => {
  const initialState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };

  const [userData, setUserData] = useState(initialState);

  const { fullname, mobile, address, website, story } = userData;

  const [avatar, setAvatar] = useState("");

  const { auth, theme } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
      setUserData(auth.user);
  }, [auth.user])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0]
    const error = checkImage(file)

    if(error) {
        return dispatch({type: GLOBAL_TYPE.ALERT, payload: {error}})
    }
    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="edit-profile">
      <button
        className="btn btn-danger btn-close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>

      <form onSubmit={handleSubmit}>
        <div className="info-avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{
              filter: `${theme ? "invert(1)" : "invert(0)"}`,
            }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file-up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              placeholder="Your full name"
              onChange={handleChangeInput}
              value={fullname}
              name="fullname"
            />
            <small
              className="text-danger position-absolute"
              style={{ top: "50%", right: "5px", transform: "translateY(-50%" }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your mobile"
            onChange={handleChangeInput}
            value={mobile}
            name="mobile"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your address"
            onChange={handleChangeInput}
            value={address}
            name="address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your website"
            onChange={handleChangeInput}
            value={website}
            name="website"
          />
        </div>

        <div className="form-group">
          <label htmlFor="story">Story</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Your story"
            onChange={handleChangeInput}
            value={story}
            name="story"
          />
          <small className="d-block text-danger text-right">
            {story.length}/200
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="story">Gender</label>
          <div className="row justify-content-between mx-0 mb-1">
            <label htmlFor="male">
              Male:{" "}
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                defaultChecked
                onChange={handleChangeInput}
              />
            </label>
            <label htmlFor="female">
              Female:{" "}
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChangeInput}
              />
            </label>
            <label htmlFor="other">
              Other:{" "}
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                onChange={handleChangeInput}
              />
            </label>
          </div>
        </div>

        <button className="btn btn-success w-100 btn-update" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
