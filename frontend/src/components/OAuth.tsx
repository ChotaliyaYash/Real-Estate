import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebaseSetup";
import { useDispatch, useSelector } from "react-redux";
import { signupWithGoogleAsyncThunk } from '../features/user/userSlice'
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

interface OAuthProps {
    username: string,
    email: string,
    avatar: string,
}

const OAuth = () => {

    const dispatch = useDispatch<AppDispatch>();

    const navigator = useNavigate();

    const { loading } = useSelector((state: RootState) => state.user);

    const handelGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const data: OAuthProps = {
                username: result.user.displayName!,
                email: result.user.email!,
                avatar: result.user.photoURL!,
            }

            const res = dispatch(signupWithGoogleAsyncThunk(data));

            if ((await res).meta.requestStatus === 'fulfilled') {
                navigator('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handelGoogleClick} disabled={loading} type="button" className="uppercase hover:opacity-95 disabled:opacity-80 text-white bg-red-700 p-3 rounded-lg">{loading ? "Loading..." : "Continue with Google"}</button>
    )
}

export default OAuth