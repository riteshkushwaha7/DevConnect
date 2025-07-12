// // src/components/EditProfileModal.js
// import React from "react";

//  function EditProfileModal({ onClose }) {

//     const skillList=[
//           'web_development', 'graphic_design', 'video_editing', 'content_writing', 'digital_marketing',
//   'photography', 'public_speaking', 'data_analysis', 'ui_ux_design', 'app_development',
//   'language_translation', 'music_production', 'cooking', 'fitness_training', 'yoga',
//   'painting', 'handicraft', 'seo_expert', 'career_counseling', 'financial_planning'
//     ]
//   return (
// <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
//   <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-5xl overflow-y-auto max-h-[95vh]">

//         <h2 className="text-xl font-bold mb-4">Edit / Create Profile</h2>
//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
//             <input type="file" className="w-full text-black-500" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//             <input type="text" className=" text-blue-400 w-full px-3 py-2 border-red-400 border rounded-md" placeholder="Enter name" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//             <input type="text" className=" text-blue-400 w-full px-3 py-2 border border-red-400 rounded-md" placeholder="Enter location" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input type="password" className=" text-blue-400 w-full px-3 py-2 border border-red-400 rounded-md" placeholder="Enter password" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-black mb-1">Public Profile</label>
            

//              <div className="space-y-4">
//       <div className="flex items-center">
//         <input
          
//           checked
//           id="disabled-radio-yes"
//           type="radio"
//           name="disabled-radio"
//           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//         />
//         <label
//           htmlFor="disabled-radio-yes"
//           className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
//         >
//           Yes (Disabled)
//         </label>
//       </div>
//       <div className="flex items-center">
//         <input
          
//           id="disabled-radio-no"
//           type="radio"
//           name="disabled-radio"
//           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//         />
//         <label
//           htmlFor="disabled-radio-no"
//           className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
//         >
//           No (Disabled)
//         </label>
//       </div>
//     </div>

//     //Drop down to select skills offered and skills wanted
    

//     <div className="max-h-40 overflow-y-auto border rounded-md p-3 bg-white">
//   {skillList &&
//     skillList.map((skill) => (
//       <div key={skill} className="flex items-center mb-2">
//         <input
//           type="checkbox"
//           value={skill}
//           className="mr-2 accent-red-600"
//         />
//         <label className="text-sm font-medium text-blue-600">
//           {skill.replaceAll("_", " ")}
//         </label>
//       </div>
//     ))}
// </div>

// //skills wanted 
// <div className="max-h-40 overflow-y-auto border rounded-md p-3 bg-white">
//   {skillList &&
//     skillList.map((skill) => (
//       <div key={skill} className="flex items-center mb-2">
//         <input
//           type="checkbox"
//           value={skill}
//           className="mr-2 accent-red-600"
//         />
//         <label className="text-sm font-medium text-blue-600">
//           {skill.replaceAll("_", " ")}
//         </label>
//       </div>
//     ))}
// </div>

           
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               className="bg-red-600 text-white px-4 py-2 rounded-md"
//               onClick={onClose}
//             >
//               Save & Close
//             </button>
//           </div>
//         </form>



//       </div>
//     </div>
//   );
// }

// export default EditProfileModal;




// src/components/EditProfileModal.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditProfileModal({ onClose }) {
  const [formData, setFormData] = useState({
    email:"",
    name: "",
    location: "",
    password: "",
    isPublic: "yes",
    description: "",
    availability: "weekdays",
    skillsOffered: [],
    skillsWanted: [],
  });

  const [profileImage, setProfileImage] = useState(null);
  const userEmail = localStorage.getItem("email");

  const skillList = [
    'web_development', 'graphic_design', 'video_editing', 'content_writing', 'digital_marketing',
    'photography', 'public_speaking', 'data_analysis', 'ui_ux_design', 'app_development',
    'language_translation', 'music_production', 'cooking', 'fitness_training', 'yoga',
    'painting', 'handicraft', 'seo_expert', 'career_counseling', 'financial_planning'
  ];

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:3000/api/profile?email=${userEmail}`)
        .then((res) => {
          if (res.data) {
            const profile = res.data;
            setFormData({
              name: profile.name || "",
              location: profile.location || "",
              password: "",
              isPublic: profile.isPublic ? "yes" : "no",
              description: profile.description || "",
              availability: profile.availability || "weekdays",
              skillsOffered: profile.skillsOffered || [],
              skillsWanted: profile.skillsWanted || [],
            });
          }
        })
        .catch((err) => console.error("Profile fetch failed:", err));
    }
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const field = name;
      const updatedSkills = checked
        ? [...formData[field], value]
        : formData[field].filter((s) => s !== value);
      setFormData((prev) => ({ ...prev, [field]: updatedSkills }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:3000/api/profile/update", {
        email: userEmail,
        ...formData,
      });
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Update failed", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-5xl overflow-y-auto max-h-[95vh]">
        <h2 className="text-xl font-bold mb-4">Edit / Create Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input type="file" className="w-full" onChange={(e) => setProfileImage(e.target.files[0])} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="text-blue-400 w-full px-3 py-2 border-red-400 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="text-blue-400 w-full px-3 py-2 border-red-400 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="text-blue-400 w-full px-3 py-2 border-red-400 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="text-blue-400 w-full px-3 py-2 border-red-400 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="text-blue-400 w-full px-3 py-2 border-red-400 border rounded-md" placeholder="Tell something about yourself..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Public Profile</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-black">
                <input type="radio" name="isPublic" value="yes" checked={formData.isPublic === "yes"} onChange={handleChange} className="accent-red-600" />
                Yes
              </label>
              
              <label className="flex items-center gap-2 text-black">
                <input type="radio" name="isPublic" value="no" checked={formData.isPublic === "no"} onChange={handleChange} className="accent-red-600" />
                No
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Availability</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-black">
                <input type="radio" name="availability" value="weekdays" checked={formData.availability === "weekdays"} onChange={handleChange} className="accent-red-600" />
                Weekdays
              </label>
              <label className="flex items-center gap-2 text-black">
                <input type="radio" name="availability" value="weekend" checked={formData.availability === "weekend"} onChange={handleChange} className="accent-red-600" />
                Weekend
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Skills Offered</h3>
              <div className="max-h-40 overflow-y-auto border rounded-md p-3 bg-white">
                {skillList.map((skill) => (
                  <div key={skill} className="flex items-center mb-2">
                    <input type="checkbox" name="skillsOffered" value={skill} checked={formData.skillsOffered.includes(skill)} onChange={handleChange} className="mr-2 accent-red-600" />
                    <label className="text-sm font-medium text-blue-600">{skill.replaceAll("_", " ")}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Skills Wanted</h3>
              <div className="max-h-40 overflow-y-auto border rounded-md p-3 bg-white">
                {skillList.map((skill) => (
                  <div key={skill} className="flex items-center mb-2">
                    <input type="checkbox" name="skillsWanted" value={skill} checked={formData.skillsWanted.includes(skill)} onChange={handleChange} className="mr-2 accent-red-600" />
                    <label className="text-sm font-medium text-blue-600">{skill.replaceAll("_", " ")}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md">Save & Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

