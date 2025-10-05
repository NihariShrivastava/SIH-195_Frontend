import React from "react";
import { Card, CardContent, CardHeader, Typography, Box, Button, Chip } from "@mui/material";
import { AccessTime as Clock, Person as User, ArrowRight } from "@mui/icons-material";

const tickets = [
  {
    id: "TKT-1284",
    title: "VPN Connection Issues",
    description: "Unable to connect to corporate VPN from remote location",
    priority: "high",
    status: "in-progress",
    source: "Email",
    assignee: "Rajesh Kumar",
    time: "15 mins ago",
    category: "Network",
  },
  {
    id: "TKT-1283",
    title: "Password Reset Request",
    description: "User locked out of account after multiple failed attempts",
    priority: "medium",
    status: "pending",
    source: "Chatbot",
    assignee: "Priya Sharma",
    time: "1 hour ago",
    category: "Access",
  },
  {
    id: "TKT-1282",
    title: "Software Installation - AutoCAD",
    description: "Request for AutoCAD 2024 installation on workstation",
    priority: "low",
    status: "pending",
    source: "GLPI",
    assignee: "Amit Patel",
    time: "2 hours ago",
    category: "Software",
  },
  {
    id: "TKT-1281",
    title: "Email Sync Problem",
    description: "Outlook not syncing emails for the past 24 hours",
    priority: "high",
    status: "in-progress",
    source: "Solman",
    assignee: "Neha Singh",
    time: "3 hours ago",
    category: "Email",
  },
];

const priorityColors = {
  high: { bgcolor: "rgba(248, 113, 113, 0.1)", color: "#ef4444", borderColor: "rgba(248, 113, 113, 0.2)" },
  medium: { bgcolor: "rgba(129, 140, 248, 0.1)", color: "#818cf8", borderColor: "rgba(129, 140, 248, 0.2)" },
  low: { bgcolor: "rgba(74, 222, 128, 0.1)", color: "#22c55e", borderColor: "rgba(74, 222, 128, 0.2)" },
};

const statusColors = {
  "in-progress": { bgcolor: "rgba(248, 113, 113, 0.1)", color: "#ef4444", borderColor: "rgba(248, 113, 113, 0.2)" },
  pending: { bgcolor: "rgba(129, 140, 248, 0.1)", color: "#818cf8", borderColor: "rgba(129, 140, 248, 0.2)" },
  resolved: { bgcolor: "rgba(74, 222, 128, 0.1)", color: "#22c55e", borderColor: "rgba(74, 222, 128, 0.2)" },
};

export default function TicketList() {
  return (
    <Card sx={{ bgcolor: "#1f2937", border: "1px solid #374151" }}>
      <CardHeader
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 0 }}
        title={<Typography sx={{ color: "#f9fafb", fontWeight: 600 }}>Recent Tickets</Typography>}
        action={
          <Button
            variant="text"
            endIcon={<ArrowRight />}
            sx={{ color: "#3b82f6", "&:hover": { color: "#3b82f6cc" }, textTransform: "none" }}
          >
            View All
          </Button>
        }
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {tickets.map((ticket) => (
          <Box
            key={ticket.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
              borderRadius: 1,
              border: "1px solid #374151",
              bgcolor: "rgba(55, 65, 81, 0.5)",
              transition: "all 0.3s",
              "&:hover": { borderColor: "rgba(59, 130, 246, 0.3)", bgcolor: "rgba(55, 65, 81, 1)" },
            }}
          >
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                <Typography sx={{ fontFamily: "monospace", fontSize: 14, fontWeight: 500, color: "#3b82f6" }}>
                  {ticket.id}
                </Typography>
                <Chip label={ticket.priority} variant="outlined" sx={priorityColors[ticket.priority]} size="small" />
                <Chip label={ticket.status} variant="outlined" sx={statusColors[ticket.status]} size="small" />
                <Chip label={ticket.source} variant="outlined" sx={{ bgcolor: "#374151", color: "#9ca3af", borderColor: "#374151" }} size="small" />
              </Box>
              <Typography sx={{ fontWeight: 600, color: "#f9fafb" }}>{ticket.title}</Typography>
              <Typography sx={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.5 }}>{ticket.description}</Typography>
              <Box sx={{ display: "flex", gap: 3, fontSize: 12, color: "#9ca3af", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <User sx={{ fontSize: 14 }} />
                  <Typography>{ticket.assignee}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Clock sx={{ fontSize: 14 }} />
                  <Typography>{ticket.time}</Typography>
                </Box>
                <Chip label={ticket.category} variant="filled" size="small" sx={{ fontSize: 10 }} />
              </Box>
            </Box>
            <Button
              variant="text"
              sx={{
                opacity: 0,
                transition: "opacity 0.3s",
                "&:hover": { opacity: 1 },
                textTransform: "none",
              }}
            >
              View
            </Button>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
