import { useState } from "react";
import { FaReceipt } from "react-icons/fa";

const receiptsData = [
  {
    id: "RCPT-1001",
    product: "অ্যালুমিনিয়াম হাঁড়ি",
    qty: 5,
    total: 5200,
    date: "2026-01-10",
  },
  {
    id: "RCPT-1002",
    product: "কড়াই ঢাকনা",
    qty: 8,
    total: 6400,
    date: "2026-01-11",
  },
  {
    id: "RCPT-1003",
    product: "ধামা",
    qty: 10,
    total: 7800,
    date: "2026-01-11",
  },
  {
    id: "RCPT-1004",
    product: "টয় হাঁড়ি",
    qty: 6,
    total: 4600,
    date: "2026-01-12",
  },
  {
    id: "RCPT-1005",
    product: "ঘোড়া",
    qty: 3,
    total: 3900,
    date: "2026-01-12",
  },
];

const AllVautchers = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const filteredReceipts = selectedDate
    ? receiptsData.filter((r) => r.date === selectedDate)
    : receiptsData.slice(0, 5); // default 5 receipts

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">
        বিক্রয় রসিদ (Receipts)
      </h2>

      {/* Date Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-black/40 border border-gray-600 rounded px-4 py-2 text-gray-300"
        />
        {selectedDate && (
          <button
            onClick={() => setSelectedDate("")}
            className="bg-red-600 px-4 py-2 rounded text-sm"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Receipt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReceipts.length > 0 ? (
          filteredReceipts.map((r) => (
            <div
              key={r.id}
              className="bg-black/50 p-5 rounded-xl shadow space-y-2"
            >
              <div className="flex items-center gap-2 text-orange-400 mb-2">
                <FaReceipt />
                <h3 className="font-semibold">{r.id}</h3>
              </div>

              <p className="text-gray-300 text-sm">
                <span className="font-semibold">পণ্য:</span> {r.product}
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-semibold">পরিমাণ:</span> {r.qty}
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-semibold">মোট মূল্য:</span>{" "}
                {r.total} টাকা
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-semibold">তারিখ:</span> {r.date}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">
            এই তারিখে কোনো রসিদ পাওয়া যায়নি
          </p>
        )}
      </div>
    </div>
  );
};

export default AllVautchers;

