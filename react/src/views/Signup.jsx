import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    // refs
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    // display errors
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    // submit functionality
    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        // make request to the server
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                // set user and token information
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;

                // validation error
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Signup Form</h1>

                    {/* error message */}
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <input
                        ref={nameRef}
                        name="fullName"
                        placeholder="Full Name"
                    />
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
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        name="password"
                        placeholder="Password Confirmation"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Already registered? <Link to="/login">Sign in</Link>{" "}
                        here.
                    </p>
                </form>
            </div>
        </div>
    );
}
