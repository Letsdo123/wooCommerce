import React from 'react'
import { FiShoppingBag, FiTruck, FiDollarSign } from 'react-icons/fi';
import PartnerCard from '../cards/PartnerCard';

function GrowWithUs({onSellerClick,onLogisticsClick}) {
    const partnerTypes = [
        {
            icon: FiShoppingBag,
            title: "Restaurant Partner",
            description: "Expand your business reach and increase your revenue by partnering with us",
            benefits: [
                "Reach more customers",
                "Increase your revenue",
                "Manage orders efficiently"
            ],
            buttonText: "Register Now",
            onClick: onSellerClick
        },
        {
            icon: FiTruck,
            title: "Delivery Partner",
            description: "Join our delivery fleet and enjoy flexible hours with competitive earnings",
            benefits: [
                "Flexible working hours",
                "Competitive earnings",
                "Weekly payments"
            ],
            buttonText: "Join Now",
            onClick: onLogisticsClick
        }
    ];
    return (
        <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Grow With Us
                    </h2>
                    <p className="text-lg text-gray-600">
                        Join our platform as a selling partner or delivery partner and be part of our growing community
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {partnerTypes.map((partner, index) => (
                        <PartnerCard
                            key={index}
                            icon={partner.icon}
                            title={partner.title}
                            description={partner.description}
                            benefits={partner.benefits}
                            buttonText={partner.buttonText}
                            onClick={partner.onClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GrowWithUs