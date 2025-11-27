import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserCircleIcon, MapIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const navItems = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Packages", to: "/packages" },
  { name: "Contact", to: "/contact" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [windowSize, setWindowSize] = useState(window.innerWidth <= 865);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
  navigate("/")
    } catch (error) {
      toast.error(error.message || 'Failed to log out');
    }
  };
  console.log(user, '--')
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth <= 865);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-30">
              <div className="flex justify-between items-center gap-36" >
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-xl font-bold text-indigo-800">
                    SportVoyage
                  </Link>
                </div>
                {!windowSize &&
                  <div className=" sm:ml-6 flex justify-between align-center gap-16">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={`${pathname === item.to
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>}
              </div>
              {!windowSize && 
              <div className=" sm:ml-6 sm:flex sm:items-center">
                {isAuthenticated? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <UserCircleIcon className="h-6 w-6 text-indigo-600" />
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          {user?.name || 'User'}
                        </span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as="div"
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <Link
                          to="/my-plan"
                          className="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
                        >
                          <MapIcon className="h-6 w-6" />
                          My Trips
                        </Link>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>

                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex gap-4">
                    <Link
                      to="/login"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>}
              {/* Mobile menu*/}
              {windowSize &&
                <div className="-mr-2 flex items-center ">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>}
            </div>
          </div>

          <Disclosure.Panel >
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`${pathname === item.to
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                
                  <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <UserCircleIcon className="h-8 w-8 text-indigo-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          {user?.name || 'User'}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {user?.email || ''}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <Link
                        to="/my-plan"
                        className="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
                      >
                        <MapIcon className="h-6 w-6" />
                        My Trips
                      </Link>
                      <button
                        onClick={
                      handleLogout}
                        className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="space-y-1">
                    <Link
                      to="/login"
                      className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full text-left px-4 py-2 text-base font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}