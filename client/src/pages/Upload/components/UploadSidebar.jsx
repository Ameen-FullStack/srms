import UploadGuidelines from "./UploadGuidelines";
import AcceptedFormats from "./AcceptedFormats";

export default function UploadSidebar() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <UploadGuidelines />

      <AcceptedFormats />
    </div>
  );
}
