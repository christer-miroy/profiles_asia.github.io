import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Candidates() {
    // default value
    const [candidate, setCandidate] = useState([]);
    const [loading, setLoading] = useState(false);

    // loading effect
    useEffect(() => {
        getCandidates(); //return all candidates
    }, []);

    const getCandidates = () => {
        setLoading(true);
        axiosClient
            .get("/candidates")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                setCandidate(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    //delete candidate function
    const onDelete = (c) => {
        if (
            !window.confirm("Are you sure you want to delete this candidate?")
        ) {
            return;
        }
        axiosClient.delete(`/candidates/${c.id}`).then(() => {
            //TODO: show notification
            getCandidates(); //refetch all candidates after deleting selected candidates
        });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Candidates</h1>
                <Link to="/candidates/create" className="btn-add">
                    Add New
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Program</th>
                        <th>Actions</th>
                    </thead>
                    {/* loading effect */}
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {candidate.map((c) => (
                                <tr>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.age}</td>
                                    <td>{c.program}</td>
                                    <td>
                                        <Link
                                            to={"/candidates/" + c.id}
                                            className="btn-edit"
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={(ev) => onDelete(c)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
