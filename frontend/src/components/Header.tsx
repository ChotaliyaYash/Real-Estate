import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {

    const [searchKey, setSearchKey] = useState<string>("");

    return (
        <header className="bg-slate-200 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between p-3">
                {/* Logo */}
                <h1 className="font-bold text-lg sm:text-2xl flex flex-wrap items-center">
                    <Link to="/">
                        <span className="text-slate-500">Real</span>
                        <span className=" text-slate-700">Estate</span>
                    </Link>
                </h1>

                {/* Search */}
                <form className="bg-slate-100 p-2 sm:p-3 rounded-lg flex items-center gap-3">
                    <input value={searchKey} onChange={e => setSearchKey(e.target.value)} type="text" placeholder="Search..." className="bg-transparent focus:outline-none outline-none w-24 sm:w-64" />
                    <FaSearch className="text-slate-600" />
                </form>

                {/* Options */}
                <ul className='flex items-center text-sm sm:text-base'>
                    <li>
                        <NavLink to='/' className={({ isActive }) => `${isActive ? "text-slate-700" : "text-slate-500"} hidden sm:inline hover:underline mr-4`}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/about' className={({ isActive }) => `${isActive ? "text-slate-700" : "text-slate-500"} hidden sm:inline hover:underline mr-4`}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' className={({ isActive }) => `${isActive ? "text-slate-700" : "text-slate-500"} hidden sm:inline hover:underline mr-4`}>
                            Add
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/signin' className={({ isActive }) => `${isActive ? "text-slate-700" : "text-slate-500"} hover:underline`}>
                            Sign In
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header