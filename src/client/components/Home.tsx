import React from "react";
import { Link } from "react-router-dom";
import { chirp } from "../types";

const Home: React.FC<IHomeProps> = () => {
  const [chirps, setChirps] = React.useState<chirp[]>([]);

  React.useEffect(() => {
    fetchChirps();
  }, []);

  const fetchChirps = async () => {
    try {
      let res = await fetch("/api/chirps/");
      let chirps: chirp[] = await res.json();
      chirps.reverse();
      setChirps(chirps);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      {chirps.map((chirp: chirp) => (
        <div key={chirp.id} className="card shadow-lg m-2">
          <div className="card-body shadow">
            <h5 className="card-title">
              |<svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-person-circle"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                <path
                  fill-rule="evenodd"
                  d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                />
              </svg>| 
              <u>{chirp.name}</u>
            </h5>
            <p className="card-text">{chirp.content}</p>
            <Link to={`/chirp/${chirp.id}/admin`}>
              <button className="btn btn-sm btn-outline-info float-right rounded-pill">
                Admin Options
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

interface IHomeProps {}

export default Home;
