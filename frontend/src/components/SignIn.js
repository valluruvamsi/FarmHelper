import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import axios from 'axios';

export const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signInUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                username,
                password,
            });
            console.log("User signed in:", response.data);
            alert("Login successful!");
        } catch (err) {
            console.error("Login error:", err.response ? err.response.data : err.message);
            alert("Login failed!");
        }
    };

    return (
        <div className="flex align-items-center flex-column pt-6 px-3">
            <div className="surface-card p-6 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="images/blocks/logos/hyper.svg" alt="hyper" height="50" className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="#/signup">Create today!</a>
                </div>

                <form onSubmit={signInUser}>
                    <label htmlFor="email1" className="block text-900 font-medium mb-2">Email</label>
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)} id="email1" type="text" className="w-full mb-3" />

                    <label htmlFor="password1" className="block text-900 font-medium mb-2">Password</label>
                    <InputText value={password} onChange={(e) => setPassword(e.target.value)} id="password1" type="password" className="w-full mb-3" />

                    <Button label="Sign In" icon="pi pi-user" className="w-full" type="submit" />
                </form>
            </div>
        </div>
    );
};
