import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress, // Import for loading spinner
} from "@mui/material";
import { Bot, LogIn } from "lucide-react"; // Added LogIn icon for extra touch
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// --- Theme Styles Mapping ---
const themeStyles = {
  // Main container background and text color
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000", // Black background
    color: "#ffffff",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  // Dark card style with green accents (inspired by featureCard)
  card: {
    borderRadius: "1rem", // Slightly more rounded than before
    background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.6))', // Dark, semi-transparent background
    border: '1px solid rgba(16, 185, 129, 0.3)', // Subtle green border
    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.1), 0 0 10px rgba(0,0,0,0.5)', // Subtle shadow
    backdropFilter: 'blur(10px)',
    p: 3, // Increased padding
  },
  // Input field styles (TextField and Select)
  inputField: {
    borderRadius: "0.5rem", // Slightly rounded
    backgroundColor: "rgba(17, 24, 39, 0.7)", // Darker input background
    border: "1px solid rgba(16, 185, 129, 0.2)", // Thin green border
    boxShadow: "none",
    fontSize: 14,
    color: "white",
    "&::placeholder": { fontSize: 12, color: "rgba(255,255,255,0.6)" },
    "& fieldset": { border: "none" }, // Hide default MUI border
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
  },
  // Primary button style (green gradient)
  primaryButton: {
    mt: 2,
    textTransform: "none",
    borderRadius: "0.5rem",
    fontSize: 14,
    py: 1.2,
    background: 'linear-gradient(to right, #34d399, #10b981)', // Green gradient
    color: '#000000',
    fontWeight: 600,
    transition: 'all 0.3s',
    "&:hover": {
        background: 'linear-gradient(to right, #10b981, #059669)', // Darker hover
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
        transform: 'translateY(-2px)',
    },
    "&.Mui-disabled": { // Style for disabled state
      background: 'rgba(52, 211, 153, 0.5)',
      color: '#333333',
    }
  },
  // Logo Icon Container
  logoIconContainer: {
    width: 48,
    height: 48,
    background: 'linear-gradient(to bottom right, #34d399, #10b981, #14b8a6)',
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: "auto",
    mb: 1,
    boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)', // Green glow
    overflow: 'hidden',
    position: 'relative',
  },
  // Typography
  titleText: {
    fontWeight: 800,
    fontSize: 28,
    background: 'linear-gradient(to right, #f3f4f6, #ffffff, #d1d5db)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitleText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: 300,
  },
  linkText: {
    color: "#34d399", // Green link color
    textDecoration: "underline",
    "&:hover": {
      color: "#10b981",
    }
  },
  // Floating Orbs for the landing page theme
  floatingOrb1: {
    position: 'absolute',
    top: '5rem',
    left: '25%',
    width: '24rem',
    height: '24rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    animation: 'floatingGlow 4s ease-in-out infinite',
    zIndex: 0,
  },
  floatingOrb2: {
    position: 'absolute',
    bottom: 0,
    right: '25%',
    width: '24rem',
    height: '24rem',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    animation: 'floatingGlow 4s ease-in-out infinite',
    animationDelay: '2s',
    zIndex: 0,
  }
};


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // admin / employee
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Email, password and role are required ❌");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid credentials ❌");
      } else {
        // Successful login
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message || "Login successful ✅");

        // Redirect based on role returned by backend
        if (data.user.role === "admin") {
          navigate("/adminDashboard");
        } else if (data.user.role === "employee") {
          navigate("/employeedashboard");
        } else {
          navigate("/"); // fallback
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={themeStyles.container}>
      {/* CSS Keyframes (replicate from LandingPage) */}
      <style>{`
        @keyframes floatingGlow {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.6;
          }
        }
        .MuiFormLabel-root { color: #9ca3af !important; } /* Label color */
        .MuiInputLabel-shrink { color: #34d399 !important; } /* Focused label color */
      `}</style>

      {/* Background Orbs */}
      <Box sx={themeStyles.floatingOrb1} />
      <Box sx={themeStyles.floatingOrb2} />

      <Box sx={{ width: "100%", maxWidth: 400, position: 'relative', zIndex: 10 }}>
        {/* Logo */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box sx={themeStyles.logoIconContainer}>
            <Bot size={24} color="black" strokeWidth={2.5} style={{ position: 'relative', zIndex: 10 }} />
          </Box>
          <Typography variant="h4" sx={themeStyles.titleText}>
            POWERGRID IT Support
          </Typography>
          <Typography variant="body2" sx={themeStyles.subtitleText}>
            Sign in to your account
          </Typography>
        </Box>

        {/* Login Card */}
        <Card sx={themeStyles.card}>
          <CardHeader
            sx={{ pt: 1, pb: 2 }}
            title={
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 22,
                }}
              >
                Welcome Back
              </Typography>
            }
            subheader={
              <Typography
                variant="caption"
                sx={{ display: "flex", justifyContent: "center", color: "#6b7280", fontSize: 12 }}
              >
                Enter your credentials to access the unified ticketing system
              </Typography>
            }
          />

          <CardContent sx={{ py: 1 }}>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Email Address"
                  placeholder="employee@powergrid.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="dense"
                  InputProps={{ sx: themeStyles.inputField }}
                />
              </Box>

              {/* Role Dropdown */}
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="role-select-label" sx={{ color: '#9ca3af' }}>Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                    MenuProps={{ PaperProps: { sx: { backgroundColor: '#111827', color: 'white' } } }}
                    sx={{
                      ...themeStyles.inputField,
                      "& .MuiSelect-select": { py: '12.5px' },
                      "& .MuiSelect-icon": { color: "#34d399" }, // Green icon
                    }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Password */}
              <Box sx={{ mb: 1 }}>
                <TextField
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="dense"
                  InputProps={{ sx: themeStyles.inputField }}
                />
              </Box>

              {/* Sign In Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
                sx={themeStyles.primaryButton}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" sx={{ color: 'black' }} />
                ) : (
                  <>
                    <LogIn size={18} style={{ marginRight: 8 }} /> Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardActions sx={{ justifyContent: "center", mb: 1, py: 0.5 }}>
            <Typography variant="caption" sx={{ color: "#6b7280", fontSize: 12 }}>
              Don't have an account?{" "}
              <a href="/signup" style={themeStyles.linkText}>
                Sign up
              </a>
            </Typography>
          </CardActions>
        </Card>

        <Typography
          variant="caption"
          sx={{ display: "block", textAlign: "center", color: "#4b5563", mt: 4, fontSize: 11 }}
        >
          For IT support issues, contact <a href="mailto:helpdesk@powergrid.com" style={{ color: "#34d399" }}>helpdesk@powergrid.com</a>
        </Typography>
      </Box>
    </Box>
  );
}