import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import axios from 'axios';

export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/signup', {
                username: email, // Assuming email is used as username
                password,
                name,
            });
            console.log("User signed up:", response.data);
            alert("Signup successful!");
        } catch (err) {
            console.error("Signup error:", err.response ? err.response.data : err.message);
            alert("Signup failed!");
        }
    };

    return (
        <div className="flex align-items-center flex-column pt-6 px-3">
            <div className="surface-card p-6 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="images/blocks/logos/hyper.svg" alt="hyper" height="50" className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Sign Up to Farm Helper</div>
                    <span className="text-600 font-medium line-height-3">Already have an account?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="#/signin">Sign in here!</a>
                </div>

                <form onSubmit={signUpUser}>
                    <label htmlFor="name1" className="block text-900 font-medium mb-2">Name</label>
                    <InputText id="name1" value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full mb-3" />
                    
                    <label htmlFor="email1" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email1" value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="w-full mb-3" />

                    <label htmlFor="password1" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password1" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full mb-3" />

                    <Button label="Sign Up" icon="pi pi-user" className="w-full" type="submit" />
                </form>
            </div>
        </div>
    );
};
