import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { userSchema } from "../utils/validationSchema";
import { getProfileImageUrl } from "../utils/helpers";

/**
 * UserForm - Reusable form for both Add User and Edit User pages
 * Uses React Hook Form + Yup for validation
 */
const UserForm = ({ onSubmit, defaultValues = {}, loading = false }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      gender: "",
      status: "",
      location: "",
      ...defaultValues,
    },
  });

  // Reset form when defaultValues change (edit mode)
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
    // Set existing profile image preview
    if (defaultValues?.profileImage) {
      setPreviewImage(getProfileImageUrl(defaultValues.profileImage));
    }
  }, [defaultValues, reset]);

  // Handle profile image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Build FormData and delegate to parent
  const handleFormSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined && val !== null) formData.append(key, val);
    });
    if (fileInputRef.current?.files[0]) {
      formData.append("profileImage", fileInputRef.current.files[0]);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      {/* Profile Image Preview */}
      <div className="flex justify-center mb-6">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer relative"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-gray-300 hover:border-primary transition-colors">
            {previewImage ? (
              <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            )}
          </div>
          {/* Camera overlay icon */}
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* First Name */}
        <div>
          <label className="form-label">First name</label>
          <input
            type="text"
            placeholder="Enter FirstName"
            className={`input-field ${errors.firstName ? "border-red-400" : ""}`}
            {...register("firstName")}
          />
          {errors.firstName && <p className="error-msg">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="form-label">Last Name</label>
          <input
            type="text"
            placeholder="Enter LastName"
            className={`input-field ${errors.lastName ? "border-red-400" : ""}`}
            {...register("lastName")}
          />
          {errors.lastName && <p className="error-msg">{errors.lastName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="form-label">Email address</label>
          <input
            type="email"
            placeholder="Enter Email"
            className={`input-field ${errors.email ? "border-red-400" : ""}`}
            {...register("email")}
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label className="form-label">Mobile</label>
          <input
            type="text"
            placeholder="Enter Mobile"
            maxLength={10}
            className={`input-field ${errors.mobile ? "border-red-400" : ""}`}
            {...register("mobile")}
          />
          {errors.mobile && <p className="error-msg">{errors.mobile.message}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="form-label">Select Your Gender</label>
          <div className="flex gap-6 mt-1">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input
                type="radio"
                value="Male"
                className="accent-primary"
                {...register("gender")}
              />
              Male
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input
                type="radio"
                value="Female"
                className="accent-primary"
                {...register("gender")}
              />
              Female
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input
                type="radio"
                value="Other"
                className="accent-primary"
                {...register("gender")}
              />
              Other
            </label>
          </div>
          {errors.gender && <p className="error-msg">{errors.gender.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="form-label">Select Your Status</label>
          <select
            className={`input-field ${errors.status ? "border-red-400" : ""}`}
            {...register("status")}
          >
            <option value="">Select...</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && <p className="error-msg">{errors.status.message}</p>}
        </div>

        {/* Profile Image File Input (visible) */}
        <div>
          <label className="form-label">Select Your Profile</label>
          <div className="flex items-center">
            <label className="cursor-pointer">
              <span className="btn-secondary text-xs py-1.5 px-3 rounded border border-gray-300 font-normal">
                Choose file
              </span>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <span className="ml-3 text-sm text-gray-500">
              {fileInputRef.current?.files?.[0]?.name || "No file chosen"}
            </span>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="form-label">Enter Your Location</label>
          <input
            type="text"
            placeholder="Enter Your Location"
            className="input-field"
            {...register("location")}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 text-base flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
        <button
          type="button"
          onClick={() => navigate("/users")}
          className="w-full btn-secondary py-3 text-base mt-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
