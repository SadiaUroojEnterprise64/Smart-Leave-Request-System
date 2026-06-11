import { useEffect } from "react";
import { Layout } from "antd";
import AppSidebar from "./components/layout/AppSidebar";
import AppHeader from "./components/layout/AppHeader";
import PageHeader from "./components/layout/PageHeader";
import Dashboard from "./components/dashboard/Dashboard";
import { useLeaveStore } from "./store/useLeaveStore";
import "./styles/dashboard.css";

const { Content } = Layout;

export default function App() {
  const fetchLeaves = useLeaveStore((s) => s.fetchLeaves);

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <Layout className="dashboard-root">
      <AppSidebar />
      <Layout className="dashboard-main">
        <AppHeader />
        <PageHeader />
        <Content>
          <Dashboard />
        </Content>
      </Layout>
    </Layout>
  );
}
