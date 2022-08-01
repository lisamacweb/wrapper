import Link from "next/link";
import { getHousesThunk, selectHouses } from "../../redux/slices/houses";
import { wrapper } from "../../redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setHouse } from "../../redux/slices/houses";

function Houses(props) {
  const dipatch = useDispatch();

  const router = useRouter();

  const { loading, info, error } = useSelector(selectHouses);

  const [type, setType] = useState("type1");

  const handleType = (e) => {
    setType(e.target.value);
  };
  const handleDipatchFromServer = (e) => {
    e.preventDefault();

    router.push({ pathname: `/search/houses/`, query: { type } });
  };

  const handleDipatchFromClient = (e) => {
    e.preventDefault();
    dipatch(setHouse({ success: true, houses_data: ["House6_client", "House7_client"] }));
  };

  useEffect(() => {}, [info, loading, error]);

  return (
    <div>
      <div>
        <button onClick={(e) => handleDipatchFromClient(e)}>Get Houses From Client </button>
      </div>

      <div>
        <select className="border p-2 rounded" onChange={(e) => handleType(e)}>
          <option value="type1" key="type1">
            type1
          </option>
          <option value="type2" key="type2">
            type2
          </option>
        </select>
        <button onClick={(e) => handleDipatchFromServer(e)}>Get Houses from Server </button>
      </div>

      {loading === "pending" ? (
        "loading data ...."
      ) : (
        <>
          <div> {info ? info.houses_data.map((element) => <div key={element}>name : {element}</div>) : "no data"}</div>
        </>
      )}
      <Link href="/search/users"> ===> Go to usersPage .</Link>
      <div>
        <Link href="/">==> Go to Welcom Page</Link>
      </div>
    </div>
  );
}

export default Houses;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query, res }) => {
  await store.dispatch(getHousesThunk(query));
});

/*
- Dispatch "getHousesThunk.rejected" when throw error in "getHousesController"
- Dispatch "getHousesThunk.pending"  and Show loading in /search/houses when loading data 
- Dispatch "setHouse" when click on "handleDispatch"
-  */

/*// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}*/
