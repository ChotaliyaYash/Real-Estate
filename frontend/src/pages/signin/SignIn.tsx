import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { signupAsyncThunk } from '../../features/user/userSlice'
import OAuth from '../../components/OAuth';
// sign up form data type
interface formDataType {
    username?: string,
    email?: string,
    password?: string,
}

const SignIn = () => {

    const [formData, setFormData] = useState<formDataType>({})

    const { error, loading } = useSelector((state: RootState) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handelFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) return;

        const res = await dispatch(signupAsyncThunk({
            username: formData.username,
            email: formData.email,
            password: formData.password,
        }));

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/login");
        }
    }

    return (
        <div className="max-w-lg mx-auto p-3 min-h-screen">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handelFormSubmit}>
                <input type="text" value={formData.username} placeholder="username" className="border p-3 rounded-lg" id="username" onChange={handelChange} required />
                <input type="email" value={formData.email} placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handelChange} required />
                <input type="password" value={formData.password} placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handelChange} required minLength={6} maxLength={20} />

                <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>

                {/* Google Auth */}
                <OAuth />
            </form>


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