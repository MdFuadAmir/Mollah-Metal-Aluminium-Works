const products = [
  {
    name: "Aluminium Hari",
    price: "৳ 1,200",
    category: "Kitchen Utensil",
    img: "https://images.unsplash.com/photo-1606813909021-7c06aee8b7c2",
  },
  {
    name: "Aluminium Dhama",
    price: "৳ 950",
    category: "Cooking Pot",
    img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
  },
  {
    name: "Toy Hari",
    price: "৳ 800",
    category: "Traditional",
    img: "https://images.unsplash.com/photo-1586201375754-1421eec1b90c",
  },
  {
    name: "Korai with Dhakna",
    price: "৳ 1,500",
    category: "Premium",
    img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
  },
  {
    name: "Custom Aluminium Korai",
    price: "Custom Price",
    category: "Custom Order",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba",
  },
  {
    name: "Hari Dhakna",
    price: "৳ 300",
    category: "Accessory",
    img: "https://images.unsplash.com/photo-1604908177522-040f95f37d7c",
  },
];

const Products = () => {
  return (
    <div className="py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white">
          MMAW Products
        </h2>
        <p className="text-gray-300 mt-2">
          Factory direct aluminium kitchen utensils
        </p>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-black/50 rounded-xl overflow-hidden shadow-md hover:shadow-orange-500/30 transition"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <span className="text-xs text-orange-400 uppercase">
                {product.category}
              </span>
              <h3 className="text-lg font-semibold text-white mt-1">
                {product.name}
              </h3>
              <p className="text-gray-300 mt-2">
                {product.price}
              </p>

              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 transition text-black font-semibold py-2 rounded">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
