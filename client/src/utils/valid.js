const valid = ({ fullname, username, email, password, confirmPassword }) => {
  const error = {};

  if (!fullname) {
    error.fullname = "Please add your full name";
  } else if (fullname.length > 25) {
    error.fullname = "Full name is up to 25 character long";
  }

  if (!username) {
    error.username = "Please add your user name";
  } else if (username.length > 25) {
    error.username = "User name is up to 25 character long";
  }

  if (!email) {
    error.email = "Please add your email";
  } else if (!validateEmail(email)) {
    error.email = "Email format is incorrect";
  }

  if (!password) {
    error.password = "Please add your password";
  } else if (password.length < 6) {
    error.password = "Password must be at least 6 characters";
  } else if (password !== confirmPassword) {
    error.confirmPassword = "Confirm password did not match";
  }

  return {
    errorMessage: error,
    errorLength: Object.keys(error).length,
  };
};

function validateEmail(email) {
  // eslint-disable-next-line
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default valid;
