import React from 'react'
import GrowWithUs from '../../components/sections/GrowWithUs'
import { useNavigate } from 'react-router-dom'

function GrowWithUsPage() {
    const navigate = useNavigate()
    return (
        <>
            <GrowWithUs
                onSellerClick={() => navigate('/registration/seller')}
                onLogisticsClick={()=>navigate('/registration/logistic')}
            />
        </>
    )
}

export default GrowWithUsPage