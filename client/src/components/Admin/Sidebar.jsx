import React, { useState } from "react";
import { Box, IconButton, Typography, Avatar, Divider } from "@mui/material";
import {
  Dashboard as LayoutDashboard,
  ConfirmationNumber as Ticket,
  Message as MessageSquare,
  TrendingUp,
  Notifications as Bell,
  EmojiEvents as Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tickets", href: "/tickets", icon: Ticket },
  { name: "AI Assistant", href: "/assistant", icon: MessageSquare },
  { name: "Insights", href: "/insights", icon: TrendingUp },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: collapsed ? 64 : 256,
        bgcolor: "#0b0b0b",          // full black background
        borderRight: "1px solid #1f1f1f", // subtle dark border
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s",
        zIndex: 40,
        color: "#f9fafb",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          px: 2,
          borderBottom: "1px solid #1f1f1f",
        }}
      >
        {!collapsed && (
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: "primary.main",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "primary.contrastText",
                }}
              >
                PG
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#f9fafb" }}>
              POWERGRID
            </Typography>
          </Box>
        )}
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            width: 32,
            height: 32,
            color: "#f9fafb",
            "&:hover": { bgcolor: "#1f1f1f" },
          }}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, p: 1 }}>
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link to={item.href} key={item.name} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1.5,
                  borderRadius: 1,
                  color: "#f9fafb",
                  "&:hover": { bgcolor: "#1f1f1f", color: "#f9fafb" },
                  justifyContent: collapsed ? "center" : "flex-start",
                  mb: 0.5,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "background 0.2s",
                }}
              >
                <Icon sx={{ fontSize: 20 }} />
                {!collapsed && <Typography>{item.name}</Typography>}
              </Box>
            </Link>
          );
        })}
      </Box>

      <Divider sx={{ borderColor: "#1f1f1f" }} />

      {/* User Profile */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: 14,
            }}
          >
            AD
          </Avatar>
          {!collapsed && (
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#f9fafb",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                Admin User
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#9ca3af",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                admin@powergrid.in
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
