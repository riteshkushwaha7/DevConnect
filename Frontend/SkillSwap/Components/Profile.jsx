// import React,{useState} from 'react'
// import EditProfileModal from './Editprofile';


  





// function Profile() {
//   const [showModal,setshowModal] = useState(false);
//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-gray-100">
//       {/* Header */}
//       {/* <header className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">SkillSwap</h1>
//         <div className="space-x-4">
//           <button className="bg-black text-white px-4 py-2 rounded-full text-sm">Edit Profile</button>
//           <button className="text-white text-sm">Manage Requests</button>
//           <button className="bg-black text-white px-4 py-2 rounded-full text-sm">Skill Offers</button>
//         </div>
//       </header> */}

//       {/* Main Content */}
//       <main className="flex flex-col items-center px-4 py-8">
//         {/* Profile Picture and Name */}
//         <img
//           src="https://randomuser.me/api/portraits/women/44.jpg"
//           alt="Profile"
//           className="w-32 h-32 rounded-full object-cover mb-4"
//         />
//         <h2 className="text-xl text-black font-bold">Alex Johnson</h2>
//         <p className="text-gray-800 mb-8">Location: San Francisco, CA</p>
//          <button
//             onClick={() => setshowModal(true)}
//             className="bg-black text-white px-4 py-2 rounded-full text-sm">
          
//             Edit/Create Profile
//           </button>

//         {/* Skills Sections */}
//         <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-4xl">
//           {/* Skills Offered */}
//           <div className="bg-gray-200 p-6 rounded-xl flex-1">
//             <h3 className="text-lg font-semibold mb-2">Skills Offered</h3>
//             <ul className="text-blue-800 space-y-1">
//               <li>Web Development</li>
//               <li>Graphic Design</li>
//               <li>Data Analysis</li>
//             </ul>
//           </div>

//           {/* Skills Sought */}
//           <div className="bg-gray-200 p-6 rounded-xl flex-1">
//             <h3 className="text-lg font-semibold mb-2">Skills Sought</h3>
//             <ul className="text-blue-800 space-y-1">
//               <li>Language Learning</li>
//               <li>Financial Planning</li>
//               <li>Photography</li>
//             </ul>
//           </div>
//         </div>
//       </main>

//       Footer
//       <footer className="bg-red-600 text-white text-center text-sm py-3">
//         © 2023 SkillSwap. All Rights Reserved.
//       </footer>

//        {showModal && <EditProfileModal onClose={() => setshowModal(false)} />}
//     </div>
//   );
// }


      
    
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProfileModal from './Editprofile';
import { useParams } from 'react-router-dom';

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState(null);

  const { email } = useParams();  // 👈 Get email from URL

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:3000/api/profile/user?email=${email}`)
        .then(res => {
          setProfile(res.data);
        })
        .catch(err => {
          console.error("Failed to fetch profile:", err);
        });
    }
  }, [email]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <main className="flex flex-col items-center px-4 py-8">
        <img
          src={profile?.imageUrl || "https://randomuser.me/api/portraits/lego/1.jpg"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h2 className="text-xl text-black font-bold">{profile?.name || "User Name"}</h2>
        <p className="text-gray-800 mb-4">Location: {profile?.location || "Unknown"}</p>
        <p className="text-gray-600 italic mb-8">{profile?.description || "No description provided."}</p>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded-full text-sm"
        >
          Edit/Create Profile
        </button>

        <div className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-4xl mt-6">
          <div className="bg-gray-200 p-6 rounded-xl flex-1">
            <h3 className="text-lg font-semibold mb-2">Skills Offered</h3>
            {profile?.skillsOffered?.length ? (
              <ul className="text-blue-800 space-y-1">
                {profile.skillsOffered.map((skill, index) => (
                  <li key={index}>{skill.replaceAll("_", " ")}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No skills added yet.</p>
            )}
          </div>

          <div className="bg-gray-200 p-6 rounded-xl flex-1">
            <h3 className="text-lg font-semibold mb-2">Skills Wanted</h3>
            {profile?.skillsWanted?.length ? (
              <ul className="text-blue-800 space-y-1">
                {profile.skillsWanted.map((skill, index) => (
                  <li key={index}>{skill.replaceAll("_", " ")}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No skills requested yet.</p>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-red-600 text-white text-center text-sm py-3">
        © 2025 SkillSwap. All Rights Reserved.
      </footer>

      {showModal && <EditProfileModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Profile;

