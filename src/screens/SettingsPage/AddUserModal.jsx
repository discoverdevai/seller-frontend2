import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import api from "../../Api/Axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // import i18n
import toast from "react-hot-toast";


export const AddMemberModal = ({ onClose, user }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("STAFF");

  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(user);

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoneNumber(user.phoneNumber || "");
      setRole(user.role || "STAFF");
    } else {
      setUsername("");
      setPassword("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setRole("STAFF");
    }
  }, [user]);

  const handleSave = async () => {
  setLoading(true);
  try {
    if (isEdit) {
      const res = await api.put(
        `/api/vendor/settings/staff/${user.id}/role`,
        null,
        { params: { role } }
      );
      if (res.data?.success) {
        toast.success(t("addMember.saveSuccess")); // ✅ success toast
        onClose();
        navigate(0);
      } else {
        toast.error(t("addMember.saveFailed")); // ✅ failed toast
      }
    } else {
      const res = await api.post("/api/vendor/settings/staff/create", {
        username,
        password,
        email,
        firstName,
        lastName,
        phoneNumber,
        role,
      });
      if (res.data?.success) {
        toast.success(t("addMember.createSuccess")); // ✅ success toast
        onClose();
        navigate(0);
      } else {
        toast.error(t("addMember.createFailed")); // ✅ failed toast
      }
    }
  } catch (e) {
    console.error(e);
    toast.error(isEdit ? t("addMember.saveFailed") : t("addMember.createFailed"));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-[900px] rounded-xl p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-[32px] font-semibold [direction:rtl]">
            {isEdit ? t("addMember.editTitle") : t("addMember.addTitle")}
          </h1>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!isEdit && (
              <Field label={t("addMember.username")}>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isEdit}
                />
              </Field>
            )}

            {!isEdit && (
              <Field label={t("addMember.password")}>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            )}

            {!isEdit && (
              <Field label={t("addMember.email")}>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isEdit}
                />
              </Field>
            )}

            {!isEdit && (
              <Field label={t("addMember.firstName")}>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Field>
            )}

            {!isEdit && (
              <Field label={t("addMember.lastName")}>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Field>
            )}

            {!isEdit && (
              <Field label={t("addMember.phoneNumber")}>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+9665XXXXXXXX"
                />
              </Field>
            )}

            <Field label={t("addMember.role")}>
              <Input
                disabled={!isEdit}
                onChange={(e) => setRole(e.target.value.toUpperCase())}
                placeholder="OWNER / MANAGER / STAFF"
              />
            </Field>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">
            <Button variant="outline" className="w-full h-14" onClick={onClose}>
              {t("addMember.cancel")}
            </Button>

            <Button
              className="w-full h-14 bg-gradient-to-r from-[#805b3c] to-[#d3baa4]"
              onClick={handleSave}
              disabled={loading}
            >
              {loading
                ? t("addMember.saving")
                : isEdit
                ? t("addMember.saveChanges")
                : t("addMember.addNew")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Field Wrapper */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2 [direction:rtl]">
    <Label>{label}</Label>
    {children}
  </div>
);
