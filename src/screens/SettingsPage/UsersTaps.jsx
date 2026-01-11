import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { AddMemberModal } from "./AddUserModal";
import { DeleteUserModal } from "./DeleteUserModal";
import api from "../../Api/Axios";
import { useTranslation } from "react-i18next";
import { DashboardSkeleton } from "../../components/skeleton";

export const UsersTabs = () => {
  const { t } = useTranslation();

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fetch staff data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await api.get("/api/vendor/settings/staff");
        if (response.data.success) {
          const mappedMembers = response.data.data.map((member) => ({
            id: member.id,
            name: member.userName,
            email: member.userEmail,
            role: member.role,
            roleColor:
              member.role === "MANAGER"
                ? "bg-[#ebf1fc]"
                : member.role === "SALES"
                ? "bg-[#f7f1ea]"
                : "bg-emerald-50",
            roleTextColor:
              member.role === "MANAGER"
                ? "text-[#00154c]"
                : member.role === "SALES"
                ? "text-[#5a2c00]"
                : "text-[#005b10]",
            roleSize: member.role === "MANAGER" ? "text-base" : "text-xs",
            active: member.active,
            joinedAt: member.joinedAt,
          }));
          setTeamMembers(mappedMembers);
        }
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const openAddModal = () => {
    setSelectedUser(null); // Add new
    setShowAddMember(true);
  };

  const openEditModal = (member) => {
    setSelectedUser(member); // Edit
    setShowAddMember(true);
  };

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="flex flex-col gap-6 w-full ">
      {/* Add New Member Button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="font-h-3 text-[#1a1713] text-lg md:text-xl whitespace-nowrap">
          {t("team.currentMembers")}
        </h2>

        <Button
          onClick={openAddModal}
          className="w-full md:w-[337px] h-14 gap-2 p-2 rounded-[10px] bg-gradient-to-r from-[#805b3c] to-[#d3baa4] hover:opacity-90"
        >
          {t("team.addNewMember")}
        </Button>
      </div>

      {/* Team Members List */}
      <div className="flex flex-col gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-[10px] border border-solid border-[#c3c3c3] gap-4"
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-14 h-14 bg-[#f2f2f2] rounded-[28px]">
                <AvatarFallback>
                  <img className="w-6 h-6" alt={t("user")} src="/user.svg" />
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start gap-1">
                <span className="font-h4-medium text-[#1a1713] text-base">
                  {member.name}
                </span>
                <span className="text-[#4f4f4f] text-sm">{member.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              <div
                className={`flex w-28 h-10 items-center justify-center rounded-[10px] ${member.roleColor}`}
              >
                <span
                  className={`font-medium ${member.roleTextColor} ${member.roleSize} text-center`}
                >
                  {member.role}
                </span>
              </div>

              <button
                onClick={() => openEditModal(member)}
                className="flex items-center gap-2"
              >
                <img className="w-6 h-6" alt={t("edit")} src="/edit-2.svg" />
              </button>

              <button
                onClick={() => {
                  setUserToDelete(member);
                  setIsDeleteOpen(true);
                }}
              >
                <img className="w-6 h-6" alt={t("delete")} src="/trash.svg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddMember && (
        <AddMemberModal
          user={selectedUser}
          onClose={() => setShowAddMember(false)}
          onSave={(updatedMember) => {
            if (selectedUser) {
              setTeamMembers((prev) =>
                prev.map((m) =>
                  m.id === updatedMember.id ? updatedMember : m
                )
              );
            } else {
              setTeamMembers((prev) => [...prev, updatedMember]);
            }
            setShowAddMember(false);
          }}
        />
      )}

      {/* Delete Modal */}
      {isDeleteOpen && userToDelete && (
        <DeleteUserModal
          user={userToDelete}
          onCancel={() => {
            setIsDeleteOpen(false);
            setUserToDelete(null);
          }}
          onConfirm={async (user) => {
            try {
              await api.delete(`/api/vendor/settings/staff/${user.id}`);
              setTeamMembers((prev) =>
                prev.filter((m) => m.id !== user.id)
              );
            } catch (error) {
              console.error("Failed to delete user:", error);
            } finally {
              setIsDeleteOpen(false);
              setUserToDelete(null);
            }
          }}
        />
      )}
    </div>
  );
};
