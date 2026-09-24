import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "./api-helpers";
import { userActions } from "./store";

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onResReceived = (data) => {
        console.log("USER LOGIN SUCCESS:", data);

        if (data.id) {
            localStorage.setItem("userId", data.id);
        }

        dispatch(userActions.login());

        navigate("/movies");
    };

    const getData = async (data) => {
        console.log("USER LOGIN DATA:", data);

        try {
            const response = await sendUserAuthRequest(
                data.inputs,
                data.signup
            );

            console.log("USER AUTH RESULT:", response);

            onResReceived(response);
        } catch (error) {
            console.error(
                "USER LOGIN FAILED:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Login failed. Please check your email and password."
            );
        }
    };

    return (
        <div>
            <AuthForm
                onSubmit={getData}
                isAdmin={false}
            />
        </div>
    );
};

export default Auth;