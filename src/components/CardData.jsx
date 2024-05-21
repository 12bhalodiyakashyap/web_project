import React, { useEffect, useState } from 'react';
import Modal from './Model';

const CardData = () => {
  const [data, setData] = useState([]);
  const [userInp, setUserInp] = useState({
    title: "",
    content: "",
    imageSrc: "",
    img2: "", // Adding img2 field
    btn: "",
    text: ""
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
        imageSrc: reader.result, // Data URL of the image
        img2: reader.result
      }));
    };
    
    if (file) {
      reader.readAsDataURL(file); // Convert file to data URL
    }
  };

  const openModal = (index) => {
    setSelectedItemIndex(index);
    if (index !== null) {
      setUserInp(data[index]);
      setIsUpdate(true);
    } else {
      setUserInp({});
      setIsUpdate(false);
    }
    setShowModal(true);
  };

  const handleAdd = () => {
    const newData = [...data, { ...userInp, key: Date.now() }];
    setData(newData);
    localStorage.setItem('cardData', JSON.stringify(newData));
    setShowModal(false);
  };

  const handleUpdate = () => {
    const updatedData = [...data];
    updatedData[selectedItemIndex] = { ...userInp };
    setData(updatedData);
    localStorage.setItem('cardData', JSON.stringify(updatedData));
    setShowModal(false);
  };

  const handleDelete = (key) => {
    const filteredData = data.filter(item => item.key !== key);
    setData(filteredData);
    localStorage.setItem('cardData', JSON.stringify(filteredData));
  };

  useEffect(() => {
    const savedData = localStorage.getItem('cardData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-center">{isUpdate ? "Update" : "Add"} A Card</h1>
          <form className="mt-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
              <input type="text" name="title" id="title" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter title" value={userInp.title || ""} onChange={handleChange} />
            </div>
            
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
              <input type="text" name="content" id="content" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter content" value={userInp.content || ""} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="imageSrc" className="block text-sm font-medium text-gray-700"> Image:</label>
              <input type="file" name="imageSrc" id="imageSrc" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"  onChange={handleFileUpload} />
            </div>
            <div className="mb-4">
              <label htmlFor="img2" className="block text-sm font-medium text-gray-700">Second Image:</label>
              <input type="file" name="img2" id="img2" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" onChange={handleFileUpload} />
            </div>
          
            <div className="mb-4">
              <label htmlFor="btn" className="block text-sm font-medium text-gray-700">Button:</label>
              <input type="text" name="btn" id="btn" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter button text" value={userInp.btn || ""} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block text-sm font-medium text-gray-700">Text:</label>
              <input type="text" name="text" id="text" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter card text" value={userInp.text || ""} onChange={handleChange} />
            </div>
            <div className="flex justify-end">
              <button type="button" className="mr-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={() => setShowModal(false)}>Cancel</button>
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
        <h2 className="text-2xl font-bold">Card Data</h2>
        <button className="bg-gray-800 text-white p-3 rounded" onClick={() => openModal(null)}>Add</button>
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
                Content
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Second Image
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
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4">
                  <img src={item.imageSrc} alt="" className="h-16 w-auto" />
                </td>
           
                <td className="px-6 py-4 whitespace-nowrap">{item.btn}</td>
                
                <td className="px-6 py-4 whitespace-nowrap">{item.content}</td>
                <td className="px-6 py-4">
                  <img src={item.img2} alt="" className="h-16 w-auto" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.text}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <td className=" px-4 py-2 flex items-center justify-center space-x-2">
                  <button className="bg-gray-700 text-white py-1 px-3 rounded-lg font-bold" onClick={() => openModal(index)}>Edit</button>
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

export default CardData;
