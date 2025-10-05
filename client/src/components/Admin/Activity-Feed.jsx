import React from "react";
import { Card, CardContent, CardHeader, Typography, Avatar, Box } from "@mui/material";
import { CheckCircle, Message, PersonAdd, EmojiEvents } from "@mui/icons-material";

const activities = [
  {
    type: "resolved",
    message: "Ticket TKT-1280 resolved by Rajesh Kumar",
    time: "5 mins ago",
    icon: CheckCircle,
    color: "#4ade80", // equivalent of text-chart-2
  },
  {
    type: "comment",
    message: "New comment on TKT-1284",
    time: "12 mins ago",
    icon: Message,
    color: "#f87171", // equivalent of text-chart-1
  },
  {
    type: "achievement",
    message: "Priya earned 'Quick Resolver' badge",
    time: "1 hour ago",
    icon: EmojiEvents,
    color: "#818cf8", // equivalent of text-chart-4
  },
  {
    type: "assigned",
    message: "TKT-1285 assigned to Amit Patel",
    time: "2 hours ago",
    icon: PersonAdd,
    color: "#34d399", // equivalent of text-chart-3
  },
  {
    type: "resolved",
    message: "Ticket TKT-1279 auto-resolved by AI",
    time: "3 hours ago",
    icon: CheckCircle,
    color: "#4ade80", // equivalent of text-chart-2
  },
];

export default function ActivityFeed() {
  return (
    <Card sx={{ backgroundColor: "#1f2937", borderColor: "#374151" }}> 
      <CardHeader
        title={<Typography variant="h6" sx={{ color: "#f9fafb" }}>Activity Feed</Typography>}
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Box key={index} sx={{ display: "flex", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "#374151", // equivalent of bg-secondary
                    color: activity.color,
                    width: 32,
                    height: 32,
                  }}
                >
                  <Icon fontSize="small" />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ color: "#f9fafb", lineHeight: 1.5 }}>
                    {activity.message}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
