import React, { useEffect, useState } from 'react';

export default function RequestResponsesPage() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // 👇 Replace this with actual backend call later
    const mockResponses = [
      {
        name: 'Ravi Sharma',
        location: 'Delhi, India',
        skillsOffered: ['web_development', 'content_writing'],
      },
      {
        name: 'Sara Lee',
        location: 'London, UK',
        skillsOffered: ['video_editing', 'graphic_design'],
      },
      {
        name: 'Rahul Singh',
        location: 'Bangalore, India',
        skillsOffered: ['app_development', 'seo_expert'],
      },
    ];
    setResponses(mockResponses);
  }, []);

  const handleAssign = (userName) => {
    alert(`You assigned the work to ${userName}`);
    // TODO: Replace with API call to assign task
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Responses to Your Request</h1>

      {responses.length === 0 ? (
        <p className="text-center text-gray-500">No one has accepted your request yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {responses.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-4">📍 {user.location}</p>

                <div>
                  <p className="text-gray-700 font-medium mb-2">Skills Offered:</p>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {user.skillsOffered?.map((skill, i) => (
                      <li
                        key={i}
                        className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full capitalize"
                      >
                        {skill.replaceAll('_', ' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => handleAssign(user.name)}
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Assign Work
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

