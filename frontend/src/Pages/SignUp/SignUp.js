import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../ui/alert";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    address: "",
    gender: "",
    numberOfMembers: 0,
    // House details
    numberOfRooms: "",
    squareFootage: "",
    numberOfAC: "",
    numberOfGeysers: "",
    otherAppliances: [],
  });

  const [familyMembers, setFamilyMembers] = useState([]);
  const [newAppliance, setNewAppliance] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Previous handlers remain the same
  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (name === "numberOfMembers") {
      const num = parseInt(value) || 0;
      setFamilyMembers((prev) => {
        if (num > prev.length) {
          return [
            ...prev,
            ...Array(num - prev.length)
              .fill()
              .map(() => ({
                name: "",
                age: "",
                gender: "",
              })),
          ];
        }
        return prev.slice(0, num);
      });
    }
  };

  const handleFamilyMemberChange = (index, field, value) => {
    setFamilyMembers((prev) => {
      const newMembers = [...prev];
      newMembers[index] = {
        ...newMembers[index],
        [field]: value,
      };
      return newMembers;
    });
  };

  const handleAddAppliance = () => {
    if (newAppliance.trim()) {
      setFormData((prev) => ({
        ...prev,
        otherAppliances: [...prev.otherAppliances, newAppliance.trim()],
      }));
      setNewAppliance("");
    }
  };

  const handleRemoveAppliance = (index) => {
    setFormData((prev) => ({
      ...prev,
      otherAppliances: prev.otherAppliances.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.age) newErrors.age = "Age is required";
    else if (formData.age < 0 || formData.age > 120)
      newErrors.age = "Invalid age";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    // House details validation
    if (!formData.numberOfRooms)
      newErrors.numberOfRooms = "Number of rooms is required";
    if (!formData.squareFootage)
      newErrors.squareFootage = "Square footage is required";
    if (formData.squareFootage < 0)
      newErrors.squareFootage = "Invalid square footage";
    if (formData.numberOfAC < 0) newErrors.numberOfAC = "Invalid number of ACs";
    if (formData.numberOfGeysers < 0)
      newErrors.numberOfGeysers = "Invalid number of geysers";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", { ...formData, familyMembers });
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Family Registration Form</h2>

        {/* Previous form sections remain the same */}
        {/* Primary Member Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.age && (
              <span className="text-red-500 text-sm">{errors.age}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm">{errors.gender}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Family Members
          </label>
          <input
            type="number"
            name="numberOfMembers"
            value={formData.numberOfMembers}
            onChange={handleInputChange}
            min="0"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Family Members Section */}
        {familyMembers.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Family Members</h3>
            {familyMembers.map((member, index) => (
              <div key={index} className="p-4 border rounded space-y-4">
                <h4 className="font-medium">Member {index + 1}</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) =>
                        handleFamilyMemberChange(index, "name", e.target.value)
                      }
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      value={member.age}
                      onChange={(e) =>
                        handleFamilyMemberChange(index, "age", e.target.value)
                      }
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Gender
                    </label>
                    <select
                      value={member.gender}
                      onChange={(e) =>
                        handleFamilyMemberChange(
                          index,
                          "gender",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New House Details Section */}
        <div className="space-y-6 border-t pt-6">
          <h3 className="text-lg font-semibold">House Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Rooms
              </label>
              <input
                type="number"
                name="numberOfRooms"
                value={formData.numberOfRooms}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.numberOfRooms && (
                <span className="text-red-500 text-sm">
                  {errors.numberOfRooms}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Square Footage
              </label>
              <input
                type="number"
                name="squareFootage"
                value={formData.squareFootage}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.squareFootage && (
                <span className="text-red-500 text-sm">
                  {errors.squareFootage}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Number of ACs
              </label>
              <input
                type="number"
                name="numberOfAC"
                value={formData.numberOfAC}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.numberOfAC && (
                <span className="text-red-500 text-sm">
                  {errors.numberOfAC}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Geysers
              </label>
              <input
                type="number"
                name="numberOfGeysers"
                value={formData.numberOfGeysers}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {errors.numberOfGeysers && (
                <span className="text-red-500 text-sm">
                  {errors.numberOfGeysers}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Other Major Appliances
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newAppliance}
                onChange={(e) => setNewAppliance(e.target.value)}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter appliance name"
              />
              <button
                type="button"
                onClick={handleAddAppliance}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>

            {formData.otherAppliances.length > 0 && (
              <div className="mt-2 space-y-2">
                {formData.otherAppliances.map((appliance, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                  >
                    <span>{appliance}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAppliance(index)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Submit Registration
        </button>
      </form>

      {submitted && (
        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Registration submitted successfully!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RegistrationForm;
