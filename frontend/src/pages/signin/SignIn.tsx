import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

// sign up form data type
interface formDataType {
    username?: string,
    email?: string,
    password?: string,
}

const SignIn = () => {

    const [formData, setFormData] = useState<formDataType>({})
    const [error, setError] = useState<catchErrorType>()
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handelFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) return;

        setLoading(true);
        try {
            const res = await axios.post("/api/v1/register", formData);
            const data = res.data;

            if (data.success === false) {
                setError(data.message);
                setLoading(false);
            }

            console.log(data);
            setLoading(false);
            navigate("/login");

        } catch (error) {
            setLoading(false);
            setError(error as catchErrorType);
        }
    }

    const handelGoogleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        console.log("Google");

    }

    return (
        <div className="max-w-lg mx-auto p-3 min-h-screen">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handelFormSubmit}>
                <input type="text" value={formData.username} placeholder="username" className="border p-3 rounded-lg" id="username" onChange={handelChange} />
                <input type="email" value={formData.email} placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handelChange} />
                <input type="password" value={formData.password} placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handelChange} />

                <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
            </form>

            <div className='flex mt-4 flex-col'>
                <button onClick={handelGoogleSubmit} className="bg-red-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80" disabled={loading}>Continue with Google</button>
            </div>

            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to="/login">
                    <span className='text-blue-700'>Sign In</span>
                </Link>
            </div>

            {error && <p className='mt-5 text-red-700'>{error.response.data.message}</p>}
        </div>
    )
}

export default SignIn