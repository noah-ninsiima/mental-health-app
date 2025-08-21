


import { useState } from "react";
import { ChevronDown } from "lucide-react";

const userRoles = [
  { 
    value: "youth", 
    label: "Youth (13-25 years)", 
    description: "Access to peer support and age-appropriate resources" 
  },
  { 
    value: "parent-teacher", 
    label: "Parent/Teacher", 
    description: "Tools for supporting young people and family guidance" 
  },
  { 
    value: "therapist", 
    label: "Licensed Therapist", 
    description: "Professional dashboard and client management tools" 
  },
  { 
    value: "admin", 
    label: "Administrator", 
    description: "Platform management and system oversight" 
  },
];

export default function RoleDropdown({ signupForm, setSignupForm }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedRole = userRoles.find(r => r.value === signupForm.role);

  return (
    <div className="relative w-full">
      {/* Dropdown button */}
      <button
        type="button"
        className={`w-full bg-white border border-gray-300 rounded-md py-2 px-3 flex justify-between items-center text-left text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedRole ? "text-gray-900" : "text-gray-400"}>
          {selectedRole ? selectedRole.label : "Choose your role"}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
          {userRoles.map((role) => (
            <button
              key={role.value}
              type="button"
              onClick={() => {
                setSignupForm({ ...signupForm, role: role.value });
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 hover:bg-teal-50 transition text-sm`}
            >
              <p className="font-medium text-gray-900">{role.label}</p>
              <p className="text-xs text-gray-500">{role.description}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}