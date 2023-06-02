import { useContext } from "react";
import { createContext, useState } from "react";

const StateContext = createContext({
    // default values for auto completion when called useStateContext()
    user: null,
    token: null,
    candidate: null,
    setUser: () => {},
    setToken: () => {},
    setCandidate: () => {},
});

export const ContextProvider = ({ children }) => {
    // actual states
    const [user, setUser] = useState({});
    const [candidate, setCandidate] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    // const [token, _setToken] = useState(123); // test token

    const setToken = (token) => {
        _setToken(token);

        // save to localStorage
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                // pass objects
                user,
                token,
                setUser,
                setToken,
                candidate,
                setCandidate,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
