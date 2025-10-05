import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Sidebar from "../../components/Admin/Sidebar.jsx";
import StatsCards from "../../components/Admin/Stats-cards.jsx";
import TicketList from "../../components/Admin/Ticket-list.jsx";
import QuickActions from "../../components/Admin/Quick-actions.jsx";
import ActivityFeed from "../../components/Admin/Activity-Feed.jsx";
import AIChatbotWidget from "../../components/Admin/Ai-ChatBot-widget.jsx";

export default function AdminDashboardPage() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0b0b0b", color: "white" }}>
      <Sidebar />
      
      <Box
        component="main"
        sx={{
          flex: 1,
          pl: "256px", // same as sidebar width
          bgcolor: "#0b0b0b", // ensures main area is black
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ py: 6, display: "flex", flexDirection: "column", gap: 6 }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#f9fafb" }}>
                Welcome back, Admin
              </Typography>
              <Typography sx={{ color: "#9ca3af", mt: 0.5 }}>
                Here's what's happening with your IT support today
              </Typography>
            </Box>
            <QuickActions />
          </Box>

          {/* Stats Overview */}
          <StatsCards />

          {/* Main Content Grid */}
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <TicketList />
            </Grid>
            <Grid item xs={12} lg={4}>
              <ActivityFeed />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* AI Chatbot */}
      <AIChatbotWidget />
    </Box>
  );
}
