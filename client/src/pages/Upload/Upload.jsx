import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { uploadMaterial } from "../../api";

import { useToast } from "../../context/ToastContext";

import UploadHeader from "./components/UploadHeader";
import UploadForm from "./components/UploadForm";
import UploadSidebar from "./components/UploadSidebar";

export default function Upload() {
  const navigate = useNavigate();
  const toast = useToast();

  const fileRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    course: "",
    semester: "",
    tags: "",
  });

  const [file, setFile] = useState(null);

  const [dragOver, setDragOver] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleFile = (f) => {
    if (f) setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast("Please select a file.", "error");
      return;
    }

    setLoading(true);

    const fd = new FormData();

    fd.append("file", file);

    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    try {
      await uploadMaterial(fd);

      toast("Material uploaded! Awaiting admin approval.");

      navigate("/my-uploads");
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <UploadHeader />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 24,
        }}
      >
        <UploadForm
          form={form}
          setForm={setForm}
          file={file}
          setFile={setFile}
          fileRef={fileRef}
          dragOver={dragOver}
          setDragOver={setDragOver}
          handleFile={handleFile}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <UploadSidebar />
      </div>
    </div>
  );
}
