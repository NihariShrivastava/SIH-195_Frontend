import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Box,
  InputAdornment,
  Grid,
  Chip,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import { Add, Search, AccessTime, InfoOutlined } from "@mui/icons-material";

// --- Theme Constants (Aligned with final green theme) ---
const MAX_CONTENT_WIDTH = 1400; // Increased width for center content
const ACCENT_COLOR = "#34d399"; // Vibrant Green
const ACCENT_HOVER_COLOR = "#10b981"; // Darker Green on hover
const TEXT_MUTED = "#9ca3af"; // Gray text for subtitles/descriptions
const MAIN_BG_COLOR = "#000000"; // Deep Black
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)'; // Very dark, slight transparent background

const CARD_GLOW_SHADOW = `0 10px 20px 0 rgba(16, 185, 129, 0.2)`;
const CARD_HOVER_BG = 'rgba(52, 211, 153, 0.05)';
// -----------------------------------------------------------


// --- Mock Data Definitions (Unchanged) ---
export const mockTickets = [
  {
    id: "ticket-1",
    ticketNumber: "TKT-1234",
    title: "VPN Connection Issue",
    description: "Unable to connect to VPN from home. Getting error code 809.",
    category: "vpn",
    source: "web",
    userId: "user-1",
    assignedTo: "agent-1",
    assignedTeam: "team-1",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    tags: ["vpn", "remote-access", "error-809"],
  },
  {
    id: "ticket-2",
    ticketNumber: "TKT-1233",
    title: "Password Reset Request",
    description: "Need to reset my email password. Forgot the current one.",
    category: "password",
    source: "chatbot",
    userId: "user-2",
    assignedTo: "agent-1",
    assignedTeam: "team-1",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    tags: ["password", "email", "self-service"],
  },
  {
    id: "ticket-3",
    ticketNumber: "TKT-1232",
    title: "Software Installation - AutoCAD",
    description:
      "Need AutoCAD 2024 installed on my workstation for new project.",
    category: "software",
    source: "email",
    userId: "user-1",
    assignedTo: "agent-1",
    assignedTeam: "team-2",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    tags: ["software", "autocad", "installation"],
  },
  {
    id: "ticket-4",
    ticketNumber: "TKT-1231",
    title: "Printer Not Working",
    description:
      "Office printer on 3rd floor is showing paper jam error but no paper is stuck.",
    category: "hardware",
    source: "web",
    userId: "user-2",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    tags: ["printer", "hardware", "paper-jam"],
  },
  {
    id: "ticket-5",
    ticketNumber: "TKT-1230",
    title: "Network Connectivity Issues",
    description:
      "Intermittent network drops in conference room B. Affecting video calls.",
    category: "network",
    source: "glpi",
    userId: "user-1",
    assignedTeam: "team-1",
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    tags: ["network", "wifi", "conference-room"],
  },
];

// --- Utility Functions ---
const DashboardLayout = ({ children }) => (
  // We use a simple Box to simulate the dashboard container for centering
  <Box sx={{ flexGrow: 1, p: 0, bgcolor: MAIN_BG_COLOR }}>
    {children}
  </Box>
);

const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return "Just now";
};

