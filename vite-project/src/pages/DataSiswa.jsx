import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";


export default function DataSiswa() {
    const [allSiswa, setAllSiswa] = useState([]);
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jurusan, setJurusan] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios
            .get("http://localhost:3000/api/datasiswa/")
            .then(response => {
                setAllSiswa(response.data)
                console.log(response.data)
            })
            .catch(error => {
                alert(error);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/api/datasiswa/", {
                nama_siswa: nama,
                alamat_siswa: alamat,
                tgl_siswa: tanggal,
                jurusan_siswa: jurusan
            })
            .then(response => {
                setNama("");
                setAlamat("");
                setTanggal("");
                setJurusan("");
                console.log(response);
                fetchData();
            })
            .catch(error => {
                alert("Gagal menyimpan data:", error);
            })
            .finally(() => {
                const modalEl = document.getElementById("exampleModal");
                const modalInstance = Modal.getOrCreateInstance(modalEl);
                modalInstance.hide();
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelectorAll('.modal-backdrop');
                backdrop.forEach(bd => bd.remove());
            })

    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Apakah kamu yakin akan menghapus data ini?"
        );
        if (!confirmDelete) return;
        axios
            .delete(`http://localhost:3000/api/datasiswa/${id}`)
            .then(response => {
                fetchData()
            })
            .catch(error => {
                alert(error);
            })
    }

    const handleEdit = (id) => {
        navigate(`/edit-siswa/${id}`);
    }

    return (
        <>
            <div className="container-fluid mt-5 px-4">
                <div className="card shadow-lg rounded-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="m-0">Data Siswa</h3>
                            <button className="btn btn-primary rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                + Tambah Siswa
                            </button>
                        </div>
                        <table className="table table-hover table-striped align-middle" style={{ width:'1000px' }}>
                            <thead className="table-primary">
                                <tr>
                                    <th>Kode Siswa</th>
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Jurusan</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allSiswa.map((siswa, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{siswa.nama_siswa}</td>
                                        <td>{siswa.alamat_siswa}</td>
                                        <td>{siswa.tgl_siswa}</td>
                                        <td>{siswa.jurusan_siswa}</td>
                                        <td>
                                            <button className="btn btn-warning m-2" onClick={() => handleEdit(siswa.kode_siswa)}>
                                                ✏️ Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(siswa.kode_siswa)}>
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">TAMBAH SISWA</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInputNama"
                                        placeholder="Nama Siswa"
                                        value={nama}
                                        onChange={(e) => setNama(e.target.value)}
                                    />
                                    <label htmlFor="floatingInputNama">Nama</label>
                                </div>
                                <div className="form-floating mb-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingAlamat"
                                        placeholder="Alamat Siswa"
                                        value={alamat}
                                        onChange={(e) => setAlamat(e.target.value)}
                                    />
                                    <label htmlFor="floatingAlamat">Alamat</label>
                                </div>
                                <div className="form-floating mb-1">
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dateInput"
                                        placeholder="Tanggal Lahir"
                                        value={tanggal}
                                        onChange={(e) => setTanggal(e.target.value)}
                                    />
                                    <label htmlFor="dateInput">Tanggal Lahir</label>
                                </div>
                                <div className="form-floating mb-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingJurusan"
                                        placeholder="Jurusan Siswa"
                                        value={jurusan}
                                        onChange={(e) => setJurusan(e.target.value)}
                                    />
                                    <label htmlFor="floatingJurusan">Jurusan</label>
                                </div>
                                <button className="btn btn-primary col-12">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}