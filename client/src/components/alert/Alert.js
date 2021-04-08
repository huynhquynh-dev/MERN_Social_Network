import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {alert.loading && <Loading />}

      {alert.success && (
        <Toast
          message={{ title: "Success", body: alert.success }}
          handleShow={() => dispatch({ type: "ALERT", payload: {} })}
          bgColor="bg-success"
        />
      )}

      {alert.error && (
        <Toast
          message={{ title: "Failed", body: alert.error }}
          handleShow={() => dispatch({ type: "ALERT", payload: {} })}
          bgColor="bg-danger"
        />
      )}
    </div>
  );
};

export default Alert;
