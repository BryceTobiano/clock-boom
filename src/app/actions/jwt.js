import { jwtDecode } from "jwt-decode";

export function getUserIdFromToken(token) {
    if (!token) {
        return null; // Handle case where token is missing
    }

    try {
        const decoded = jwtDecode(token);
        return decoded?.user_id|| null; // Adjust based on your JWT structure
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
}
