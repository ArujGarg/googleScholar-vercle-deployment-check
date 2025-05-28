import React, { useState } from "react";

export default function ResumeTextInput({ onChange, value }) {
  return (
    <div>
      <label htmlFor="resumeText" style={{ display: "block", marginBottom: 8 }}>
        Paste your resume text here:
      </label>
      <textarea
        id="resumeText"
        rows={10}
        style={{ width: "100%", padding: 8, fontSize: 16 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste resume text..."
      />
    </div>
  );
}
