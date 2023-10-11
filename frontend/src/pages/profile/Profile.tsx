import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { deleteAccountAsyncThunk, signOutUserAsyncThunk, updateUserAsyncThunk } from '../../features/user/userSlice'
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../../utils/firebaseSetup"

const Profile = () => {

    const { currentUser, error, loading } = useSelector((state: RootState) => state.user)

    // formData
    const [formData, setFormData] = useState<userDataType>(currentUser!);
    const [password, setPassword] = useState<string>("");
    const [updated, setUpdated] = useState<boolean>(false);

    // File upload things
    const [file, setFile] = useState<File | undefined>(undefined)
    const [filePercent, setFilePercent] = useState<number>(0);
    const [fileUploadError, setFileUploadError] = useState<boolean>(false);

    // hook things
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement>(null);

    // File upload handler
    const handelFileUpload = async (file: File) => {
        const storage = getStorage(app);
        const fileName = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercent(Math.round(progress));
            },
            (error) => {
                console.log(error);
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL });
                });
            }
        )
    }

    useEffect(() => {
        if (file) {
            handelFileUpload(file);
        }
    }, [file])

    const handelDeleteAccount = async () => {
        const res = await dispatch(deleteAccountAsyncThunk(currentUser!._id));

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/")
        }
    }

    const handelSignOut = async () => {
        const res = await dispatch(signOutUserAsyncThunk())

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/")
        }
    }

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: userDataType = {
            ...formData,
            password,
        }

        const res = await dispatch(updateUserAsyncThunk(data));

        if (res.meta.requestStatus === "fulfilled") {
            setUpdated(true);
            // setTimeout(() => {
            //     setUpdated(false);
            // }, 3000);
        }
    }

    return (
        <div className="min-h-screen max-w-xl mx-auto p-3 ">
            <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>


            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                <input type="file" name="" id="" ref={fileRef} hidden accept="image/*" onChange={(e) => setFile(e.target.files![0])} />
                <img onClick={() => fileRef.current?.click()} src={formData.avatar} alt="avatar" className="w-32 h-32 rounded-full self-center mt-2 object-cover cursor-pointer" />
                <p className="text-center">

                    {
                        fileUploadError
                            ?
                            <p className="text-red-700 mt-5">Error Image Upload (image must be less than 2 MB)</p>
                            :
                            filePercent > 0 && filePercent < 100
                                ?
                                <p className="text-green-700 mt-5">{`uploading ${filePercent}%`}</p>
                                :
                                filePercent === 100
                                    ?
                                    <p className="text-green-700 mt-5">File uploaded</p>
                                    :
                                    ""
                    }
                </p>

                <input type="text" placeholder="username" value={formData.username} id="username" onChange={handelChange} className="border p-3 rounded-lg" />
                <input type="email" placeholder="email" value={formData.email} id="email" onChange={handelChange} className="border p-3 rounded-lg" />
                <input type="password" placeholder="password" value={password} id="password" onChange={e => setPassword(e.target.value)} className="border p-3 rounded-lg" />

                <button disabled={loading} className="uppercase hover:opacity-95 disabled:opacity-80 text-white bg-slate-700 p-3 rounded-lg" >{loading ? "Loading..." : "Update"}</button>
            </form>

            <div className="flex justify-between text-red-700 mt-5">
                <span className="cursor-pointer" onClick={handelDeleteAccount}>Delete Account</span>
                <span className="cursor-pointer" onClick={handelSignOut}>Sign Out</span>
            </div>

            {error && <p className="text-red-700 mt-5">{error.response.data.message}</p>}
            {updated && <p className="text-green-700 mt-5">User is updated successfully!</p>}
        </div >
    )
}

export default Profile