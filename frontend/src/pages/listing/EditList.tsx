import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react"
import { app } from "../../utils/firebaseSetup";
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getListByIdAsyncThunk, updateUserListAsyncThunk } from '../../features/list/listSlice'
import { useNavigate, useParams } from "react-router-dom";

const EditList = () => {

    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const [getDataLoading, setGetDataLoading] = useState<boolean>(false);
    const [getDataError, setGetDataError] = useState<string>("");

    const [formData, setFormData] = useState<listModelType>({
        name: "",
        description: "",
        address: "",
        type: "sell",
        parking: false,
        furnished: false,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 1,
        discountedPrice: 1,
        imageUrls: [],
        _id: "",
        userRef: ""
    });

    useEffect(() => {

        const fatchData = async () => {
            setGetDataLoading(true);
            const data = await dispatch(getListByIdAsyncThunk(id!));
            if (data.meta.requestStatus === "fulfilled") {
                setFormData(data.payload);
            }
            if (data.meta.requestStatus === "rejected") {
                setGetDataError("Unable to get data!, Please try again later");
            }
        }
        fatchData();
        setGetDataLoading(false);

    }, [])

    if (getDataLoading) {
        return <h1>Loading...</h1>
    }

    if (getDataError) {
        return <h1>{getDataError}</h1>
    }

    const { error, loading } = useSelector((state: RootState) => state.list);

    const navigate = useNavigate();

    // file uploadings
    const [files, setFiles] = useState<FileList | null>();
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const [imageUploadError, setImageUploadError] = useState<string>("");

    const uploadFile = async (file: File) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = `${Date.now()}-${file.name}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);
                    // setFilePercent(Math.round(progress));
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            )
        })
    }

    const handelOnUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!files || files.length > 3) {
            setImageUploadError("You can upload max 3 images");
            return;
        }

        setImageLoading(true);

        const promises = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            promises.push(uploadFile(file));
        }

        // console.log(promises);

        Promise.all(promises)
            .then((urls) => {

                setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...urls as string[]] })
                setImageUploadError("");
                setImageLoading(false);
            })
            .catch((error) => {
                setImageUploadError(error.message);
                setImageLoading(false);
            })
    }

    const handelDeleteImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: number) => {
        e.preventDefault();

        setFormData({ ...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== key) })
    }

    const handelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target.id === "sell" || e.target.id === "rent") {
            setFormData({ ...formData, type: e.target.id })
        };

        if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
            setFormData({ ...formData, [e.target.id]: !formData[e.target.id] })
        };

        if (e.target.id === "bedrooms" || e.target.id === "bathrooms" || e.target.id === "regularPrice" || e.target.id === "discountedPrice") {
            setFormData({ ...formData, [e.target.id]: Number(e.target.value) })
        };

        if (e.target.id === "name" || e.target.id === "description" || e.target.id === "address") {
            setFormData({ ...formData, [e.target.id]: e.target.value })
        };
    }

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.imageUrls.length === 0) {
            setImageUploadError("Please upload at least one image");
            return;
        };

        const res = await dispatch(updateUserListAsyncThunk({
            id: id!,
            data: formData
        }));

        if (res.meta.requestStatus === "fulfilled") {

            navigate(`/listing/${res.payload._id}`);
        }
    }

    return (
        <main className="p-3 max-w-4xl mx-auto min-h-screen">

            <h1 className="text-3xl py-7 text-center font-semibold">Update a Listing</h1>

            <form className="flex flex-col sm:flex-row gap-4" onSubmit={handelSubmit}>

                {/* left part */}
                <div className="flex flex-col gap-4 flex-1">
                    {/* inputs */}
                    <input type="text" placeholder="Name" value={formData.name} className="border p-3 rounded-lg" id="name" maxLength={62} minLength={10} required onChange={handelChange} />
                    <textarea placeholder="Description" value={formData.description} className="border p-3 rounded-lg" id="description" required onChange={handelChange} />
                    <input type="text" placeholder="Address" value={formData.address} className="border p-3 rounded-lg" id="address" required onChange={handelChange} />

                    {/* all checkmarks inputs */}
                    <div className="flex flex-wrap gap-6">
                        {/* sell */}
                        <div className=" flex items-center gap-2">
                            <input type="checkbox" id="sell" className="w-5" checked={formData.type === "sell"} onChange={handelChange} />
                            <label htmlFor="sell">Sell</label>
                        </div>

                        {/* Rent */}
                        <div className=" flex items-center gap-2">
                            <input type="checkbox" id="rent" className="w-5" checked={formData.type === "rent"} onChange={handelChange} />
                            <label htmlFor="rent">Rent</label>
                        </div>

                        {/* Parking spot */}
                        <div className=" flex items-center gap-2">
                            <input type="checkbox" id="parking" className="w-5" checked={formData.parking} onChange={handelChange} />
                            <label htmlFor="parking">Parking spot</label>
                        </div>

                        {/* Furnished */}
                        <div className=" flex items-center gap-2">
                            <input type="checkbox" id="furnished" className="w-5" checked={formData.furnished} onChange={handelChange} />
                            <label htmlFor="furnished">Furnished</label>
                        </div>

                        {/* Offer */}
                        <div className=" flex items-center gap-2">
                            <input type="checkbox" id="offer" className="w-5" checked={formData.offer} onChange={handelChange} />
                            <label htmlFor="offer">Offer</label>
                        </div>
                    </div>

                    {/* inputs */}
                    <div className="flex flex-wrap gap-6">
                        {/* Bedrooms */}
                        <div className="flex items-center gap-2">
                            <input type="number" id="bedrooms" value={formData.bedrooms} min={1} max={10} required className="p-3 border rounded-lg" onChange={handelChange} />
                            <label htmlFor="bedrooms">Beds</label>
                        </div>

                        {/* Bathrooms */}
                        <div className="flex items-center gap-2">
                            <input type="number" id="bathrooms" value={formData.bathrooms} min={1} max={10} required className="p-3 border rounded-lg" onChange={handelChange} />
                            <label htmlFor="bathrooms">Baths</label>
                        </div>
                    </div>

                    {/* pricing */}
                    <div className="flex flex-wrap gap-6">
                        {/* Bedrooms */}
                        <div className="flex items-center gap-2">
                            <input type="number" id="regularPrice" value={formData.regularPrice} required className="p-3 border rounded-lg" min={1} max={10000} onChange={handelChange} />
                            <div className="flex flex-col items-center">
                                <label htmlFor="regularPrice">Regular price</label>
                                <span className="text-sm">($ / month)</span>
                            </div>
                        </div>

                        {/* Bathrooms */}
                        {formData.offer && <div className="flex gap-2 items-center">
                            <input type="number" id="discountedPrice" value={formData.discountedPrice} required className="p-3 border rounded-lg" min={1} max={10000} onChange={handelChange} />
                            <div className="flex flex-col items-center">
                                <label htmlFor="discountedPrice">Discounted price</label>
                                <span className="text-sm">($ / month)</span>
                            </div>
                        </div>}
                    </div>
                </div>

                {/* right part */}
                <div className="flex flex-col flex-1 gap-4">
                    {/* title section */}
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Images:</p>
                        <span className="text-sm font-normal text-gray-500">The first image will be the cover (max 3)</span>
                    </div>

                    {/* image yploading section */}
                    <div className="flex gap-4">
                        <input type="file" onChange={e => setFiles(e.target.files)} id="images" accept="image/*" multiple className="p-3 border rounded-lg w-full" />
                        <button onClick={handelOnUpload} type="button" className="uppercase p-3 text-green-700 border border-green-700 rounded-lg hover:shadow-lg disabled:opacity-80" disabled={imageLoading}>{imageLoading ? "Uploading..." : "Upload"}</button>
                    </div>

                    {/* uploaded images */}
                    <div className="flex flex-col gap-4">
                        {formData.imageUrls.map((url, i) => (
                            <div key={i} className="flex items-center w-full justify-between px-4 border border-gray-300 py-2 rounded-lg">

                                {/* <div className="p-3 rounded border flex border-gray-300 items-center"> */}
                                <img src={url} alt="uploaded" className="w-20 h-20 object-contain rounded-lg" />
                                <div className=" text-red-700 p-3 cursor-pointer rounded hover:shadow-lg" onClick={e => handelDeleteImage(e, i)}>
                                    <RiDeleteBin7Fill className="text-xl" />
                                </div>
                                {/* </div> */}

                            </div>
                        ))}
                    </div>

                    {/* error */}
                    {imageUploadError && <p className="text-red-700 mt-2">{imageUploadError}</p>}

                    {/* submit button */}
                    <button className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80" disabled={loading}>{loading ? "Updating..." : "Update Listing"}</button>

                    {error && <p className="text-red-700 mt-5">{error.response.data.message}</p>}
                </div>

            </form>
        </main>
    )
}

export default EditList