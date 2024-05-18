import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Layout from "../components/plantilla/Layout";
import { useAuth } from "../providers/AuthContext";

const DashBoard = () => {
    const { userAuth, logout } = useAuth();

    return (
        <>
            <Layout menu_active="inicio"> dashboard </Layout>
        </>
    )
}

export default DashBoard