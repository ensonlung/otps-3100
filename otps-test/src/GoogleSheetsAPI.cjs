const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const SERVICE_ACCOUNT_FILE = path.join("../csci3100-otps-bf5ca187b911.json");
const SPREADSHEET_ID = "1cimE_VuUp_lK_3b92_tJbh0q_GNDX-nwt2Ts6T1IlqU";

const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

app.post("/api/students/register", async (req, res) => {
    const { studentInfo } = req.body;
    try {
        const client = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: client });
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: "Students",
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            resource: {
                values: studentInfo,
            },
        });
        res.json({ message: "Registration Done", response: response.data });
    } catch (error) {
        console.error("Error adding student info:", error.message);
        res.status(500).send("Error adding student info.");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});