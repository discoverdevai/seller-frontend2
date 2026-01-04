import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import api from "../../Api/axios";
import { useNavigate } from "react-router-dom";

export const DeleteUserModal = ({ user, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/api/vendor/settings/staff/${user.id}`);
      if (response.data.success) {
        // Navigate to /settings after successful deletion
        this.onCancel
        navigate("/settings");
      } else {
        console.error("Failed to delete user:", response.data.message);
      }
    } catch (error) {
        this.onCancel
      console.error("Failed to delete user:", error);
    } finally {
      setLoading(false);
        this.onCancel
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#fefefe] w-[975px] h-[600px] flex rounded-xl">
        <div className="mt-8 w-full h-full flex flex-col gap-2 relative items-center">
          <img
            className="w-[350px] h-[350px]"
            alt="Delete"
            src="/ProductDeletion.png"
          />

          <div className="flex flex-col gap-8 w-full items-center">
            <div className="flex flex-col w-[662px] gap-4 items-center">
              <h1 className="font-semibold text-[#1a1713] text-[30px] leading-10 text-center">
                هل أنت متأكد أنك تريد حذف العضو "{user?.name}"؟
              </h1>

              <p className="text-[#4f4f4f] text-center">
                هل انت متاكد من حذف ذلك العضو ؟ سيتم ازالة جميع بياناته ولن يمكن التراجع عن هذا الاجراء
              </p>
            </div>

            <div className="flex justify-between w-full px-12 mt-auto">
              <Button
                variant="outline"
                className="w-[452px] h-14 rounded-[10px]"
                onClick={onCancel}
                disabled={loading}
              >
                إلغاء
              </Button>

              <Button
                variant="destructive"
                className="w-[451px] h-14 bg-[#b90000]"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "جاري الحذف..." : "حذف العضو"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
