import React from 'react'
import { Bars } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

function LoaderButton({ buttonText, callback }) {
    const { loading } = useSelector((state) => state.auth)
    return (
        <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            disabled={loading}
            onClick={callback}
        >
            {loading ? <Bars
                color="#FFFFFF"  // Change to white or a color that contrasts with your button background
                height={20}      // Adjust height to fit the button
                width={20}       // Adjust width to fit the button
                ariaLabel="bars-loading"
                wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                visible={true}
            /> : buttonText}
        </button>
    )
}

export default LoaderButton