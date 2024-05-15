import React from 'react'
function Navbar() {
    return (
        <div className="navbar bg-white sticky top-0 z-10 shadow-md">
            <div className="flex-1 join">
                <a className="btn join-item btn-sm text-white text-xl border-none bg-[#CC0000] hover:bg-[#CC0000]" href='/'>News</a>
                <a className="btn join-item btn-sm bg-white border-none hover:bg-white text-xl text-[#121221]" href='/'>Portal</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input bg-transparent text-black input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white text-black border-2 rounded-box w-52">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar