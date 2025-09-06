import { useState } from "react";
import axios from "axios";

export default function App() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("VITE_API_URL", {
        resume_text: resume,
        job_description: jd,
        candidate_id: "demo",
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to API");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Resume Review System
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 border rounded-lg"
            rows="4"
            placeholder="Paste Resume Text"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
          <textarea
            className="w-full p-3 border rounded-lg"
            rows="4"
            placeholder="Paste Job Description"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Analyzing..." : "Check Resume"}
          </button>
        </form>

        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Results</h2>
            <p className="mt-2">
              <strong>Match Score:</strong> {result.match_score}%
            </p>
            <p className="mt-2">
              <strong>Matched Skills:</strong> {result.matched_skills.join(", ")}
            </p>
            <p className="mt-2">
              <strong>Resume Skills:</strong> {result.resume_skills.join(", ")}
            </p>
            <p className="mt-2">
              <strong>JD Skills:</strong> {result.jd_skills.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
