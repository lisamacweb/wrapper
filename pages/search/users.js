import Link from "next/link";
import { registerUserActionThunk } from "../../redux/slices/users";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectUsers, getUsersThunk, setUsers } from "../../redux/slices/users";

function Users() {
  const dispatch = useDispatch();
  const { info, loading, error } = useSelector(selectUsers);

  const handleDipatchClient = (e) => {
    e.preventDefault();
    dispatch(setUsers({ success: true, usersArray: [{ name: "bob", age: "45" }] }));
  };

  const handleDipatchServer = (e) => {
    e.preventDefault();
    dispatch(getUsersThunk());
  };

  return (
    <>
      <div>
        <button onClick={(e) => handleDipatchClient(e)}>Get Users From Client Side </button>
      </div>

      <button onClick={(e) => handleDipatchServer(e)}>Get Users From Thunk </button>
      <div>
        {loading === "pending" ? (
          "loading Data ..."
        ) : (
          <div>
            {info
              ? info.usersArray.map((element) => (
                  <div key={element.age}>
                    name : {element.name} , age : {element.age}
                  </div>
                ))
              : "No users "}
          </div>
        )}
      </div>

      <div>
        <Link href="/search/houses?type=type1">==> Go to Houses Pages</Link>
      </div>
      <div>
        <Link href="/">==> Go to Welcom Page</Link>
      </div>
    </>
  );
}

export default Users;
