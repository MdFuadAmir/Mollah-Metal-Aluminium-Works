import { useForm, useWatch } from "react-hook-form";
import AddProductForm from "./AddProductForm";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [productImages, setProductImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const selectedCategory = useWatch({ control, name: "category" });

  const handleMultiImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (productImages.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    setUploading(true);
    const uploadedImages = [];
    for (let file of files) {
      const fd = new FormData();
      fd.append("image", file);
      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(url, fd);
      uploadedImages.push(res.data.data.display_url);
    }
    const finalList = [...productImages, ...uploadedImages];
    setProductImages(finalList);
    setValue("images", finalList, { shouldValidate: true });
    setUploading(false);
  };

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      rating: 0,
    };
    const res = await axiosSecure.post(`/products`, finalData);
    if (res.data.insertedId) {
      toast.success("Product add successfully !");
      reset();
      setProductImages([]);
      setValue("images", []);
    }
  };

  return (
    <div className="text-gray-300 py-12">
      <AddProductForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        uploading={uploading}
        productImages={productImages}
        handleMultiImageUpload={handleMultiImageUpload}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default AddProducts;
