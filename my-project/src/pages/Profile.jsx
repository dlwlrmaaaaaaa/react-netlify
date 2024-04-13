import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCircleUser } from "react-icons/fa6";
import usersData from '../JSON/Users.json';

const Profile = () => {
    // State to manage the users data and editing mode
    const [users, setUsers] = useState(usersData.map(user => ({ ...user, isEditing: false })));

    // Function to handle toggling editing mode for a specific user
    const handleEdit = (index) => {
        const newUsers = [...users];
        newUsers[index].isEditing = !newUsers[index].isEditing;
        setUsers(newUsers);
    };

    // Function to handle input changes for a specific user
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newUsers = [...users];
        newUsers[index][name] = value;
        setUsers(newUsers);
    };

    const handleSubmit = (event, index) => {
        event.preventDefault();
        handleEdit(index); // Toggle off editing mode
    };

    return (
        <>
            <Header />
            <div className='w-full grow bg-backColor h-auto flex flex-col justify-start items-center'>
                <h1 className="text-actText text-4xl font-bold m-5">
                    User Profile
                </h1>
                <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 w-full h-auto'>
                    {users.map((user, index) => (
                        <React.Fragment key={index}>
                        {/* Display user info */}
                            <div className='flex flex-col justify-center items-center'>
                                <FaCircleUser size={200} className='my-4 text-notActText' />
                                <h1 className='text-2xl font-semibold text-actText'>{user.name}</h1>
                            </div>
                            {/* Form for editing user info */}
                            <form className='col-span-2 flex flex-col gap-4 m-4 lg:pr-10 mb-9' onSubmit={(event) => handleSubmit(event, index)}>
                                <div className='flex flex-row gap-3 justify-end items-center'>
                                    <h1 className='text-lg font-semibold text-notActText'>Name:</h1>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={user.name} 
                                        onChange={(event) => handleChange(index, event)}
                                        className='border-2 h-10 w-3/4 text-actText rounded-lg'
                                        disabled={!user.isEditing}
                                    />
                                </div>
                                <div className='flex flex-row gap-3 justify-end items-center'>
                                    <h1 className='text-lg font-semibold text-notActText'>Address:</h1>
                                    <input 
                                        type="text" 
                                        name="address"
                                        value={user.address}  
                                        onChange={(event) => handleChange(index, event)}
                                        className='border-2 h-10 w-3/4 text-actText rounded-lg'
                                        disabled={!user.isEditing}
                                    />
                                </div>
                                <div className='flex flex-row gap-3 justify-end items-center'>
                                    <h1 className='text-lg font-semibold text-notActText'>Email Address:</h1>
                                    <input 
                                        type="text" 
                                        name="email"
                                        value={user.email}  
                                        onChange={(event) => handleChange(index, event)}
                                        className='border-2 h-10 w-3/4 text-actText rounded-lg'
                                        disabled={!user.isEditing}
                                    />
                                </div>
                                <div className='flex flex-row gap-3 justify-end items-center'>
                                    <h1 className='text-lg font-semibold text-notActText'>Phone Number:</h1>
                                    <input 
                                        type="text" 
                                        name="cpNum"
                                        value={user.cpNum}  
                                        onChange={(event) => handleChange(index, event)}
                                        className='border-2 h-10 w-3/4 text-actText rounded-lg'
                                        disabled={!user.isEditing}
                                    />
                                </div>
                                <div className='flex flex-row gap-3 justify-end items-center'>
                                    <h1 className='text-lg font-semibold text-notActText'>Password:</h1>
                                    <input 
                                        type="text" 
                                        name="password"
                                        value={user.password}  
                                        onChange={(event) => handleChange(index, event)}
                                        className='border-2 h-10 w-3/4 text-actText rounded-lg'
                                        disabled={!user.isEditing}
                                    />
                                </div>
                                {/* Button */}
                                <div className='flex w-full justify-end items-end'>
                                    <button type="button" onClick={() => handleEdit(index)} className="bg-actNav text-md font-bold w-1/3 text-actText py-2 px-8 md:ml-8 rounded-full transition duration-75 ease-in-out transform hover:scale-95 justify-center items-center" >
                                        {user.isEditing ? 'Save' : 'Edit Info'}
                                    </button>
                                </div>
                            </form>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
