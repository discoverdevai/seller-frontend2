import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import api from "../../Api/axios";
import { useNavigate } from "react-router-dom"; // <- import


export const AddMemberModal = ({ onClose, user, onSave }) => {
    const navigate = useNavigate(); // <- hook

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  

  const [loading, setLoading] = useState(false);

  // Fill form if editing
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role); // roleDisplayName in UI, role in API?
    } else {
      setName("");
      setEmail("");
      setRole("");
    }
  }, [user]);

  const isEdit = Boolean(user);

const handleSave = async () => {
  setLoading(true);
  try {
    if (isEdit) {
      // Edit member → PUT
      const response = await api.put(
        `/api/vendor/settings/staff/${user.id}/role`,
        null,
        { params: { role: "STAFF" } } // Convert role to API enum if needed
      );
     if (response.data.success) {
          navigate("/settings"); // <- navigate on success
        }
    } else {
      // Add new member → POST
      const response = await api.post("/api/vendor/settings/staff/invite", {
        email: email,
        role: role.toUpperCase(), // API expects role enum
      });

        if (response.data.success) {
          navigate("/settings"); // <- navigate on success
        }
    }
  } catch (error) {
    console.error("Failed to save member:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-[927px] rounded-xl p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-[32px] font-semibold [direction:rtl]">
            {isEdit ? "تعديل بيانات العضو" : "إضافة عضو جديد"}
          </h1>

          <div className="flex flex-col gap-3">
            <Label className="[direction:rtl]">الاسم</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 text-right"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label className="[direction:rtl]">البريد الالكتروني</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 text-right"
              disabled={isEdit} // Cannot edit email
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label className="[direction:rtl]">الصلاحيات</Label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-14 text-right"
              placeholder="STAFF / MANAGER / SALES"
            />
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="w-full h-14" onClick={onClose}>
              إلغاء
            </Button>

            <Button
              className="w-full h-14 bg-gradient-to-r from-[#805b3c] to-[#d3baa4]"
              onClick={handleSave}
              disabled={loading}
            >
              {loading
                ? "جاري الحفظ..."
                : isEdit
                ? "حفظ التعديلات"
                : "إضافة العضو الجديد"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
