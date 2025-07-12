import React, { useEffect, useState } from 'react';

export default function SkillRequestsPage() {
  const [skillRequests, setSkillRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Hardcoded mock data
    const mockData = [
      {
        _id: '1',
        name: 'Alex Johnson',
        location: 'San Francisco, CA',
        skillsWanted: ['web_development', 'public_speaking', 'seo_expert'],
      },
      {
        _id: '2',
        name: 'Meera Patel',
        location: 'Mumbai, India',
        skillsWanted: ['graphic_design', 'ui_ux_design'],
      },
      {
        _id: '3',
        name: 'John Doe',
        location: 'New York, USA',
        skillsWanted: ['language_translation', 'cooking', 'financial_planning'],
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setSkillRequests(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAccept = (requestId) => {
    alert(`You accepted the request from ${requestId}`);
    // TODO: Backend logic if needed later
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Skill Requests</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : skillRequests.length === 0 ? (
        <p className="text-center text-gray-500">No skill requests found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{request.name}</h2>
                <p className="text-gray-600 mb-4">📍 {request.location}</p>

                <div>
                  <p className="text-gray-700 font-medium mb-2">Requested Skills:</p>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {request.skillsWanted.map((skill, i) => (
                      <li
                        key={i}
                        className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full capitalize"
                      >
                        {skill.replaceAll('_', ' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => handleAccept(request.name)}
                className="mt-auto bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
