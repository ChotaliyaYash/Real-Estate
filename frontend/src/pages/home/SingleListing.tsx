import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { getListByIdAsyncThunk } from "../../features/list/listSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from 'swiper/core';
import 'swiper/css/bundle';

const SingleListing = () => {

    SwiperCore.use([Navigation]);

    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const [getDataLoading, setGetDataLoading] = useState<boolean>(false);
    const [getDataError, setGetDataError] = useState<string>("");

    const [details, setDetails] = useState<listModelType>({
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
                setDetails(data.payload);
            }
            if (data.meta.requestStatus === "rejected") {
                setGetDataError("Unable to get data!, Please try again later");
            }
            setGetDataLoading(false);
        }
        fatchData();

    }, [])

    if (getDataLoading) {
        return <h1>Loading...</h1>
    }

    if (getDataError) {
        return <h1>{getDataError}</h1>
    }

    console.log(details);

    return (
        <div className="">
            <Swiper navigation className="mySwiper">
                {details.imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div className="h-[500px]" style={{ background: `url(${url}) center no-repeat`, backgroundSize: "cover" }}>
                            {/* <img src={url} alt="image" /> */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SingleListing