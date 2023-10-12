import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { useEffect } from "react"
import { getListAsyncThunk } from "../../features/list/listSlice"
import ListingItem from "../listing/ListingItem"

const Home = () => {

    const { loading, error, listing } = useSelector((state: RootState) => state.list)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getListAsyncThunk());
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    console.log(listing);

    return (
        <div className="p-7 flex flex-wrap gap-4 max-w-7xl mx-auto">
            {listing!.map((item) => (
                <ListingItem key={item._id} item={item} />
            ))}
        </div>
    )
}

export default Home