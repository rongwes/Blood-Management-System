import React, { useState } from 'react';
import new_donor_image from '../../assets/new_donor_image.png';

export default function NewDonors() {
  const [showForm, setShowForm] = useState(false);
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
    nokAddress: '',
    nokPrimaryNumber: '',
    nokSecondaryNumber: '',
    nokEmail: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Will be replaced with API endpoint
    await fetch('/api/donors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setShowForm(false);
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
            </div>
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
              </div>
              <div className="flex gap-4 mb-4">
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
              </div>
              <div className="mb-4">
                <label className="block font-inter font-medium mb-1" style={{ color: '#707070', fontSize: 20 }}>
                  Email<span style={{ color: '#F8312F' }}>*</span>
                </label>
                <input
                  name="email" value={form.email} onChange={handleChange}
                  required placeholder="Enter email address" className="font-inter font-medium"
                  style={{
                    width: 631,height: 40,borderRadius: 6, background: '#D9D9D9', border: 'none',
                    paddingLeft: 12, fontSize: 18, color: '#707070',
                  }}
                />
              </div>

              {/* Address */}
              <div className="font-inter font-medium mb-2" style={{ color: '#707070', fontSize: 20 }}>
                Address
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  name="country" value={form.country} onChange={handleChange}
                  placeholder="Country" className="font-inter font-medium"
                  style={{
                    width: 291, height: 40, borderRadius: 6, background: '#D9D9D9',
                    border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                  }}
                />
                <input
                  name="province" value={form.province} onChange={handleChange}
                  placeholder="Province" className="font-inter font-medium"
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
                    width: 291,height: 40,borderRadius: 6,background: '#D9D9D9',
                    border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}
                />
                <input
                  name="nokSurname" value={form.nokSurname} onChange={handleChange}
                  placeholder="Surname" className="font-inter font-medium"
                  style={{
                    width: 291,height: 40,borderRadius: 6,
                    background: '#D9D9D9',border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}
                />
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  name="nokIdNumber" value={form.nokIdNumber} onChange={handleChange}
                  placeholder="ID Number" className="font-inter font-medium"
                  style={{
                    width: 291,height: 40,borderRadius: 6,
                    background: '#D9D9D9',  border: 'none', paddingLeft: 12, fontSize: 18, color: '#707070',
                  }}
                />
                <input
                  name="nokPrimaryNumber" value={form.nokPrimaryNumber}
                  onChange={handleChange} placeholder="Primary Number" className="font-inter font-medium"
                  style={{
                    width: 291,height: 40,borderRadius: 6,
                    background: '#D9D9D9',border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}
                />
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  name="nokSecondaryNumber" value={form.nokSecondaryNumber}
                  onChange={handleChange} placeholder="Secondary Number" className="font-inter font-medium"
                  style={{
                    width: 291,height: 40,borderRadius: 6,background: '#D9D9D9',
                    border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
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
                  style={{width: 631,height: 40,borderRadius: 6,
                    background: '#D9D9D9',border: 'none',paddingLeft: 12,fontSize: 18,color: '#707070',
                  }}/>
              </div>
              <div className="flex justify-center mt-6">
                <button type="submit"
                  style={{width: 137,height: 44,background: '#707070',color: '#FFFFFF',
                    borderRadius: 6,fontSize: 20,fontFamily: 'Inter',fontWeight: 500,border: 'none',
                    }}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}