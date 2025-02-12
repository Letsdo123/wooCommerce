import { useState } from 'react'
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiTruck, FiShoppingBag, FiUpload, FiClock, FiMapPin, FiDollarSign, FiStar } from 'react-icons/fi'
import { Dialog } from '@headlessui/react'

function FormSectionTitle({ icon: Icon, title }) {
  return (
    <h3 className="form-section-title">
      <Icon className="w-6 h-6 text-primary" />
      <span>{title}</span>
    </h3>
  )
}

function SellerRegistrationForm() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cuisine: '',
    averageOrders: '',
    description: '',
    openingHours: '',
    closingHours: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Seller form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="form-header h-64 mb-8">
          <div className="relative z-10 h-full flex items-center justify-between px-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <FiStar className="w-4 h-4 text-yellow-300 mr-2" />
                <span className="text-white text-sm">Join 5000+ successful restaurants</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Restaurant Partner Registration</h2>
              <p className="text-white/90 text-lg mb-6">Transform your restaurant's future with our platform</p>
              <div className="flex flex-wrap gap-4">
                <div className="stat-card">
                  <FiShoppingBag className="w-5 h-5 text-white mr-2" />
                  <span className="text-white">5000+ Partners</span>
                </div>
                <div className="stat-card">
                  <FiUser className="w-5 h-5 text-white mr-2" />
                  <span className="text-white">1M+ Customers</span>
                </div>
                <div className="stat-card">
                  <FiDollarSign className="w-5 h-5 text-white mr-2" />
                  <span className="text-white">2x Revenue Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="form-section">
            <FormSectionTitle icon={FiUser} title="Basic Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Restaurant Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                  placeholder="Enter restaurant name"
                />
              </div>
              <div>
                <label className="form-label">Owner Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  placeholder="Enter owner name"
                />
              </div>
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <FormSectionTitle icon={FiMapPin} title="Restaurant Details" />
            <div className="space-y-6">
              <div>
                <label className="form-label">Complete Address *</label>
                <textarea
                  required
                  rows={3}
                  className="form-input"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter complete restaurant address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="form-label">Cuisine Type *</label>
                  <select
                    required
                    className="form-input"
                    value={formData.cuisine}
                    onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
                  >
                    <option value="">Select cuisine type</option>
                    <option value="italian">Italian</option>
                    <option value="chinese">Chinese</option>
                    <option value="indian">Indian</option>
                    <option value="mexican">Mexican</option>
                    <option value="japanese">Japanese</option>
                    <option value="american">American</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <FormSectionTitle icon={FiUpload} title="Required Documents" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Business License *</label>
                <div className="upload-zone">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload business license</span>
                  <span className="text-xs text-gray-400 mt-1">PDF, JPG or PNG</span>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" required />
                </div>
              </div>
              <div>
                <label className="form-label">Food License *</label>
                <div className="upload-zone">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload food license</span>
                  <span className="text-xs text-gray-400 mt-1">PDF, JPG or PNG</span>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" required />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-red-600 transition-colors font-semibold flex items-center space-x-2 shadow-lg shadow-primary/30 hover:shadow-primary/50"
            >
              <span>Submit Registration</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DeliveryPartnerForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    vehicleType: '',
    workingHours: '',
    experience: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Delivery partner form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="form-header h-64 mb-8">
          <div className="relative z-10 h-full flex items-center justify-between px-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <FiStar className="w-4 h-4 text-yellow-300 mr-2" />
                <span className="text-white text-sm">Join 10,000+ delivery partners</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Delivery Partner Registration</h2>
              <p className="text-white/90 text-lg mb-6">Start earning with flexible hours and competitive pay</p>
              <div className="flex flex-wrap gap-4">
                <div className="stat-card">
                  <FiTruck className="w-5 h-5 text-white mr-2" />
                  <span className="text-white">10K+ Partners</span>
                </div>
                <div className="stat-card">
                  <FiClock className="w-5 h-5 text-white mr-2" />
                  <span className="text-white">Flexible Hours</span>
                </div>
                <div className="stat-card">
                  <FiDollarSign className="w-5 h-5 text-white mr-2" />
                  <span className="text-white">Weekly Payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="form-section">
            <FormSectionTitle icon={FiUser} title="Personal Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="form-label">City *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="Enter city"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <FormSectionTitle icon={FiTruck} title="Work Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Vehicle Type *</label>
                <select
                  required
                  className="form-input"
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                >
                  <option value="">Select vehicle type</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="car">Car</option>
                  <option value="scooter">Scooter</option>
                </select>
              </div>
              <div>
                <label className="form-label">Preferred Working Hours *</label>
                <select
                  required
                  className="form-input"
                  value={formData.workingHours}
                  onChange={(e) => setFormData({...formData, workingHours: e.target.value})}
                >
                  <option value="">Select preferred hours</option>
                  <option value="morning">Morning (6 AM - 2 PM)</option>
                  <option value="afternoon">Afternoon (2 PM - 10 PM)</option>
                  <option value="night">Night (10 PM - 6 AM)</option>
                  <option value="flexible">Flexible Hours</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <FormSectionTitle icon={FiUpload} title="Required Documents" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Driver's License *</label>
                <div className="upload-zone">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload driver's license</span>
                  <span className="text-xs text-gray-400 mt-1">PDF, JPG or PNG</span>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" required />
                </div>
              </div>
              <div>
                <label className="form-label">Vehicle Registration *</label>
                <div className="upload-zone">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload vehicle registration</span>
                  <span className="text-xs text-gray-400 mt-1">PDF, JPG or PNG</span>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" required />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-red-600 transition-colors font-semibold flex items-center space-x-2 shadow-lg shadow-primary/30 hover:shadow-primary/50"
            >
              <span>Submit Application</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Agents() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedForm, setSelectedForm] = useState(null)

  const showForm = (type) => {
    setSelectedForm(type)
  }

  return (
    <div className="min-h-screen bg-white">
      <Dialog
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        className="fixed inset-0 z-50 md:hidden"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <div className="fixed right-0 top-0 bottom-0 w-[250px] bg-white p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4"
          >
            <FiX className="w-6 h-6" />
          </button>
          <div className="flex flex-col space-y-4 mt-8">
            <a href="#" className="text-gray-700 hover:text-primary">Home</a>
            <a href="#" className="text-gray-700 hover:text-primary">Restaurants</a>
            <a href="#" className="text-gray-700 hover:text-primary">About</a>
            <a href="#" className="text-gray-700 hover:text-primary">Contact</a>
          </div>
        </div>
      </Dialog>

      {!selectedForm ? (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-6">Grow With Us</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Join our platform as a restaurant partner or delivery partner and be part of our growing community
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div 
                onClick={() => showForm('seller')}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <FiShoppingBag className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Restaurant Partner</h3>
                <p className="text-gray-600 mb-6">
                  Expand your business reach and increase your revenue by partnering with us
                </p>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Reach more customers
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Increase your revenue
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Manage orders efficiently
                  </li>
                </ul>
                <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors">
                  Register Now
                </button>
              </div>

              <div 
                onClick={() => showForm('logistics')}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <FiTruck className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Delivery Partner</h3>
                <p className="text-gray-600 mb-6">
                  Join our delivery fleet and enjoy flexible hours with competitive earnings
                </p>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Flexible working hours
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Competitive earnings
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Weekly payments
                  </li>
                </ul>
                <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        selectedForm === 'seller' ? <SellerRegistrationForm /> : <DeliveryPartnerForm />
      )}
    </div>
  )
}

export default Agents