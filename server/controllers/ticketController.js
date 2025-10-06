import { db } from "../config/firebaseAdmin.js";
import { sendEmail } from "../services/mailService.js";
import { sendSMS } from "../services/smsService.js";

// Ticket Create
export const createTicket = async (req, res) => {
  try {
    const { employeeEmail, employeePhone, subject, description, notifyType } = req.body;

    const ticketRef = await db.collection("tickets").add({
      employeeEmail,
      employeePhone,
      subject,
      description,
      status: "open",
      createdAt: new Date(),
    });

    // ✅ Send only based on notifyType
    if (notifyType === "email") {
      await sendEmail(
        employeeEmail,
        `Ticket Created: ${subject}`,
        `Your ticket "${subject}" has been created successfully.`
      );
    } else if (notifyType === "sms" && employeePhone) {
      await sendSMS(
        employeePhone,
        `Your ticket "${subject}" has been created successfully.`
      );
    }

    res.json({ id: ticketRef.id, message: `Ticket created & ${notifyType} sent!` });
  } catch (error) {
    console.error("Ticket Creation Error:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};


//Ticket inProgress
export const inProgressTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { notifyType } = req.body; // 👈 from frontend

    if (notifyType === "email") {
      await sendEmail("user@gmail.com", "Ticket In Progress", `Your ticket ${ticketId} is now in progress ⚡`);
    } else if (notifyType === "sms") {
      await sendSMS("+91XXXXXXXXXX", `Your ticket ${ticketId} is in progress ⚡`);
    }

    res.json({ message: `Ticket ${ticketId} marked as in-progress (${notifyType}) ✅` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Ticket Resolve

export const resolveTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { notifyType } = req.body; // 👈 same approach

    const ticketRef = db.collection("tickets").doc(ticketId);
    const ticketDoc = await ticketRef.get();

    if (!ticketDoc.exists) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    await ticketRef.update({ status: "resolved", resolvedAt: new Date() });

    const { employeeEmail, employeePhone, subject } = ticketDoc.data();

    if (notifyType === "email") {
      await sendEmail(
        employeeEmail,
        `Ticket Resolved: ${subject}`,
        `Your ticket "${subject}" has been resolved successfully.`
      );
    } else if (notifyType === "sms" && employeePhone) {
      await sendSMS(
        employeePhone,
        `Your ticket "${subject}" has been resolved successfully.`
      );
    }

    res.json({ message: `Ticket resolved & ${notifyType} sent ✅` });
  } catch (error) {
    console.error("Ticket Resolve Error:", error);
    res.status(500).json({ error: "Failed to resolve ticket" });
  }
};
