import React from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className="bg-danger h-100 flex-grow-1" id={styles.Dashboard}>
      <h1>DashBoard</h1>
    </div>
  );
}
