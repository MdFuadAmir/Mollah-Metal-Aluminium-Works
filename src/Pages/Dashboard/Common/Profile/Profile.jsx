import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import useAxios from "../../../../Hooks/useAxios";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  // ===== GET PROFILE =====
  const { data: profile ,isLoading} = useQuery({
  queryKey: ["profile", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const { data } = await axiosPublic.get("/users/profile", {
      params: { email: user.email }
    });
    return data;
  },
});

  console.log(profile);
  // ===== image uploading =====
  const handleUploadeImage = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setPhotoURL(res?.data?.data?.display_url);
    setUploading(false);
  };
  // ===== SET DEFAULT VALUES =====
  useEffect(() => {
    if (profile) {
      reset({
        name: profile?.name || user?.displayName || "",
        email: profile?.email || user?.email || "",
        phone: profile?.phone || "",
        city: profile?.city || "",
        postCode: profile?.postCode || "",
        address: profile?.address || "",
        photoURL: profile?.photoURL || user?.photoURL,
      });
    }
  }, [profile, user, reset]);

  // ===== SUBMIT =====
  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        photoURL: photoURL || profile?.photoURL || user?.photoURL,
      };
      await axiosPublic.put("/users/profile", payload);
      toast.success("Profile updated successfully");
      setIsEdit(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen p-6 md:p-8 text-white">
      <div className="max-w-6xl mx-auto bg-gray-950/60 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-4 p-6">
        {/* sidebar */}
        <div className="col-span-1 flex flex-col items-center md:border-r-2 p-2">
          <img
            src={
              profile?.photoURL
                ? profile?.photoURL
                : user?.photoURL
                  ? user?.photoURL
                  : "N/A"
            }
            alt="photo"
            className="w-24 h-24 rounded-full border-2 border-green-500 p-1"
          />

          {isEdit && (
            <label className="text-xs cursor-pointer text-blue-500 mt-1">
              Change Photo
              <input type="file" hidden onChange={handleUploadeImage} />
            </label>
          )}
          <div className="mt-4 text-center">
            <h1 className="text-lg font-bold">
              {profile?.displayName
                ? profile?.displayName
                : user?.displayName
                  ? user?.displayName
                  : "N/A"}
            </h1>
            <p className="text-gray-500">{profile?.email}</p>
          </div>
          <button
            onClick={() => {
              setIsEdit(true);
            }}
            className="w-full px-4 py-2 rounded-lg mt-6 bg-gray-800 hover:bg-gray-700 duration-300"
          >
            Edit Profile
          </button>
        </div>
        {/* main content */}
        <div className="col-span-3 p-6">
          <h3 className="text-2xl font-semibold mb-6">Profile Information</h3>
          {/* ========== form ======== */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                {...register("name")}
                disabled={!isEdit}
                className="w-full mt-1 p-2 border rounded-md disabled:bg-gray-800"
              />
            </div>
            {/* email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="text"
                {...register("email")}
                disabled
                className="w-full cursor-not-allowed mt-1 p-2 border rounded-md disabled:bg-gray-800"
              />
            </div>
            {/* phone */}
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                type="text"
                {...register("phone")}
                disabled={!isEdit}
                className="w-full mt-1 p-2 border rounded-md disabled:bg-gray-800"
              />
            </div>
            {/* city */}
            <div>
              <label className="text-sm font-medium">City</label>
              <input
                type="text"
                {...register("city")}
                disabled={!isEdit}
                className="w-full mt-1 p-2 border rounded-md disabled:bg-gray-800"
              />
            </div>
            {/* postCode */}
            <div>
              <label className="text-sm font-medium">PostCode</label>
              <input
                type="text"
                {...register("postCode")}
                disabled={!isEdit}
                className="w-full mt-1 p-2 border rounded-md disabled:bg-gray-800"
              />
            </div>
            {/* address */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Full Address</label>
              <input
                type="text"
                {...register("address")}
                disabled={!isEdit}
                className="w-full mt-1 p-2 border rounded-md disabled:bg-gray-800 overflow-scroll"
              />
            </div>
            {/* saved & cancled btn */}
            {isEdit && (
              <div className="md:col-span-2 mt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={uploading || isSubmitting}
                  className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500"
                >
                  {uploading ? (
                    <p className="animate-bounce">Uploading..</p>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    reset();
                    setIsEdit(false);
                  }}
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
