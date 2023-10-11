import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { loginAsyncThunk } from "../../features/user/userSlice"
import OAuth from "../../components/OAuth"

// sign up form data type
interface formDataType {
    email?: string,
    password?: string,
}

const LogIn = () => {

    const { loading, error } = useSelector((state: RootState) => state.user);

    const [formData, setFormData] = useState<formDataType>({})

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handelFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (!formData.email || !formData.password) return;

        const res = await dispatch(loginAsyncThunk({
            email: formData.email,
            password: formData.password,
        }))

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/");
        }
    }

    return (
        <div className="min-h-screen max-w-lg mx-auto p-3">
            <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>

            <form className="flex flex-col gap-4" onSubmit={handelFormSubmit}>
                <input type="email" placeholder="email" value={formData.email} id="email" className="border p-3 rounded-lg" onChange={handelChange} required />
                <input type="password" placeholder="password" value={formData.password} id="password" className="border p-3 rounded-lg" onChange={handelChange} required minLength={6} maxLength={20} />

                <button className="uppercase hover:opacity-95 disabled:opacity-80 text-white bg-slate-700 p-3 rounded-lg" disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>

                {/* Google auth */}
                <OAuth />
            </form>

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