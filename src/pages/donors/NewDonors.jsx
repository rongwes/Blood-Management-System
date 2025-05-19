import React, { useState } from 'react';
import axios from 'axios';
import new_donor_image from '../../assets/new_donor_image.png';

export default function NewDonors() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    surname: '',
    idNumber: '',
    primaryNumber: '',
    secondaryNumber: '',
    telephoneNumber: '',
    email: '',
    country: '',
    province: '',
    city: '',
    town: '',
    street: '',
    standNumber: '',
    nokName: '',
    nokSurname: '',
    nokIdNumber: '',
    nokCountry: '',
    nokProvince: '',
    nokCity: '',
    nokTown: '',
    nokStreet: '',
    nokStandNumber: '',
    nokPrimaryNumber: '',
    nokSecondaryNumber: '',
    nokEmail: '',
    bloodType: '', // Added blood type
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Dev mode autofill function
  const autofillDummyData = () => {
    // Generate random numbers for IDs and phone numbers
    const generateId = () => Math.floor(10000000000000 + Math.random() * 90000000000000).toString();
    const generatePhone = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();
    
    // List of blood types for random selection
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    
    // Random data for the form
    setForm({
      name: 'John',
      surname: 'Doe',
      idNumber: generateId(),
      primaryNumber: generatePhone(),
      secondaryNumber: generatePhone(),
      telephoneNumber: generatePhone(),
      email: `john.doe${Math.floor(Math.random() * 1000)}@example.com`,
      country: 'South Africa',
      province: 'North West',
      city: 'Mahikeng',
      town: 'Central',
      street: `${Math.floor(Math.random() * 100)} Main Street`,
      standNumber: `Stand-${Math.floor(Math.random() * 1000)}`,
      nokName: 'Jane',
      nokSurname: 'Doe',
      nokIdNumber: generateId(),
      nokAddress: `${Math.floor(Math.random() * 100)} Side Street, Mahikeng`,
      nokPrimaryNumber: generatePhone(),
      nokSecondaryNumber: generatePhone(),
      nokEmail: `jane.doe${Math.floor(Math.random() * 1000)}@example.com`,
      bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Step 1: Format the data according to backend API expectations
      const donorData = {
        // Donor personal info
        name: form.name,
        surname: form.surname,
        id_number: form.idNumber,
        blood_type: form.bloodType,
        eligibility_status: true,
        
        // Donor address
        address: {
          country: form.country,
          province: form.province,
          city: form.city,
          town: form.town,
          street: form.street,
          stand_no: form.standNumber,
          zip_code: '' // Not in form but expected by API
        },
        
        // Donor contact information
        contact: {
          primary_number: form.primaryNumber,
          secondary_number: form.secondaryNumber,
          telephone: form.telephoneNumber,
          email: form.email
        }
      };
      
      // Step 2: Create the donor first
      const donorResponse = await axios.post('/api/donors', donorData);
      const donorId = donorResponse.data.donor.id;
      
      // Step 3: If donor creation was successful and we have NOK data, create the next of kin
      if (donorId && form.nokName && form.nokSurname) {
        const nokData = {
          donor_id: donorId,
          name: form.nokName,
          surname: form.nokSurname,
          id_number_of_kin: form.nokIdNumber,
          
          // Next of kin address (we're using the single address field)
          address: {
            country: form.country, // Using donor address as default if not specified
            province: form.province,
            city: form.city,
            town: form.town,
            street: form.street,
            stand_no: form.standNumber,
            zip_code: ''
          },
          
          // Next of kin contact
          contact: {
            primary_number: form.nokPrimaryNumber,
            secondary_number: form.nokSecondaryNumber,
            telephone: '',
            email: form.nokEmail
          }
        };
        
        await axios.post('/api/next-of-kin', nokData);
      }
      
      // Reset form and show success
      setForm({
        name: '',
        surname: '',
        idNumber: '',
        primaryNumber: '',
        secondaryNumber: '',
        telephoneNumber: '',
        email: '',
        country: '',
        province: '',
        city: '',
        town: '',
        street: '',
        standNumber: '',
        nokName: '',
        nokSurname: '',
        nokIdNumber: '',
        nokAddress: '',
        nokPrimaryNumber: '',
        nokSecondaryNumber: '',
        nokEmail: '',
        bloodType: '',
      });
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 2000);
      
    } catch (err) {
      console.error('Error creating donor:', err);
      setError(err.response?.data?.error || 'Error creating donor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='flex justify-end w-full mt-10'>
        <button
          className='text-[#FF7171] font-inter font-semibold text-[20px] bg-[#FFE5E5] px-6 py-2 rounded'
          onClick={() => setShowForm(true)}
        >
          Add new donor
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div
            className="bg-white p-8 relative"
            style={{
              width: 698, borderRadius: 8,
              boxShadow: '0 2px 8px #0001', maxHeight: '90vh', overflowY: 'auto'
            }}
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-[#707070] text-2xl font-bold"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex flex-col items-center mb-6">
              <img
                src={new_donor_image} alt="New Donor Registration image"
                width={236} height={171} style={{ objectFit: 'contain' }}
              />
              <div
                className="font-inter font-semibold"
                style={{ fontSize: 28, color: '#707070', marginTop: 12 }}
              >
                New Donor Registration
              </div>
              <div
                className="font-inter font-medium text-center"
                style={{ fontSize: 20, color: '#707070', marginTop: 4 }}
              >
                Complete the form below to add a new donor.
              </div>
              {/* Dev Mode Autofill Button */}
              <button
                type="button"
                onClick={autofillDummyData}
                className="mt-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                title="For development use only - fills the form with random data"
              >
                DEV: Autofill Form
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Donor created successfully!
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Personal Details */}
              <div className="flex gap-4 mb-4">
                <div>
                  <label className="block font-inter font-medium mb-1" style={{ color: '#707070', fontSize: 20 }}>
                    Name<span style={{ color: '#F8312F' }}>*</span>
                  </label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    required placeholder="Enter first name" className="font-inter font-medium"
                    style={{
                      width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                      border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-inter font-medium mb-1" style={{ color: '#707070', fontSize: 20 }}>
                    Surname<span style={{ color: '#F8312F' }}>*</span>
                  </label>
                  <input
                    name="surname" value={form.surname} onChange={handleChange}
                    required placeholder="Enter last name" className="font-inter font-medium"
                    style={{
                      width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                      border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <div>
                  <label className="block font-inter font-medium mb-1" style={{ color: '#707070', fontSize: 20 }}>
                    ID number<span style={{ color: '#F8312F' }}>*</span>
                  </label>
                  <input
                    name="idNumber" value={form.idNumber} onChange={handleChange}
                    required placeholder="Enter ID number" className="font-inter font-medium"
                    style={{
                      width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                      border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-inter font-medium mb-1" style={{ color: '#707070', fontSize: 20 }}>
                    Blood Type<span style={{ color: '#F8312F' }}>*</span>
                  </label>
                  <select
                    name="bloodType" value={form.bloodType} onChange={handleChange}
                    required className="font-inter font-medium"
                    style={{
                      width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                      border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                    }}
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <div>
                  <label className="block font-inter font-medium mb-1" style={{ color: '#707070', fontSize: 20 }}>
                    Primary Number<span style={{ color: '#F8312F' }}>*</span>
                  </label>
                  <input
                    name="primaryNumber" value={form.primaryNumber} onChange={handleChange}
                    required placeholder="Enter primary number" className="font-inter font-medium"
                    style={{
                      width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                      border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-inter font-medium mb-1" style={{ color: '#707070', fontSize: 20 }}>
                    Secondary number
                  </label>
                  <input
                    name="secondaryNumber" value={form.secondaryNumber} onChange={handleChange}
                    placeholder="Enter secondary number" className="font-inter font-medium"
                    style={{
                      width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                      border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <div>
                  <label className="block font-inter font-medium mb-1" style={{ color: '#707070', fontSize: 20 }}>
                    Telephone number<span style={{ color: '#F8312F' }}>*</span>
                  </label>
                  <input
                    name="telephoneNumber" value={form.telephoneNumber} onChange={handleChange}
                    required placeholder="Enter telephone number" className="font-inter font-medium"
                    style={{
                      width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                      border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                    }}
                  />
                </div>
                <div>
                  <label className="block font-inter font-medium mb-1" style={{ color: '#707070', fontSize: 20 }}>
                    Email<span style={{ color: '#F8312F' }}>*</span>
                  </label>
                  <input
                    name="email" value={form.email} onChange={handleChange}
                    required placeholder="Enter email address" className="font-inter font-medium"
                    style={{
                      width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                      border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                    }}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="font-inter font-medium mb-2" style={{ color: '#707070', fontSize: 20 }}>
                Address
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  name="country" value={form.country} onChange={handleChange}
                  placeholder="Country" className="font-inter font-medium"
                  required
                  style={{
                    width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                    border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                  }}
                />
                <input
                  name="province" value={form.province} onChange={handleChange}
                  placeholder="Province" className="font-inter font-medium"
                  required
                  style={{
                    width: 291,height: 40,borderRadius: 6,background: '#D9D9D9',
                    border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}
                />
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  name="city" value={form.city} onChange={handleChange}
                  placeholder="City" className="font-inter font-medium"
                  required
                  style={{
                    width: 291,height: 40,borderRadius: 6,background: '#D9D9D9',
                    border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}
                />
                <input
                  name="town" value={form.town} onChange={handleChange}
                  placeholder="Town" className="font-inter font-medium"
                  style={{
                    width: 291,height: 40,borderRadius: 6,background: '#D9D9D9',
                    border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}
                />
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  name="street" value={form.street} onChange={handleChange}
                  placeholder="Street" className="font-inter font-medium"
                  required
                  style={{
                    width: 291,height: 40,borderRadius: 6,background: '#D9D9D9',
                    border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}
                />
                <input
                  name="standNumber" value={form.standNumber} onChange={handleChange}
                  placeholder="Stand Number" className="font-inter font-medium"
                  style={{
                    width: 291,height: 40,borderRadius: 6,background: '#D9D9D9',
                    border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}
                />
              </div>


              {/* Next of Kin */}
              <div className="font-inter font-medium mb-2" style={{ color: '#707070', fontSize: 20 }}>
                Next of Kin Details
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  name="nokName" value={form.nokName} onChange={handleChange}
                  placeholder="Name" className="font-inter font-medium"
                  style={{
                    width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                    border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                  }}
                />
                <input
                  name="nokSurname" value={form.nokSurname} onChange={handleChange}
                  placeholder="Surname" className="font-inter font-medium"
                  style={{
                    width: 291, height: 40, borderRadius: 6,
                    background: '#D9D9D9', border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                  }}
                />
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  name="nokIdNumber" value={form.nokIdNumber} onChange={handleChange}
                  placeholder="ID Number" className="font-inter font-medium"
                  style={{
                    width: 291, height: 40, borderRadius: 6,
                    background: '#D9D9D9', border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                  }}
                />
                <input
                  name="nokPrimaryNumber" value={form.nokPrimaryNumber}
                  onChange={handleChange} placeholder="Primary Number" className="font-inter font-medium"
                  style={{
                    width: 291, height: 40, borderRadius: 6,
                    background: '#D9D9D9', border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                  }}
                />
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  name="nokSecondaryNumber" value={form.nokSecondaryNumber}
                  onChange={handleChange} placeholder="Secondary Number" className="font-inter font-medium"
                  style={{
                    width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                    border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                  }}
                />
                <input name="nokEmail" value={form.nokEmail} onChange={handleChange} placeholder="Email" className="font-inter font-medium"
                  style={{width: 291,height: 40,borderRadius: 6,
                    background: '#D9D9D9',border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}/>
              </div>
              <div className="mb-4">
                <input name="nokAddress" value={form.nokAddress} onChange={handleChange} placeholder="Address"
                  className="font-inter font-medium"
                  style={{width: 600,height: 40,borderRadius: 6,
                    background: '#D9D9D9',border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}/>
              </div>

              <div className="flex justify-center mt-6">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: 137,height: 44,background: isSubmitting ? '#A0A0A0' : '#707070',color: '#FFFFFF',
                    borderRadius: 6,fontSize: 20,fontFamily: 'Inter',fontWeight: 500,border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}