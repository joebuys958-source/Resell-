import Sidebar from "../components/Sidebar.jsx";

export default function Dashboard() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main">
        <h1 style={{ marginBottom: "20px" }}>Overview</h1>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>£0.00</p>
        </div>

        <div className="card">
          <h3>Total Profit</h3>
          <p>£0.00</p>
        </div>

        <div className="card">
          <h3>Items in Inventory</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Items Sold</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}
