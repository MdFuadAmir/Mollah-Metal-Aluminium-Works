import { useState } from "react";
import toast from "react-hot-toast";
import { IoStar } from "react-icons/io5";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ReviewModal = ({ order, onClose, onSubmitted }) => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState(
    order.cartItems.map((item) => ({
      productId: item.productDetails._id,
      productName: item.productDetails.productName,
      rating: 0,
      comment: "",
    })),
  );

  const handleChange = (index, field, value) => {
    const updated = [...reviews];
    updated[index][field] = value;
    setReviews(updated);
  };

  const handleSubmit = async () => {
    try {
      await axiosSecure.post("/reviews", {
        orderId: order._id,
        userEmail: order.userEmail || order.email,
        reviews,
      });
      toast.success("Reviews submitted successfully");
      onSubmitted();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit reviews");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
        {reviews.map((item, idx) => (
          <div key={item.productId} className="mb-4">
            <h3 className="font-semibold">{item.productName}</h3>
            <div className="flex items-center gap-1 mt-1">
              <span>Rating: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`px-2 py-1 rounded ${
                    item.rating >= star ? "text-yellow-500" : ""
                  }`}
                  onClick={() => handleChange(idx, "rating", star)}
                >
                  <IoStar />
                </button>
              ))}
            </div>
            <textarea
              value={item.comment}
              onChange={(e) => handleChange(idx, "comment", e.target.value)}
              placeholder="Write a comment..."
              className="w-full mt-2 p-2 bg-gray-800 text-white rounded"
            />
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
