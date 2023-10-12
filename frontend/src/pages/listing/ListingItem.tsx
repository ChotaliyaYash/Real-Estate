import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { deleteUserListAsyncThunk } from '../../features/list/listSlice'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

interface listingItemProps {
    item: listModelType
    adminCall?: boolean
}



const ListingItem: React.FC<listingItemProps> = ({ item, adminCall = false }) => {

    const dispatch = useDispatch<AppDispatch>()

    const handleDelete = () => {
        dispatch(deleteUserListAsyncThunk(item._id));
    }

    const component = (<div>
        <img src={item.imageUrls[0]} alt="listing cover" className='h-[320px] sm:h-[220px] w-full object-cover duration-300 hover:scale-105 transition-scale' />
        <div className='p-3 flex flex-col gap-2 w-full'>
            <p className='text-lg font-semibold text-slate-700 truncate capitalize'>{item.name}</p>

            <div className='flex items-center gap-1'>
                <MdLocationOn className='h-4 w-4 text-green-700' />
                <p className='truncate text-gray-600 text-sm w-full'>{item.address}</p>
            </div>

            <p className='text-gray-600 text-sm line-clamp-2'>{item.description}</p>

            <p className='text-slate-500 mt-2 font-semibold'>
                ${item.offer ? item.discountedPrice : item.regularPrice} {item.type === 'rent' ? '/ month' : ''}
            </p>

            <div className='flex gap-4 text-xs font-bold text-slate-700'>
                <div className='flex gap-2'>
                    <p>{item.bedrooms}</p>
                    <p>{item.bedrooms > 1 ? "Beds" : "Bed"}</p>
                </div>
                <div className='flex gap-2'>
                    <p>{item.bathrooms}</p>
                    <p>{item.bathrooms > 1 ? "Baths" : "Bath"}</p>
                </div>
            </div>

            {/* Delete button */}
            {
                adminCall &&
                <div className='flex gap-3 text-white mt-2'>
                    <button type='button' onClick={handleDelete} className='w-full bg-red-700 p-1 rounded-lg hover:opacity-95'>Delete</button>
                    <Link to={`/edit-listing/${item._id}`} className='w-full text-center bg-slate-700 p-1 rounded-lg hover:opacity-95'>Edit</Link>
                </div>
            }
        </div>
    </div>)

    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            {
                adminCall
                    ?
                    component
                    :
                    <Link to={`/listing/${item._id}`} >
                        {component}
                    </Link>
            }
        </div>
    )
}

export default ListingItem