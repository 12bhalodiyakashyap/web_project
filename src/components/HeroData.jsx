import React, { useEffect, useState } from 'react';
import Modal from './Model';

function HeroData() {
  const [heroData, setHeroData] = useState({});
  const [showModal, setshowModal] = useState(false);
  const [userInp, setUserInp] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (typeof Storage !== "undefined") {
      const data = localStorage.getItem("heroData");

      if (data) {
        console.log("Data found:", data);
        const parsedData = JSON.parse(data);
        setHeroData(parsedData);
      } else {
        console.log("No data found");
      }
    } else {
      console.log("Local storage is not supported by this browser");
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
    setUserInp(prevState => ({
      ...prevState,
      [event.target.name]: URL.createObjectURL(file)
    }));
  };

  const handleAdd = () => {
    const updatedData = { ...heroData, [Date.now()]: userInp };
    setHeroData(updatedData);
    setshowModal(false);
    localStorage.setItem('heroData', JSON.stringify(updatedData));
    setUserInp({}); 
  };

  const handleUpdate = () => {
    const updatedData = { ...heroData, [userInp.key]: userInp };
    setHeroData(updatedData);
    setshowModal(false);
    localStorage.setItem('heroData', JSON.stringify(updatedData));
    setUserInp({}); 
  };

  const handleDelete = (key) => {
    const updatedData = { ...heroData };
    const authorToDelete = updatedData[key].authorText; 
  
    for (const itemKey in updatedData) {
      if (updatedData[itemKey].authorText === authorToDelete) {
        delete updatedData[itemKey];
      }
    }
  
    setHeroData(updatedData);
    localStorage.setItem('heroData', JSON.stringify(updatedData));
    setshowModal(false); 
  };
  
  const heroDataArray = Object.keys(heroData).map(key => ({ key, ...heroData[key] }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
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
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
              <input type="text" name="content" id="content" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter content" value={userInp.content || ""} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="imageSrc" className="block text-sm font-medium text-gray-700"> Image:</label>
              <input type="file" name="imageSrc" id="imageSrc" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" onChange={handleFileUpload} />
            </div>
            <div className="mb-4">
              <label htmlFor="authorImg" className="block text-sm font-medium text-gray-700">Author Image:</label>
              <input type="file" name="authorImg" id="authorImg" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" onChange={handleFileUpload} />
            </div>
            <div className="mb-4">
              <label htmlFor="authorText" className="block text-sm font-medium text-gray-700">Author Text:</label>
              <input type="text" name="authorText" id="authorText" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter author text" value={userInp.authorText || ""} onChange={handleChange} />
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
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Hero Data</h2>
        <button className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={() => { setshowModal(true); setIsUpdate(false); setUserInp({}); }}>Add</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Img</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">AuthorImg</th>
              <th className="px-4 py-2">AuthorText</th>
              <th className="px-4 py-2">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {heroDataArray.map(item => (
              <tr key={item.key} className="bg-white hover:bg-gray-100">
            
                <td className="border px-4 py-2">
                  <img src={item.imageSrc} a lt="" className="w-24 h-auto" />
                </td>
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2">{item.category}</td>
                <td className="border px-4 py-2">{item.content}</td>
                <td className="border px-4 py-2">
                  <img src={item.authorImg} alt="" className="w-10 h-10 object-cover rounded-full" />
                </td>
                <td className="border px-4 py-2">{item.authorText}</td>
                <td className="border px-4 py-2 flex items-center justify-center">
                  <button className='bg-gray-700 px-3 py-1 rounded-lg text-white font-bold' onClick={() => { setUserInp(item); setshowModal(true); setIsUpdate(true); }}>Edit</button>
                  <button className='bg-red-400 px-3 py-1 rounded-lg text-white font-bold ml-2' onClick={() => handleDelete(item.key)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HeroData;
