import { useEffect, useState } from "react";
import axios from "axios";

export function useSession() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/auth/session", { withCredentials: true });
                setUser(res.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}
