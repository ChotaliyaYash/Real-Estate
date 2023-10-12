import { useParams } from "react-router-dom";

const SingleListing = () => {
    const { id } = useParams();

    console.log(id);

    return (
        <div>SingleListing</div>
    )
}

export default SingleListing