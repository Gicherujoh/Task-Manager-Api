import { useState } from "react";
import "./DailyReport.css";
import { getDailyReport } from "../services/api";

const DailyReport = () => {
  const [date, setDate] = useState("");
  const [report, setReport] = useState(null);

  const fetchReport = async () => {
    try {
      const res = await getDailyReport(date);
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="report-container">
      <h2>Daily Report</h2>

      {/* Date Picker */}
      <div className="report-controls">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={fetchReport}>Generate</button>
      </div>

      {/* Report Table */}
      {report && (
        <table className="report-table">
          <thead>
            <tr>
              <th>Priority</th>
              <th>Pending</th>
              <th>In Progress</th>
              <th>Done</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(report.summary).map(([priority, stats]) => (
              <tr key={priority}>
                <td>{priority}</td>
                <td>{stats.pending}</td>
                <td>{stats.in_progress}</td>
                <td>{stats.done}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DailyReport;