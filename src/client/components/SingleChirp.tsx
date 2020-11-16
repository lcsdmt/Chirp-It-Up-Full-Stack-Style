import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { chirp } from "../types";

const SingleChirp: React.FC<ISingleChirpProps> = (props: ISingleChirpProps) => {
  const [chirp, setChirp] = React.useState<chirp>({
    id: "",
    name: "",
    userid: "",
    content: "",
  });

  React.useEffect(() => {
    (async () => {
      try {
        let res = await fetch(`/api/chirps/${props.match.params.id}`);
        let chirp = await res.json();
        setChirp(chirp);
        // console.log(chirp.name);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const deleteChirp = async (id: string) => {
    await fetch(`/api/chirps/${id}`, {
      method: "DELETE",
    });

    props.history.push("/");
  };

  const editChirp = async (id: string) => {
    const newChirp = {
      name: chirp.name,
      content: chirp.content,
    };

    await fetch(`/api/chirps/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChirp),
    });

    props.history.push("/");
  };

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setChirp({
      id: chirp.id,
      name: chirp.name,
      userid: chirp.userid,
      content: e.target.value,
    });

  return (
    <div className="container">
      <div className="card shadow-lg m-2">
        <div className="card-body shadow">
          <div className="row">
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
          </div>
          <div className="row">
            <textarea
              className="card-text"
              defaultValue={chirp.content}
              cols={50}
              rows={15}
              onChange={(e) => onMessageChange(e)}
            ></textarea>
          </div>
          <button
            className="btn btn-sm btn-outline-warning float-right mx-1 mt-3 rounded-pill"
            onClick={() => editChirp(chirp.id)}
          >
            Save
          </button>
          <button
            className="btn btn-sm btn-outline-danger float-right mx-1 mt-3 rounded-pill"
            onClick={() => deleteChirp(chirp.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

interface ISingleChirpProps extends RouteComponentProps<{ id: string }> {}

export default SingleChirp;
