import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCircleUser } from "react-icons/fa6";
import usersData from '../JSON/Users.json';
import { IoMdEye } from "react-icons/io";
import axiosClient from '../axios';

// const Profile = () => {
//     // State to manage the users data and editing mode
//     const [users, setUsers] = useState(usersData.map(user => ({ ...user, isEditing: false })));

//     // const [name, setName] = useState();
//     // const [email, setEmail] = useState();
//     // const [phoneNum, setPhoneNum] = useState();
//     // const [password, setPassword] = useState();


//     const [showPassword, setShowPassword] = useState(false);

//     // Function to handle toggling editing mode for a specific user
//     const handleEdit = (index) => {
//         const newUsers = [...users];
//         newUsers[index].isEditing = !newUsers[index].isEditing;
//         setUsers(newUsers);
//     };

//     // Function to handle input changes for a specific user
//     const handleChange = (index, event) => {
//         const { name, value } = event.target;
//         const newUsers = [...users];
//         newUsers[index][name] = value;
//         setUsers(newUsers);
//     };

//     const handleSubmit = (event, index) => {
//         event.preventDefault();
//         handleEdit(index); // Toggle off editing mode
//     };

//     const togglePasswordVisibility = (inputField) => {
//         if (inputField === 1) {
//             setShowPassword(!showPassword);
//         }
//     };

    
//   const getData = () => {
//     const selectedRoom = data.find(room => roomId === room.id);

//    if (selectedRoom) {
//         setRoomName(selectedRoom.room_name);
//         setPrice(selectedRoom.price);
//         setMiniDes(selectedRoom.mini_description);
//         setDescription(selectedRoom.description);
//         // setFiles(JSON.parse(selectedRoom.file_name));
//         setImage(JSON.parse(selectedRoom.file_name));
//         setRoomAmenitiesData(JSON.parse(JSON.parse(selectedRoom.room_amenities)))
//         setBuildingAmenitiesData(JSON.parse(JSON.parse(selectedRoom.building_amenities)))
//       }
//     setLoading(true);
//   };

//     return (
//         <>
//             <Header />
//             <div className='w-full grow bg-backColor h-auto flex flex-col justify-start items-center'>
//                 <h1 className="text-actText text-4xl font-bold m-5">
//                     User Profile
//                 </h1>
//                 <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 w-full h-auto'>
//                     {users.map((user, index) => (
//                         <React.Fragment key={index}>
//                             {/* Display user info */}
//                             <div className='flex flex-col justify-center items-center'>
//                                 <FaCircleUser size={200} className='my-4 text-notActText' />
//                                 <h1 className='text-2xl font-semibold text-actText'>{user.name}</h1>
//                             </div>
//                             {/* Form for editing user info */}
//                             <form className='col-span-2 flex flex-col gap-4 m-4 lg:pr-10 mb-9' onSubmit={(event) => handleSubmit(event, index)}>
//                                 <div className='flex flex-row gap-3 justify-end items-center'>
//                                     <h1 className='lg:text-lg text-md font-semibold text-notActText'>Name:</h1>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         value={user.name}
//                                         onChange={(event) => handleChange(index, event)}
//                                         className='border-2 h-10 w-3/4 text-actText rounded-lg'
//                                         disabled={!user.isEditing}
//                                     />
//                                 </div>
//                                 <div className='flex flex-row gap-3 justify-end items-center'>
//                                     <h1 className='lg:text-lg text-md font-semibold text-notActText'>Email Address:</h1>
//                                     <input
//                                         type="text"
//                                         name="email"
//                                         value={user.email}
//                                         onChange={(event) => handleChange(index, event)}
//                                         className='border-2 h-10 w-3/4 text-actText rounded-lg'
//                                         disabled={!user.isEditing}
//                                     />
//                                 </div>
//                                 <div className='flex flex-row gap-3 justify-end items-center'>
//                                     <h1 className='lg:text-lg text-md font-semibold text-notActText'>Phone Number:</h1>
//                                     <input
//                                         type="text"
//                                         name="cpNum"
//                                         value={user.cpNum}
//                                         onChange={(event) => handleChange(index, event)}
//                                         className='border-2 h-10 w-3/4 text-actText rounded-lg'
//                                         disabled={!user.isEditing}
//                                     />
//                                 </div>
//                                 <div className='relative flex flex-row gap-3 justify-end items-center'>
//                                     <h1 className='lg:text-lg text-md font-semibold text-notActText'>Password:</h1>
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         required
//                                         value={user.password}
//                                         name="password"
//                                         className='border-2 h-10 w-3/4 text-actText rounded-lg'
//                                         onChange={(event) => handleChange(index, event)}
//                                         onChange1={(e) => setPassword(e.target.value)}
//                                         disabled={!user.isEditing}
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => togglePasswordVisibility(1)}
//                                         className="text-sm text-notActText hover:text-actText absolute inset-y-0 right-0 pr-3"
//                                         disabled={!user.isEditing}
//                                     >
//                                         <IoMdEye size={20} />
//                                     </button>
//                                 </div>
//                                 {/* Button */}
//                                 <div className='flex w-full justify-end items-end'>
//                                     <button type="button" onClick={() => handleEdit(index)} className="bg-actNav text-md font-bold lg:w-1/3 w-2/4 text-actText py-2 px-8 
//                                          rounded-full transition duration-75 ease-in-out transform hover:scale-95 justify-center items-center" >
//                                         {user.isEditing ? 'Save' : 'Edit Info'}
//                                     </button>
//                                 </div>
//                             </form>
//                         </React.Fragment>
//                     ))}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default Profile;

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        cpNum: '',
        password: ''
    });
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [cpNum, setCpNum] = useState();
    const [password, setPassword] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        axiosClient.get('/user')
        .then((res) => {
            console.log(res.email); // Accessing the data property of the response object
            setName(res.name); // Assuming the data format directly matches the user state
        }).catch((err) => console.log(err));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsEditing(false);
        try {
            const response = await fetch('/api/user/update', { // Your API endpoint to update user data
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            console.log('User updated:', data);
        } catch (error) {
            console.error('Failed to update user', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Header />
            <div className='w-full grow bg-backColor h-auto flex flex-col justify-start items-center'>
                <h1 className="text-actText text-4xl font-bold m-5">
                    User Profile
                </h1>
                <div className='flex flex-col justify-center items-center'>
                    <FaCircleUser size={200} className='my-4 text-notActText' />
                    <h1 className='text-2xl font-semibold text-actText'>{user.name}</h1>
                </div>
                <form className='w-full max-w-lg p-4 m-4' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        placeholder="Name"
                        disabled={!isEditing}
                    />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        disabled={!isEditing}
                    />
                    <input
                        type="text"
                        name="cpNum"
                        value={user.cpNum}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        disabled={!isEditing}
                    />
                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Password"
                            disabled={!isEditing}
                        />
                        <button 
                            type="button" 
                            onClick={togglePasswordVisibility}
                            disabled={!isEditing}>
                            <IoMdEye size={20} />
                        </button>
                    </div>
                    <button type="button" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Save' : 'Edit Info'}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Profile;