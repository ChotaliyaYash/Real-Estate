import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// sign up form data type
interface formDataType {
    email?: string,
    password?: string,
}

const LogIn = () => {

    const [formData, setFormData] = useState<formDataType>({})
    const [error, setError] = useState<catchErrorType>()
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handelFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (!formData.email || !formData.password) return;

        setLoading(true);
        try {

            const res = await axios.post("/api/v1/login", formData);
            const data = res.data;

            if (data.success === false) {
                setError(data.message);
                setLoading(false);
            }

            console.log(data);
            setLoading(false);

            navigate("/");

        } catch (error) {
            setLoading(false);
            setError(error as catchErrorType);
        }
    }

    return (
        <div className="min-h-screen max-w-lg mx-auto p-3">
            <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>
            <form className="flex flex-col gap-4" onSubmit={handelFormSubmit}>
                <input type="email" placeholder="email" value={formData.email} id="email" className="border p-3 rounded-lg" onChange={handelChange} />
                <input type="password" placeholder="password" value={formData.password} id="password" className="border p-3 rounded-lg" onChange={handelChange} />

                <button className="uppercase hover:opacity-95 disabled:opacity-80 text-white bg-slate-700 p-3 rounded-lg" disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
            </form>

            <div className="flex flex-col mt-4">
                <button className="uppercase hover:opacity-95 disabled:opacity-80 text-white bg-red-700 p-3 rounded-lg" disabled={loading}>Continue with Google</button>
            </div>

            <div className="mt-5 flex gap-2">
                <span>Don't have an account?</span>
                <Link to="/signin">
                    <span className="text-blue-700">Sign up</span>
                </Link>
            </div>

            {error && <p className="text-red-700 mt-5">{error.response.data.message}</p>}
        </div>
    )
}

export default LogIn