import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
        console.log(e.target.value)
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const responseData = await fetchResponse.json()

        if (responseData.success) {
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("role updated", responseData)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in-up">
            {/* Modal Card */}
            <div className="relative bg-white/90 rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-teal-100 animate-slide-in-right">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-teal-600 bg-white/70 rounded-full p-1.5 shadow transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <IoMdClose size={22} />
                </button>

                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent mb-1 text-center">Change User Role</h1>
                    <p className="text-sm text-gray-500 text-center">Update the role for this user</p>
                </div>

                {/* User Info */}
                <div className="mb-4 space-y-1">
                    <p className="text-gray-700"><span className="font-medium">Name:</span> {name}</p>
                    <p className="text-gray-700"><span className="font-medium">Email:</span> {email}</p>
                </div>

                {/* Role Selector */}
                <div className="flex items-center justify-between my-6">
                    <label htmlFor="role-select" className="text-gray-700 font-medium">Role:</label>
                    <select
                        id="role-select"
                        className="border border-teal-200 rounded-lg px-4 py-1.5 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 bg-white text-gray-800 transition-all"
                        value={userRole}
                        onChange={handleOnChangeSelect}
                    >
                        {Object.values(ROLE).map(el => (
                            <option value={el} key={el}>{el}</option>
                        ))}
                    </select>
                </div>

                {/* Action Button */}
                <button
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg hover:from-teal-600 hover:to-teal-700 hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 mt-2"
                    onClick={updateUserRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    )
}

export default ChangeUserRole