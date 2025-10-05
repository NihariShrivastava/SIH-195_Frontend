import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Divider,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";
import { User, Bell, Shield, Save, Mail, MessageSquare } from "lucide-react";
import { toast } from 'react-hot-toast'; // Assuming toast is available for notifications

// --- Theme Constants (from previous components) ---
const ACCENT_COLOR = "#34d399"; // Vibrant Green
const ACCENT_HOVER_COLOR = "#10b981"; // Darker Green on hover
const TEXT_MUTED = "#9ca3af"; // Gray text for subtitles/descriptions
const MAIN_BG_COLOR = "#000000"; // Deep Black
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)'; // Very dark, slight transparent background

const CARD_GLOW_SHADOW = `0 10px 20px 0 rgba(16, 185, 129, 0.2)`;
const BUTTON_GLOW_SHADOW = `0 0 15px rgba(16, 185, 129, 0.5)`;

// --- Mock Data ---
const mockNotificationConfigs = [
    { eventType: "ticket_created", emailEnabled: true, smsEnabled: false },
    { eventType: "ticket_updated", emailEnabled: true, smsEnabled: true },
    { eventType: "ticket_resolved", emailEnabled: true, smsEnabled: false },
    { eventType: "ticket_assigned", emailEnabled: false, smsEnabled: false },
    { eventType: "comment_added", emailEnabled: true, smsEnabled: false },
];

const notificationEvents = [
  { type: "ticket_created", label: "Ticket Created", description: "When you create a new support ticket" },
  { type: "ticket_updated", label: "Ticket Updated", description: "When your ticket status changes" },
  { type: "ticket_resolved", label: "Ticket Resolved", description: "When your ticket is marked as resolved" },
  { type: "ticket_assigned", label: "Ticket Assigned", description: "When your ticket is assigned to a support agent" },
  { type: "comment_added", label: "New Comment", description: "When someone comments on your ticket" },
];

// Mock DashboardLayout placeholder (adjusted padding to match dashboard body)
const DashboardLayout = ({ children }) => (
  <Box sx={{ minHeight: "100vh", bgcolor: MAIN_BG_COLOR, color: "white", p: { xs: 2, sm: 4 } }}>
    {children}
  </Box>
);

// --- Custom Styles for Theme Integration ---
const themedCardStyle = {
  borderRadius: 3,
  // Use a deep dark background for contrast
  background: DARK_CARD_COLOR, 
  border: '1px solid rgba(52, 211, 153, 0.2)',
  transition: 'border 0.3s, box-shadow 0.3s',
  '&:hover': {
    boxShadow: CARD_GLOW_SHADOW,
    borderColor: "rgba(52, 211, 153, 0.4)",
  },
  p: 2,
};

const themedInputStyle = {
  // Styles for the Input element itself, overriding MUI defaults
  '& .MuiInputBase-input': {
    color: 'white',
    fontSize: 14,
  },
  '& .MuiInputLabel-root': {
    color: TEXT_MUTED,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker input background
    '& fieldset': {
      borderColor: 'rgba(52, 211, 153, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: ACCENT_COLOR,
    },
    '&.Mui-focused fieldset': {
      borderColor: ACCENT_COLOR,
    },
    '&.Mui-disabled': {
      backgroundColor: 'rgba(50, 50, 50, 0.5)',
    }
  },
};

const primaryButtonStyle = {
  background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
  color: 'black',
  fontWeight: 'bold',
  borderRadius: 2,
  py: 1.5,
  transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
  '&:hover': {
    background: ACCENT_HOVER_COLOR,
    boxShadow: BUTTON_GLOW_SHADOW,
    transform: 'translateY(-2px)',
  },
  '&.Mui-disabled': {
    background: 'rgba(52, 211, 153, 0.5)',
    color: '#333333',
    transform: 'none',
  }
};

const switchStyle = {
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: ACCENT_COLOR,
    '&:hover': {
      backgroundColor: 'rgba(52, 211, 153, 0.1)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: ACCENT_COLOR,
  },
  '& .MuiSwitch-track': {
    backgroundColor: TEXT_MUTED,
  },
};

