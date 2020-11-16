import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { chirp } from "../types";

const AddChirp: React.FC<IAddChirpProps> = (props: IAddChirpProps) => {
    const [chirp, setChirp] = React.useState<chirp>({
        userid: "",
        content: "",
        name:""
    });

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setChirp({
        userid: chirp.userid,
        content: chirp.content,
        name: e.target.value
    });

    const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setChirp({
        userid: chirp.userid,
        content: e.target.value,
        name: chirp.name
    });

    const saveChirp = async () => {
        await fetch("/api/chirps", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chirp)
        });

        props.history.push("/");
    }

    return (
        <div className="container">
            <div className="card shadow-lg m-2">
                <div className="card-body">
                    <div className="row">
                        <input type="text" className="card-title" onChange={onUsernameChange} placeholder="Name"/>
                    </div>
                    <div className="row">
                        <textarea className="card-text" cols={50} rows={15} onChange={onMessageChange} placeholder="Enter Chirp here"></textarea>
                    </div>
                    <button className="btn btn-sm btn-outline-warning float-right mx-1 mt-3" onClick={saveChirp}>Save</button>
                </div>
            </div>
        </div>
    )
}

interface IAddChirpProps extends RouteComponentProps { }

export default AddChirp