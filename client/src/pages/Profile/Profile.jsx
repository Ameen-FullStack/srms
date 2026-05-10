import { useState } from "react";

import { updateProfile, changePassword } from "../../api";

import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

import ProfileSidebar from "./components/ProfileSidebar";
import EditProfileForm from "./components/EditProfileForm";
import ChangePasswordForm from "./components/ChangePasswordForm";

export default function Profile() {
  const toast = useToast();

  const { user, saveSession } = useAuth();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
  });

  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleProfile = async (e) => {
    e.preventDefault();

    setLoading(true);

    const fd = new FormData();

    fd.append("name", profileForm.name);
    fd.append("bio", profileForm.bio);

    try {
      const d = await updateProfile(fd);

      saveSession(localStorage.getItem("token"), d.user);

      toast("Profile updated!");
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    try {
      await changePassword(pwForm);

      toast("Password changed!");

      setPwForm({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      toast(err.message, "error");
    }
  };

  return (
    <div className="page">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 24,
        }}
      >
        <ProfileSidebar user={user} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <EditProfileForm
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            handleProfile={handleProfile}
            loading={loading}
          />

          <ChangePasswordForm
            pwForm={pwForm}
            setPwForm={setPwForm}
            handlePassword={handlePassword}
          />
        </div>
      </div>
    </div>
  );
}
