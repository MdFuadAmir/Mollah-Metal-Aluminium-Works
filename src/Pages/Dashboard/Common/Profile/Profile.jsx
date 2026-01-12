import { useState } from "react";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [profile, setProfile] = useState({
    name: "Mahfuzur Rahman",
    email: "user@mmaw.com",
    phone: "017xxxxxxxx",
    address: "Dhaka, Bangladesh",
    city: "Dhaka",
    postCode: "1207",
    photo: "https://i.pravatar.cc/150",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    console.log(e);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        photo: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="max-w-6xl mx-auto bg-gray-950/60 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-4">
        {/* Sidebar */}
        <div className="col-span-1 p-6 md:border-r">
          <div className="flex flex-col items-center">
            <img
              src={profile.photo}
              alt="profile"
              className="w-24 h-24 rounded-full mb-3 object-cover p-1 border-2 border-green-500"
            />

            {isEdit && (
              <label className="text-xs cursor-pointer text-blue-500">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            )}

            <h2 className="font-semibold text-lg mt-2 text-center">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-400">{profile.email}</p>
          </div>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="font-medium text-blue-600 cursor-pointer">
              Personal Information
            </li>
            {/* ✅ Edit Button */}
            <li>
              <button
                onClick={() => setIsEdit(true)}
                className="mt-2 w-full px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700"
              >
                Edit Profile
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-span-3 p-6">
          <h3 className="text-2xl font-semibold mb-6">Profile Information</h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                disabled={!isEdit}
                value={profile.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md disabled:bg-gray-800"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                disabled={!isEdit}
                value={profile.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md disabled:bg-gray-800"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full mt-1 p-2 border rounded-md bg-gray-800 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-sm font-medium">City</label>
              <input
                type="text"
                name="city"
                disabled={!isEdit}
                value={profile.city}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md disabled:bg-gray-800"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Address</label>
              <textarea
                name="address"
                disabled={!isEdit}
                value={profile.address}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md disabled:bg-gray-800"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Post Code</label>
              <input
                type="text"
                name="postCode"
                disabled={!isEdit}
                value={profile.postCode}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md disabled:bg-gray-800"
              />
            </div>

            {isEdit && (
              <div className="md:col-span-2 mt-4 flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="px-6 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
