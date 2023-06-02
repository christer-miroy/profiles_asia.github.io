import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client.js";

export default function CandidateForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [candidates, setCandidates] = useState({
        id: null,
        name: "",
        age: "",
        program: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/candidates/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setCandidates(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (candidates.id) {
            // update candidate
            axiosClient
                .put(`/candidates/${candidates.id}`, candidates)
                .then(() => {
                    // success
                    navigate("/candidates");
                    // TODO NOTIFICATION
                })
                .catch((err) => {
                    const response = err.response;

                    // validation error
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            // add new candidate
            axiosClient
                .post(`/candidates`, candidates)
                .then(() => {
                    // success
                    navigate("/candidates");
                    // TODO NOTIFICATION
                })
                .catch((err) => {
                    const response = err.response;

                    // validation error
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {candidates.id && <h1>Update Candidate: {candidates.name}</h1>}
            {!candidates.id && <h1>New Candidate:</h1>}
            <div className="card animated fadeInDown">
                {/* loading indicator */}
                {loading && <div className="text-center">Loading...</div>}

                {/* error message */}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={candidates.name}
                            onChange={(ev) =>
                                setCandidates({
                                    ...candidates,
                                    name: ev.target.value,
                                })
                            }
                            placeholder="Name"
                        />
                        <input
                            value={candidates.age}
                            onChange={(ev) =>
                                setCandidates({
                                    ...candidates,
                                    age: ev.target.value,
                                })
                            }
                            placeholder="Age"
                        />
                        <input
                            value={candidates.program}
                            onChange={(ev) =>
                                setCandidates({
                                    ...candidates,
                                    program: ev.target.value,
                                })
                            }
                            placeholder="Program"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
