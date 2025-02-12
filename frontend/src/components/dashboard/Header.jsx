import { BellIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
    return (
        <header className="h-16 fixed top-0 right-0 left-0 md:left-64 bg-white border-b flex items-center justify-between px-6 z-10">
            <div className="flex items-center ml-12 md:ml-0">
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-48 md:w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <BellIcon className="h-6 w-6 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <UserCircleIcon className="h-6 w-6 text-gray-600" />
                </button>
            </div>
        </header>
    );
}

export default Header;