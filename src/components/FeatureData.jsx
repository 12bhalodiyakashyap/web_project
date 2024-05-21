import React, { useEffect, useState } from 'react';
import Modal from './Model';

const FeatureData = () => {
  const [data, setData] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [userInp, setUserInp] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('featuredData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInp(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      // Update the user input with the data URL of the image
      setUserInp(prevState => ({
        ...prevState,
        imageSrc: reader.result // Data URL of the image
      }));
    };
    
    if (file) {
      reader.readAsDataURL(file); // Convert file to data URL
    }
  };
  
  const openModal = () => {
    setshowModal(true);
    setUserInp({});
    setIsUpdate(false);
  };

  const handleAdd = () => {
    const newItem = { ...userInp, key: Date.now() }; // Assign a unique key
    const updatedData = [...data, newItem];
    setData(updatedData);
    setshowModal(false);
    localStorage.setItem('featuredData', JSON.stringify(updatedData));
    setUserInp({}); // Clear input fields after adding
  };

  const handleUpdate = () => {
    const updatedData = data.map(item => (item.key === userInp.key ? userInp : item));
    setData(updatedData);
    setshowModal(false);
    localStorage.setItem('featuredData', JSON.stringify(updatedData));
    setUserInp({}); // Clear input fields after updating
  };

  const handleDelete = (key) => {
    const updatedData = data.filter(item => item.key !== key);
    setData(updatedData);
    localStorage.setItem('featuredData', JSON.stringify(updatedData));
    setshowModal(false); // Close modal after deletion
  };

  useEffect(() => {
    console.log(data);
  }, [data]); 

  return (
    <div>
       <Modal isVisible={showModal} onClose={() => setshowModal(false)}>
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-center">{isUpdate ? "Update" : "Add"} A Hero</h1>
          <form className="mt-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
              <input type="text" name="title" id="title" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter title" value={userInp.title || ""} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
              <input type="text" name="category" id="category" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter category" value={userInp.category || ""} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="authorImg" className="block text-sm font-medium text-gray-700">Author Image:</label>
              <input type="file" name="authorImg" id="authorImg" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" onChange={handleFileUpload} />
            </div>
            <div className="mb-4">
              <label htmlFor="authorText" className="block text-sm font-medium text-gray-700">Text:</label>
              <input type="text" name="text" id="text" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter text" value={userInp.text || ""} onChange={handleChange} />
            </div>
            <div className="flex justify-end">
              <button type="button" className="mr-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={() => setshowModal(false)}>Cancel</button>
              {isUpdate ?
                <button type="button" className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={handleUpdate}>Update</button>
                :
                <button type="button" className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={handleAdd}>Add</button>
              }
            </div>
          </form>
        </div>
      </Modal>
      <div className="flex justify-between items-center mx-5 mb-4 mt-2"> 
  <h2 className="text-2xl font-bold">Featured Data</h2>
  <button className="bg-gray-800 text-white p-3 rounded " onClick={openModal}>Add</button>
</div>
<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow">
    {/* Table header */}
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Image
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Category
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Text
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Title
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    {/* Table body */}
    <tbody className="bg-white divide-y divide-gray-200">
      {data?.map((item, index) => (
        <tr key={item.key} className="hover:bg-gray-100">
          <td className="px-6 py-4">
            <img src={item.imageSrc} alt="" className="h-16 w-auto" /> {/* Adjust image height and width */}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.text}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
          <td className=" px-4 py-2 flex items-center justify-center space-x-2">
            <button className="bg-gray-700 text-white py-1 px-3 rounded-lg font-bold" onClick={() => { setUserInp(item); setshowModal(true); setIsUpdate(true); }}>Edit</button>
            <button className="bg-red-400 text-white py-1 px-3 rounded-lg font-bold" onClick={() => handleDelete(item.key)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
  );
};

export default FeatureData;
