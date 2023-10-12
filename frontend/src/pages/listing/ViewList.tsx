import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { useEffect } from "react"
import { getUserListAsyncThunk } from "../../features/list/listSlice"
import ListingItem from "./ListingItem"

const ViewList = () => {

    const { loading, error, listing } = useSelector((state: RootState) => state.list)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getUserListAsyncThunk())
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    return (
        <main className="flex flex-col gap-4 max-w-7xl mx-auto p-3 min-h-screen">
            <h1 className="text-3xl font-semibold text-center px-7 pt-7 pb-4">Your Listings</h1>
            <div className="p-7 flex flex-wrap">
                {listing!.map((item) => (
                    <ListingItem key={item._id} item={item} adminCall />
                ))}
            </div>
        </main>
    )
}

export default ViewList