// --- Custom Tab Panel Component ---
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3, pb: 2 }}>{children}</Box>}
    </div>
  );
}

// --- Custom Tabs Trigger Styles ---
const tabTriggerStyle = {
    color: TEXT_MUTED,
    minWidth: 100,
    py: 1.5,
    fontWeight: 'bold',
    borderRadius: 1,
    transition: 'color 0.3s, background-color 0.3s',
    '&.Mui-selected': { 
        color: ACCENT_COLOR,
        bgcolor: 'rgba(52, 211, 153, 0.1)', // Light background for selected tab
        boxShadow: `0 0 8px rgba(52, 211, 153, 0.2)`
    },
    '&:hover': { 
        color: ACCENT_HOVER_COLOR,
        bgcolor: 'rgba(52, 211, 153, 0.05)',
    },
    
};


export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0: Profile, 1: Notifications, 2: Security

  const [notifications, setNotifications] = useState({
    ticket_created: { email: true, sms: false },
    ticket_updated: { email: true, sms: true },
    ticket_resolved: { email: true, sms: false },
    ticket_assigned: { email: false, sms: false },
    comment_added: { email: true, sms: false },
  });

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // --- Effects ---
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      let parsedUser = JSON.parse(userData);
      parsedUser.employeeId = parsedUser.employeeId || "PG-4001";
      parsedUser.department = parsedUser.department || "IT Operations";
      setUser(parsedUser);
    }

    const userNotifs = mockNotificationConfigs.reduce(
      (acc, config) => {
        acc[config.eventType] = { email: config.emailEnabled, sms: config.smsEnabled };
        return acc;
      }, {}
    );
    setNotifications((prev) => ({ ...prev, ...userNotifs }));
  }, []);

  // --- Handlers ---
  const handleNotificationToggle = (eventType, channel, value) => {
    setNotifications((prev) => ({
      ...prev,
      [eventType]: { ...prev[eventType], [channel]: value },
    }));
  };

  const handleSaveNotifications = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("[MUI] Saving notification preferences:", notifications);
      setIsSaving(false);
      toast.success("Notification preferences saved!");
    }, 1000);
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("[MUI] Saving profile:", user);
      localStorage.setItem("user", JSON.stringify(user));
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };
  
  const handleUpdatePassword = () => {
      if (passwordForm.new !== passwordForm.confirm) {
          toast.error("New passwords do not match!");
          return;
      }
      setIsSaving(true);
      setTimeout(() => {
          console.log("[MUI] Changing password.");
          setIsSaving(false);
          setPasswordForm({ current: "", new: "", confirm: "" });
          toast.success("Password updated successfully!");
      }, 1000);
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 0, color: 'white' }}>
        
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "white" }}>
            Settings
          </Typography>
          <Typography sx={{ color: TEXT_MUTED }}>
            Manage your account and notification preferences
          </Typography>
        </Box>

        {/* Tabs List */}
        <Box sx={{ mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            aria-label="Settings tabs"
            TabIndicatorProps={{ style: { backgroundColor: ACCENT_COLOR, height: 3 } }}
            variant="fullWidth" // Ensure tabs take full width
            sx={{
                '& .MuiTabs-flexContainer': { 
                    gap: 1.5 // Space between tab triggers
                }
            }}
          >
            <Tab style={tabTriggerStyle} label={<Box display="flex" alignItems="center" gap={1}><User size={16} />Profile</Box>} />
            <Tab style={tabTriggerStyle} label={<Box display="flex" alignItems="center" gap={1}><Bell size={16} />Notifications</Box>} />
            <Tab style={tabTriggerStyle} label={<Box display="flex" alignItems="center" gap={1}><Shield size={16} />Security</Box>} />
          </Tabs>
        </Box>

        {/* --- Profile Tab --- */}
        <CustomTabPanel value={activeTab} index={0}>
          <Card sx={themedCardStyle}>
            <CardHeader
              title={<Typography variant="h6" fontWeight="bold" color="white">Profile Information</Typography>}
              subheader={<Typography sx={{ color: TEXT_MUTED }}>Update your personal details and employee information</Typography>}
              sx={{ p: 2, pb: 1 }}
            />
            <CardContent sx={{ p: 2, pt: 2, "&:last-child": { pb: 2 } }}>
              <Grid container spacing={3}> {/* Increased spacing to 3 */}
                <Grid item xs={12} md={6}>
                  <TextField label="Full Name" fullWidth value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} sx={themedInputStyle} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Email" fullWidth type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} sx={themedInputStyle} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Employee ID" fullWidth value={user.employeeId} disabled sx={themedInputStyle} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Department" fullWidth value={user.department} onChange={(e) => setUser({ ...user, department: e.target.value })} sx={themedInputStyle} />
                </Grid>
              </Grid>
              <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} /> {/* Increased vertical spacing */}
              <Button
                variant="contained"
                onClick={handleSaveProfile}
                disabled={isSaving}
                sx={primaryButtonStyle}
                startIcon={isSaving ? <CircularProgress size={18} color="inherit" sx={{ color: 'black' }} /> : <Save size={18} />}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </CustomTabPanel>

        {/* --- Notifications Tab --- */}
        <CustomTabPanel value={activeTab} index={1}>
          <Grid container spacing={3}> {/* Increased spacing to 3 */}
            {/* Email Notifications */}
            <Grid item xs={12}>
              <Card sx={themedCardStyle}>
                <CardHeader
                  title={<Typography variant="h6" fontWeight="bold" color="white">Email Notifications</Typography>}
                  subheader={<Typography sx={{ color: TEXT_MUTED }}>Configure when you want to receive email alerts</Typography>}
                  sx={{ p: 2, pb: 1 }}
                />
                <CardContent sx={{ p: 2, pt: 1, "&:last-child": { pb: 2 } }}>
                  {notificationEvents.map((event, index) => (
                    <Box key={event.type} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2, borderBottom: index < notificationEvents.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <Mail size={16} style={{ color: TEXT_MUTED }} />
                          <Typography fontWeight="medium">{event.label}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: TEXT_MUTED }}>{event.description}</Typography>
                      </Box>
                      <FormControlLabel
                        control={<Switch checked={notifications[event.type]?.email ?? false} onChange={(e) => handleNotificationToggle(event.type, "email", e.target.checked)} sx={switchStyle} />}
                        label=""
                        sx={{ m: 0 }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            
            {/* SMS Notifications */}
            <Grid item xs={12}>
              <Card sx={themedCardStyle}>
                <CardHeader
                  title={<Typography variant="h6" fontWeight="bold" color="white">SMS Notifications</Typography>}
                  subheader={<Typography sx={{ color: TEXT_MUTED }}>Configure when you want to receive SMS alerts</Typography>}
                  sx={{ p: 2, pb: 1 }}
                />
                <CardContent sx={{ p: 2, pt: 1, "&:last-child": { pb: 2 } }}>
                  {notificationEvents.map((event, index) => (
                    <Box key={event.type} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2, borderBottom: index < notificationEvents.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <MessageSquare size={16} style={{ color: TEXT_MUTED }} />
                          <Typography fontWeight="medium">{event.label}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: TEXT_MUTED }}>{event.description}</Typography>
                      </Box>
                      <FormControlLabel
                        control={<Switch checked={notifications[event.type]?.sms ?? false} onChange={(e) => handleNotificationToggle(event.type, "sms", e.target.checked)} sx={switchStyle} />}
                        label=""
                        sx={{ m: 0 }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Notification Info Card (styled with primary background) */}
            <Grid item xs={12}>
              <Card sx={{ ...themedCardStyle, bgcolor: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', '&:hover': { boxShadow: 'none' } }}>
                <CardContent sx={{ p: 2 }}>
                  <Box display="flex" gap={2}>
                    <Bell size={20} style={{ color: ACCENT_COLOR, flexShrink: 0, marginTop: 4 }} />
                    <Box>
                      <Typography fontWeight="medium">Notification Configuration</Typography>
                      <Typography variant="body2" sx={{ color: TEXT_MUTED }}>
                        SMS notifications are sent to your registered mobile number. Update your contact information in
                        the **Profile** tab if needed.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSaveNotifications}
                disabled={isSaving}
                sx={primaryButtonStyle}
                startIcon={isSaving ? <CircularProgress size={18} color="inherit" sx={{ color: 'black' }} /> : <Save size={18} />}
              >
                {isSaving ? "Saving..." : "Save Notification Preferences"}
              </Button>
            </Grid>
          </Grid>
        </CustomTabPanel>

        {/* --- Security Tab --- */}
        <CustomTabPanel value={activeTab} index={2}>
          <Grid container spacing={3}> {/* Increased spacing to 3 */}
            {/* Change Password Card */}
            <Grid item xs={12}>
              <Card sx={themedCardStyle}>
                <CardHeader
                  title={<Typography variant="h6" fontWeight="bold" color="white">Change Password</Typography>}
                  subheader={<Typography sx={{ color: TEXT_MUTED }}>Update your password to keep your account secure</Typography>}
                  sx={{ p: 2, pb: 1 }}
                />
                <CardContent sx={{ p: 2, pt: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}> {/* Spacing between fields */}
                    <TextField label="Current Password" fullWidth type="password" value={passwordForm.current} onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })} sx={themedInputStyle} />
                    <TextField label="New Password" fullWidth type="password" value={passwordForm.new} onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })} sx={themedInputStyle} />
                    <TextField label="Confirm New Password" fullWidth type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })} sx={themedInputStyle} />
                  </Box>
                  <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Button
                    variant="contained"
                    onClick={handleUpdatePassword}
                    disabled={isSaving}
                    sx={primaryButtonStyle}
                    startIcon={isSaving ? <CircularProgress size={18} color="inherit" sx={{ color: 'black' }} /> : <Shield size={18} />}
                  >
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Two-Factor Authentication Card */}
            <Grid item xs={12}>
              <Card sx={themedCardStyle}>
                <CardHeader
                  title={<Typography variant="h6" fontWeight="bold" color="white">Two-Factor Authentication</Typography>}
                  subheader={<Typography sx={{ color: TEXT_MUTED }}>Add an extra layer of security to your account</Typography>}
                  sx={{ p: 2, pb: 1 }}
                />
                <CardContent sx={{ p: 2, pt: 2, "&:last-child": { pb: 2 } }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" py={1}>
                    <Box>
                      <Typography fontWeight="medium">Enable 2FA</Typography>
                      <Typography variant="body2" sx={{ color: TEXT_MUTED }}>
                        Require a verification code in addition to your password
                      </Typography>
                    </Box>
                    <Switch sx={switchStyle} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Active Sessions Card */}
            <Grid item xs={12}>
              <Card sx={themedCardStyle}>
                <CardHeader
                  title={<Typography variant="h6" fontWeight="bold" color="white">Active Sessions</Typography>}
                  subheader={<Typography sx={{ color: TEXT_MUTED }}>Manage your active login sessions</Typography>}
                  sx={{ p: 2, pb: 1 }}
                />
                <CardContent sx={{ p: 2, pt: 2, "&:last-child": { pb: 2 } }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" py={1.5} borderBottom="1px solid rgba(255, 255, 255, 0.05)">
                    <Box>
                      <Typography fontWeight="medium">Current Session</Typography>
                      <Typography variant="body2" sx={{ color: TEXT_MUTED }}>Chrome on Windows • Active now</Typography>
                    </Box>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      sx={{ 
                        color: TEXT_MUTED, 
                        borderColor: TEXT_MUTED, 
                        '&:hover': { 
                          borderColor: '#ef4444', 
                          color: '#ef4444', 
                          bgcolor: 'rgba(239, 68, 68, 0.1)' 
                        } 
                      }}
                    >
                      Revoke
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
    </DashboardLayout>
  );
}