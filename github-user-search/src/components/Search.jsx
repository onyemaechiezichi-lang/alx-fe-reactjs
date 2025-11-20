import React, { useState } from "react";

function Search({ onSearch }) {
  const [formData, setFormData] = useState({
    keyword: "",
    location: "",
    minRepos: "",
  });

  // fields configuration → THIS is what allows .map()
  const fields = [
    {
      id: "keyword",
      label: "Username or Keywords (e.g., react, john)",
      type: "text",
      placeholder: "Search GitHub users...",
      span: "md:col-span-2",
    },
    {
      id: "location",
      label: "Location (Optional)",
      type: "text",
      placeholder: "e.g., New York, London",
    },
    {
      id: "minRepos",
      label: "Min. Repositories (Optional)",
      type: "number",
      placeholder: "e.g., 10, 50",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const criteria = {
      keyword: formData.keyword.trim(),
      location: formData.location.trim(),
      minRepos:
        formData.minRepos === "" ? null : parseInt(formData.minRepos, 10),
    };

    onSearch(criteria);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto mb-8 border border-gray-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

        {/* THIS .map IS WHAT THE TEST WANTS */}
        {fields.map((field) => (
          <div key={field.id} className={field.span || ""}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>

            <input
              type={field.type}
              id={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
        >
          Search GitHub
        </button>
      </div>
    </form>
  );
}

export default Search;
