import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
    // create refs
    const emailRef = useRef();
    const passwordRef = useRef();

    // display errors
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    // submit functionality
    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        // reset errors
        setErrors(null);

        // make request to the server
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                // set user and token information
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;

                // validation error
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Login Form</h1>

                    {/* error message */}
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
