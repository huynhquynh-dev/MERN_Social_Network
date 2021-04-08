import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify = () => {
  const { notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {notify.loading && <Loading />}

      {notify.success && (
        <Toast
          message={{ title: "Success", body: notify.success }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-success"
        />
      )}

      {notify.error && (
        <Toast
          message={{ title: "Failed", body: notify.error }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-danger"
        />
      )}
    </div>
  );
};

export default Notify;
