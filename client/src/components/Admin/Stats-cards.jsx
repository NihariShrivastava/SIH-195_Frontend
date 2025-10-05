import React from "react";
import { Card, CardContent, Grid, Box, Typography } from "@mui/material";
import { ConfirmationNumber as Ticket, AccessTime as Clock, CheckCircle as CheckCircle2, TrendingUp } from "@mui/icons-material";

const stats = [
  {
    name: "Total Tickets",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: Ticket,
    color: "#f87171", // text-chart-1
  },
  {
    name: "Pending",
    value: "156",
    change: "-8.2%",
    trend: "down",
    icon: Clock,
    color: "#818cf8", // text-chart-4
  },
  {
    name: "Resolved Today",
    value: "89",
    change: "+23.1%",
    trend: "up",
    icon: CheckCircle2,
    color: "#4ade80", // text-chart-2
  },
  {
    name: "Avg Resolution Time",
    value: "2.4h",
    change: "-15.3%",
    trend: "down",
    icon: TrendingUp,
    color: "#34d399", // text-chart-3
  },
];

export default function StatsCards() {
  return (
    <Grid container spacing={2}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Grid item xs={12} md={6} lg={3} key={stat.name}>
            <Card
              sx={{
                position: "relative",
                overflow: "hidden",
                bgcolor: "#1f2937", // bg-card
                border: "1px solid #374151", // border-border
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 500 }}>
                      {stat.name}
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#f9fafb", fontWeight: "bold" }}>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: stat.trend === "up" ? "#4ade80" : "#818cf8",
                        fontWeight: 500,
                      }}
                    >
                      {stat.change} from last week
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#374151", // bg-secondary
                      p: 1.5,
                      borderRadius: 1,
                      color: stat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon sx={{ fontSize: 24 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
