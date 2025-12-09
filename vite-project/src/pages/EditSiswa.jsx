import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditSiswa() {
    const { id } = useParams();
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jurusan, setJurusan] = useState("");
    const [jenkel, setJenkel] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchDataById()
    }, [])

    const fetchDataById = () => {
        
        axios
            .get(`http://localhost:3000/api/datasiswa/${id}`)
            .then(response => {
                const myData = response.data;
                setNama(myData.nama_siswa);
                setAlamat(myData.alamat_siswa);
                setTanggal(myData.tgl_siswa ? myData.tgl_siswa.split("T")[0] : "");
                setJurusan(myData.jurusan_siswa);
                setJenkel(myData.jenis_kelamin);
            })
            .catch(error => {
                console.error("Gagal mengambil data Siswa:", error.response?.data || error.message);
                
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:3000/api/datasiswa/${id}`, {
                nama_siswa: nama,
                alamat_siswa: alamat,
                tgl_siswa: tanggal,
                jurusan_siswa: jurusan,
                jenis_kelamin: jenkel
            })
            .then(response => {
                console.log(response);
                var messege = response.data.message;
                if (messege) {
                    alert('Data berhasil diupdate');
                }
            })
            .catch(error => {
                alert("Gagal mengupdate data:", error);
            })
            .finally(() => {
                navigate('/');
            })
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className="container-fluid mt-5 px-4">
            <div className="card shadow-lg rounded-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className='mb-0'>Edit Data Siswa</h5>
                        <button className="btn btn-primary rounded-pill px-4" onClick={handleBack} >
                            Kembali
                        </button>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className="form-floating mb-1" style={{ width: '500px' }}>
                            <input
                                type="text"
                                className='form-control'
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                            />
                            <label htmlFor="floatingNama">Nama Siswa</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input
                                type="text"
                                className='form-control'
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}
                            />
                            <label htmlFor="floatingAlamat">Alamat Siswa</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input
                                type="date"
                                className='form-control'
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                            />
                            <label htmlFor="floatingTanggal">Tanggal Lahir Siswa</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input
                                type="text"
                                className='form-control'
                                value={jurusan}
                                onChange={(e) => setJurusan(e.target.value)}
                            />
                            <label htmlFor="floatingJurusan">Jurusan Siswa</label>
                        </div>
                        <div className="form-floating mb-1">
                            <select
                                className="form-select"
                                id="floatingJenkel"
                                value={jenkel}
                                onChange={(e) => setJenkel(e.target.value)}
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                            <label htmlFor="floatingJenkel">Jenis Kelamin</label>
                        </div>
                        <button type="submit" className='btn btn-primary w-100'>
                            Edit
                        </button>
                    </form>

                </div>
            </div>
        </div>

    )
}

