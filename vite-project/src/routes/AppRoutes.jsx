import { Routes, Route } from 'react-router-dom';

import DataSiswa from "../pages/DataSiswa";
import EditSiswa from "../pages/EditSiswa";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DataSiswa />} />
            <Route path="/edit-siswa/:id" element={<EditSiswa />} />
        </Routes>
    )
}