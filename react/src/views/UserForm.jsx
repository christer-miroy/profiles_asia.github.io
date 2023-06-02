import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client.js";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [users, setUsers] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    debugger;
                    setUsers(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (users.id) {
            // update user
            axiosClient
                .put(`/users/${users.id}`, users)
                .then(() => {
                    // success
                    navigate("/users");
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
            // add new user
            axiosClient
                .post(`/users`, users)
                .then(() => {
                    // success
                    navigate("/users");
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
            {users.id && <h1>Update User: {users.name}</h1>}
            {!users.id && <h1>New User:</h1>}
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
                            value={users.name}
                            onChange={(ev) =>
                                setUsers({ ...users, name: ev.target.value })
                            }
                            placeholder="Name"
                        />
                        <input
                            value={users.email}
                            onChange={(ev) =>
                                setUsers({ ...users, email: ev.target.value })
                            }
                            placeholder="Email"
                            type="email"
                        />
                        <input
                            onChange={(ev) =>
                                setUsers({
                                    ...users,
                                    password: ev.target.value,
                                })
                            }
                            placeholder="Password"
                            type="password"
                        />
                        <input
                            onChange={(ev) =>
                                setUsers({
                                    ...users,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            placeholder="Password Confirmation"
                            type="password"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
