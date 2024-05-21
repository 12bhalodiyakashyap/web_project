import React, { useEffect, useState } from 'react';
import Modal from './Model';

const ContactData = () => {
    const [data, setData] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const [userInp, setuserInp] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(data));
    }, [data]);

    // Function to open the modal
    const openModal = () => {
        setshowModal(true);
        setuserInp({});
        setIsUpdate(false);
    };

    // Function to handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setuserInp(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = () => {
          // Update the user input with the data URL of the image
          setuserInp(prevState => ({
            ...prevState,
            imageSrc: reader.result // Data URL of the image
          }));
        };
        
        if (file) {
          reader.readAsDataURL(file); // Convert file to data URL
        }
      };
    // Function to handle adding new data
    const handleAdd = () => {
        setData(prevData => [...prevData, userInp]);
        setshowModal(false);
    };

    // Function to handle updating existing data
    const handleUpdate = () => {
        const updatedData = data.map((item, index) => {
            if (index === userInp.index) {
                return userInp;
            }
            return item;
        });
        setData(updatedData);
        setshowModal(false);
    };

    // Function to handle deleting data
    const handleDelete = (index) => {
        const newData = data.filter((item, idx) => idx !== index);
        setData(newData);
    };

    return (
        <div>
            <button className='bg-gray-800 p-2 text-white rounded-lg hover:bg-gray-950 x-2m mx-5 m-2 items-center' onClick={openModal}>+ New User</button>
            <Modal isVisible={showModal} onClose={() => setshowModal(false)}>
                <div className="px-6 py-4">
                    <h1 className="text-xl font-bold text-center">{isUpdate ? "Update" : "Add"} A User</h1>
                    <form className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                            <input type="text" name="name" id="name" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your name" value={userInp?.name || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="publishedPosts" className="block text-sm font-medium text-gray-700">Published Posts:</label>
                            <input type="text" name="publishedPosts" id="publishedPosts" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter published posts" value={userInp?.publishedPosts || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
                            <input type="text" name="role" id="role" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your role" value={userInp?.role || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Image:</label>
                            <input type="file" name="file" id="file" className="form-input mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" onChange={handleFileUpload} />
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
            <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PublishedPosts</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap"><img src={item.imageSrc} alt="" className="h-16 w-auto" /></td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.publishedPosts}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className='bg-gray-700 px-3 py-2 rounded-lg text-white font-bold' onClick={() => { setuserInp({ ...item, index }); setshowModal(true); setIsUpdate(true); }}>Edit</button>
                                <button className='bg-red-400 px-3 py-2 rounded-lg text-white font-bold ml-2' onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactData;
