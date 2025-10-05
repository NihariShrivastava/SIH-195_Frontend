import React from "react";
import { Button, Box } from "@mui/material";
import { Add as Plus, Message as MessageSquare } from "@mui/icons-material";

export default function QuickActions() {
  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <Button
        variant="outlined"
        startIcon={<MessageSquare />}
        sx={{
          bgcolor: "transparent",
          color: "#f9fafb",
          borderColor: "#6b7280",
          textTransform: "none",
          "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
        }}
      >
        Ask AI Assistant
      </Button>

      <Button
        variant="contained"
        startIcon={<Plus />}
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          textTransform: "none",
          "&:hover": { bgcolor: "primary.dark" },
        }}
      >
        New Ticket
      </Button>
    </Box>
  );
}