// --- Main Component ---
export default function EmployeeTicketPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  const filteredTickets = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    if (!lowerQuery) {
      return mockTickets;
    }

    return mockTickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(lowerQuery) ||
        ticket.ticketNumber.toLowerCase().includes(lowerQuery) ||
        ticket.description.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // --- Custom Styles ---
  
  const primaryButtonStyle = {
    background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
    color: 'black',
    fontWeight: 'bold',
    borderRadius: 2,
    py: 1.5,
    transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
    '&:hover': {
      background: ACCENT_HOVER_COLOR,
      boxShadow: `0 0 15px 0 ${ACCENT_COLOR}`,
      transform: 'translateY(-2px)',
    },
  };

  const searchInputStyle = {
    // Overall field styling
    "& .MuiInputLabel-root": { color: TEXT_MUTED },
    "& .MuiOutlinedInput-root": {
      color: "white",
      bgcolor: "rgba(0, 0, 0, 0.7)", // Darker input background
      borderRadius: 2,
      "& fieldset": { borderColor: "rgba(52, 211, 153, 0.2)" },
      "&:hover fieldset": { borderColor: ACCENT_COLOR },
      "&.Mui-focused fieldset": { borderColor: ACCENT_COLOR },
    },
  };

  const ticketCardBaseStyle = {
    transition: "background-color 0.2s, border 0.2s, box-shadow 0.2s, transform 0.2s",
    bgcolor: DARK_CARD_COLOR,
    color: "white",
    border: "1px solid rgba(52, 211, 153, 0.15)",
    borderRadius: 3,
  };

  const ticketChipStyle = {
    borderColor: ACCENT_COLOR,
    color: ACCENT_COLOR,
    bgcolor: "rgba(52, 211, 153, 0.1)",
    height: 24,
    fontSize: '0.75rem',
    fontWeight: 'bold',
  };

  return (
    <DashboardLayout>
      {/* Central Content Container (Maximized Width & Centered) */}
      <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', p: 0, pt: { xs: 2, sm: 4 } }}>

        {/* Header and Button Row */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4, px: 3 }}
        >
          <Grid item>
            <Typography variant="h4" component="h1" fontWeight="bold" color="white" gutterBottom>
              My Tickets
            </Typography>
            <Typography variant="body1" color={TEXT_MUTED}>
              View and manage your support requests
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={MuiLink}
              href="ickets/new"
              variant="contained"
              startIcon={<Add />}
              disableElevation
              sx={primaryButtonStyle}
            >
              Create Ticket
            </Button>
          </Grid>
        </Grid>

        {/* Filters (Search Card) - Takes Full Content Width */}
        <Card
          sx={{
            ...ticketCardBaseStyle,
            mb: 4,
            boxShadow: 'none',
            mx: 3, // Align card edges with header/list
            p: 1.5 // Added padding around input
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <TextField
              fullWidth
              placeholder="Search by title or ticket number..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={searchInputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: ACCENT_COLOR }} />
                  </InputAdornment>
                ),
                // Adjust height for larger search field
                style: { height: 56, padding: 0 } 
              }}
              // Removed label to match the look of the Knowledge Base search bar
            />
          </CardContent>
        </Card>

        {/* Tickets List - Takes Full Content Width */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 3, pb: 4 }}>
          {filteredTickets.length === 0 ? (
            <Card sx={ticketCardBaseStyle}>
              <CardContent sx={{ py: 6, textAlign: "center" }}>
                <InfoOutlined sx={{ fontSize: 40, mb: 1, color: TEXT_MUTED }} />
                <Typography color={TEXT_MUTED}>
                  No tickets found matching your search criteria.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            filteredTickets.map((ticket) => (
              <MuiLink
                key={ticket.id}
                href={`/dashboard/tickets/${ticket.id}`}
                underline="none"
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)", // More noticeable lift
                    boxShadow: CARD_GLOW_SHADOW,
                  },
                }}
              >
                <Card
                  sx={{
                    ...ticketCardBaseStyle,
                    "&:hover": {
                      bgcolor: CARD_HOVER_BG, // Subtle background change on hover
                      border: `1px solid ${ACCENT_HOVER_COLOR}`,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      
                      {/* Line 1: Ticket Info (Number, Category, Tags) */}
                      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "monospace", color: ACCENT_COLOR, fontWeight: "bold", mr: 1, fontSize: '0.9rem' }}
                        >
                          {ticket.ticketNumber}
                        </Typography>
                        <Chip label={ticket.category} size="small" variant="outlined" sx={ticketChipStyle} />
                        {ticket.tags && ticket.tags.slice(0, 1).map((tag) => (
                          <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ color: TEXT_MUTED, borderColor: TEXT_MUTED, height: 24, fontSize: '0.75rem' }} />
                        ))}
                      </Box>

                      {/* Line 2: Title */}
                      <Typography variant="h6" component="h3" color="white" fontWeight="medium">
                        {ticket.title}
                      </Typography>

                      {/* Line 3: Description */}
                      <Typography variant="body2" color={TEXT_MUTED} sx={{
                          overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", 
                          WebkitLineClamp: 2, WebkitBoxOrient: "vertical", mb: 1,
                        }}
                      >
                        {ticket.description}
                      </Typography>

                      {/* Line 4: Footer (Time, Source, Status) */}
                      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: { xs: 2, sm: 4 }, typography: "caption" }}>
                        
                        {/* Created Time */}
                        <Box sx={{ display: "flex", alignItems: "center", color: TEXT_MUTED }}>
                          <AccessTime sx={{ fontSize: 16, mr: 0.5, color: ACCENT_COLOR }} />
                          <span>Created {getTimeAgo(ticket.createdAt)}</span>
                        </Box>

                        {/* Source */}
                        <span style={{ color: TEXT_MUTED }}>Source: {ticket.source.toUpperCase()}</span>

                        {/* Assigned Status */}
                        {ticket.assignedTo && (
                          <span style={{ color: ACCENT_HOVER_COLOR, fontWeight: "bold" }}>
                            • Assigned
                          </span>
                        )}
                        
                        {/* Status (Placeholder for more complex logic if needed) */}
                        {ticket.resolvedAt && (
                          <span style={{ color: '#10b981', fontWeight: "bold" }}>
                            • Resolved
                          </span>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </MuiLink>
            ))
          )}
        </Box>
      </Box>
    </DashboardLayout>
  );
}