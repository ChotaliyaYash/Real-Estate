const AddList = () => {
    return (
        <main className="p-3 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-3xl py-7 text-center font-semibold">Create a Listing</h1>

            <form className="flex flex-col sm:flex-row gap-4">

                {/* left part */}
                <div className="flex flex-col gap-4 flex-1">
                    {/* inputs */}
                    <input type="text" placeholder="Name" className="border p-3 rounded-lg" id="name" maxLength={62} minLength={10} required />
                    <textarea placeholder="Description" className="border p-3 rounded-lg" id="description" required />
                    <input type="text" placeholder="Address" className="border p-3 rounded-lg" id="address" required />

                    {/* all checkmarks inputs */}
                    <div className="flex flex-wrap gap-6">
                        {/* sell */}
                        <div className=" flex items-center gap-2">
                            <input type="checkbox" id="sell" className="w-5" />
                            <label htmlFor="sell">Sell</label>
                        </div>

                        {/* Rent */}
                        <div className=" flex items-center gap-2">
                            <input type="checkbox" id="rent" className="w-5" />
                            <label htmlFor="rent">Rent</label>
                        </div>

                        {/* Parking spot */}
                        <div className=" flex items-center gap-2">
                            <input type="checkbox" id="parking" className="w-5" />
                            <label htmlFor="parking">Parking spot</label>
                        </div>

                        {/* Furnished */}
                        <div className=" flex items-center gap-2">
                            <input type="checkbox" id="furnished" className="w-5" />
                            <label htmlFor="furnished">Furnished</label>
                        </div>

                        {/* Offer */}
                        <div className=" flex items-center gap-2">
                            <input type="checkbox" id="offer" className="w-5" />
                            <label htmlFor="offer">Offer</label>
                        </div>
                    </div>

                    {/* inputs */}
                    <div className="flex flex-wrap gap-6">
                        {/* Bedrooms */}
                        <div className="flex items-center gap-2">
                            <input type="number" id="bedrooms" min={1} max={10} required className="p-3 border rounded-lg" />
                            <label htmlFor="bedrooms">Beds</label>
                        </div>

                        {/* Bathrooms */}
                        <div className="flex items-center gap-2">
                            <input type="number" id="bathrooms" min={1} max={10} required className="p-3 border rounded-lg" />
                            <label htmlFor="bathrooms">Baths</label>
                        </div>
                    </div>

                    {/* pricing */}
                    <div className="flex flex-wrap gap-6">
                        {/* Bedrooms */}
                        <div className="flex items-center gap-2">
                            <input type="number" id="regularPrice" required className="p-3 border rounded-lg" min={1} max={10000} />
                            <div className="flex flex-col items-center">
                                <label htmlFor="regularPrice">Regular price</label>
                                <span className="text-sm">($ / month)</span>
                            </div>
                        </div>

                        {/* Bathrooms */}
                        <div className="flex gap-2 items-center">
                            <input type="number" id="discountedPrice" required className="p-3 border rounded-lg" min={1} max={10000} />
                            <div className="flex flex-col items-center">
                                <label htmlFor="discountedPrice">Discounted price</label>
                                <span className="text-sm">($ / month)</span>
                            </div>
                        </div>
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
                        <input type="file" id="images" accept="image/*" multiple className="p-3 border rounded-lg w-full" />
                        <button type="button" className="uppercase p-3 text-green-700 border border-green-700 rounded-lg hover:shadow-lg disabled:opacity-80">Upload</button>
                    </div>

                    {/* submit button */}
                    <button className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>
                </div>
            </form>
        </main>
    )
}

export default AddList