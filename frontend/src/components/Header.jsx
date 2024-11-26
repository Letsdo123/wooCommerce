import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo';
import { GrSearch } from 'react-icons/gr'
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../features/modalSlice';
import { clearError, clearSuccess, logOutUser } from '../features/AuthSlice';
import useToastNotification from '../utils/useToastNofication';
import ROLE from '../utils/role';

function Header() {
  const { user, token, error, success } = useSelector((state) => state.auth)
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()

  // This handle the notifcation
  // This maintaing the notification if error or success happen
  // useToastNotification(error, success, () => dispatch(clearError()), () => dispatch(clearSuccess()))

  // const doLogout = async (e) => {
  //   e.preventDefault()
  //   const response = await dispatch(logOutUser(token))
  //   if (response.type === 'auth/logout-user/fulfilled') {
  //     console.log("Successfully lougout user");
  //     dispatch(closeModal());
  //   }
  // }

  // set the search text if anything exists into the url
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const query = searchParams.get('query');
  //   if(query==null) setSearchText('');
  //   else setSearchText(query)
  // }, [location.search])

  // handle the search functionality
  /* const handleSearch = (e) => {
    const { value } = e.target;
    if (value.trim())
      navigate(`/search?query=${value}`)
    else if (value == "")
      navigate("/")
    else
      navigate(`/search`)
  } */

  return (
    <header className='h-16 shadow-md bg-white w-full z-40 border sticky top-0'>
      
    </header>
  )
}

export default Header