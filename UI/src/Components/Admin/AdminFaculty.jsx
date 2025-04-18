/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import FacultyModal from "./FacultyModal";
import AdminNavbar from "./AdminNavbar";
import "./AdminFaculty.css"; // Import the updated CSS file
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../Graphql/Mutations";

function AdminFaculty() {
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [action, setAction] = useState("add"); // Action type: 'add', 'display', or 'delete'
  const [FacultyData, setFacultyData] = useState(null); // Store Faculty data (for display/delete)

  const [registerUser] = useMutation(REGISTER_USER);

  // Open modal in "add" mode
  const openAddModal = () => {
    setAction("add");
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setFacultyData(null); // Clear Faculty data when modal closes
  };

  // Handle adding a new Faculty (can later be linked to API or state)
  // const handleAddFaculty = (newFaculty) => {
  //   console.log("Adding new Faculty:", newFaculty);
  //   handleCloseModal();
  // };
  const handleAddFaculty = async (newFaculty) => {
    console.log("Adding new Faculty:", newFaculty);
    try {
      const { data } = await registerUser({
        variables: {
          userInput: {
            ...newFaculty,
          },
        },
      });

      alert("Faculty registered successfully!");
      handleCloseModal();
    } catch (err) {
      console.error("Registration error:", err.message);
      alert("Failed to register faculty");
    }
  };

  // Render the AdminFaculty page with Add Faculty button
  return (
    <>
    <AdminNavbar adminName={"John Doe"} />
    <div className="admin-Faculty-container">
      {/* Button for adding a Faculty, placed at the top right */}
      <button className="add-Faculty-btn" onClick={openAddModal}>
        Add Faculty
      </button>

      {/* Modal for adding new Faculty */}
      <FacultyModal
        showModal={showModal}
        handleClose={handleCloseModal}
        action={action}
        FacultyData={FacultyData}
        handleSubmit={handleAddFaculty}
      />
    </div>
    </>
  );
}

export default AdminFaculty;
