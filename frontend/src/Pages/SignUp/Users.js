import React, { useState } from "react";
import { Plus, Pencil } from "lucide-react";

const UsersScreen = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John", color: "bg-red-500" },
    { id: 2, name: "Sarah", color: "bg-blue-500" },
    { id: 3, name: "Kids", color: "bg-green-500" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const addUser = () => {
    if (newUserName.trim() && users.length < 5) {
      const colors = [
        "bg-purple-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-orange-500",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      setUsers([
        ...users,
        {
          id: users.length + 1,
          name: newUserName,
          color: randomColor,
        },
      ]);
      setNewUserName("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Who's watching?</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Pencil size={16} />
              {isEditing ? "Done" : "Manage Profiles"}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {users.map((user) => (
            <div key={user.id} className="text-center">
              <div className="group relative">
                {isEditing && (
                  <button
                    className="absolute -top-2 -right-2 z-10 bg-white text-black rounded-full p-1 
                             opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() =>
                      setUsers(users.filter((u) => u.id !== user.id))
                    }
                  >
                    ✕
                  </button>
                )}
                <div
                  className={`w-32 h-32 rounded-lg ${
                    user.color
                  } mx-auto mb-2 flex items-center 
                            justify-center text-3xl font-bold cursor-pointer transition-transform 
                            ${isEditing ? "opacity-50" : "hover:scale-110"}`}
                >
                  {getInitials(user.name)}
                </div>
                <p className="text-gray-400 group-hover:text-white transition-colors">
                  {user.name}
                </p>
              </div>
            </div>
          ))}

          {users.length < 5 && (
            <div className="text-center">
              <div className="group relative">
                {isEditing ? (
                  <div className="space-y-2">
                    <div
                      className="w-32 h-32 rounded-lg bg-gray-800 mx-auto mb-2 flex items-center 
                                  justify-center cursor-pointer border-2 border-dashed border-gray-600"
                    >
                      <Plus size={40} className="text-gray-600" />
                    </div>
                    <input
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="Name"
                      className="w-32 bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 
                               text-center focus:outline-none focus:border-gray-400"
                      maxLength={20}
                    />
                    <button
                      onClick={addUser}
                      className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700 
                               transition-colors text-sm"
                    >
                      Add Profile
                    </button>
                  </div>
                ) : (
                  <div
                    className="w-32 h-32 rounded-lg bg-gray-800 mx-auto mb-2 flex items-center 
                              justify-center cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => setIsEditing(true)}
                  >
                    <Plus size={40} className="text-gray-400" />
                  </div>
                )}
                {!isEditing && <p className="text-gray-400">Add Profile</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersScreen;
