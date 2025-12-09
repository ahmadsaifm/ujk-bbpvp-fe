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
    const [jenkel, setJenkel] = useState("");

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
                alert("Gagal mengambil data", error);
            })
    }
    
    const openModal = () => {
        const modalEl = document.getElementById("exampleModal");
        const modalInstance = Modal.getOrCreateInstance(modalEl);
        modalInstance.show();
    }

    const closeModal = () => {
        const modalEl = document.getElementById("exampleModal");
        const modalInstance = Modal.getInstance(modalEl);
        modalInstance.hide();

        document.body.classList.remove('modal-open');
        const backdrop = document.querySelectorAll('.modal-backdrop');
        backdrop.forEach(bd => bd.remove());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/api/datasiswa/", {
                nama_siswa: nama,
                alamat_siswa: alamat,
                tgl_siswa: tanggal,
                jurusan_siswa: jurusan,
                jenis_kelamin: jenkel
            })
            .then(response => {
                setNama("");
                setAlamat("");
                setTanggal("");
                setJurusan("");
                setJenkel("");
                console.log(response);
                fetchData();
            })
            .catch(error => {
                alert("Gagal menyimpan data:", error);
            })
            .finally(() => {
                closeModal();
            });
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
                            <button type="submit" className="btn btn-primary rounded-pill px-4" data-bs-target="#exampleModal" onClick={openModal}>
                                + Tambah Siswa
                            </button>
                        </div>
                        <table className="table table-hover table-striped align-middle" style={{ width: '1000px' }}>
                            <thead className="table-primary">
                                <tr>
                                    <th>Kode Siswa</th>
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Jurusan</th>
                                    <th>Jenis Kelamin</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allSiswa.map((siswa, index) => (
                                    <tr key={index}>
                                        <td>{siswa.kode_siswa}</td>
                                        <td>{siswa.nama_siswa}</td>
                                        <td>{siswa.alamat_siswa}</td>
                                        <td>{siswa.tgl_siswa}</td>
                                        <td>{siswa.jurusan_siswa}</td>
                                        <td>{siswa.jenis_kelamin}</td>
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={closeModal}></button>
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
                                <button className="btn btn-primary col-12">Simpan</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}