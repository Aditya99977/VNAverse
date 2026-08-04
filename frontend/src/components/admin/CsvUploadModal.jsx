import { useState } from "react";
import { toast } from "react-toastify";
import {
    Upload,
    FileSpreadsheet,
    CheckCircle2,
    Info,
} from "lucide-react";

function CsvUploadModal({
    loading,
    onUpload,
    onClose,
}) {

    /*
    =====================================
    States
    =====================================
    */

    const [file, setFile] = useState(null);

    /*
    =====================================
    Handle File Change
    =====================================
    */

    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        if (!selectedFile.name.toLowerCase().endsWith(".csv")) {

            toast.error("Please select a valid CSV file.");

            return;

        }

        setFile(selectedFile);

    };

    /*
    =====================================
    Submit
    =====================================
    */

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!file) {

            return toast.error(
                "Please select a CSV file."
            );

        }

        onUpload(file);

    };

    return (

        <>

            {/* =====================================
                Backdrop
            ===================================== */}

            <div
                className="modal-backdrop fade show"
                onClick={!loading ? onClose : undefined}
            />

            {/* =====================================
                Modal
            ===================================== */}

            <div
                className="modal fade show d-block"
                tabIndex="-1"
            >

                <div className="modal-dialog modal-dialog-centered">

                    <div
                        className="modal-content border-0 rounded-4"
                        style={{
                            background: "#131D31",
                            border: "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        {/* =====================================
                            Header
                        ===================================== */}

                        <div className="modal-header border-0 pb-0">

                            <button
                                className="btn-close btn-close-white ms-auto"
                                onClick={onClose}
                                disabled={loading}
                            />

                        </div>

                        {/* =====================================
                            Body
                        ===================================== */}

                        <form onSubmit={handleSubmit}>

                            <div className="modal-body px-4 pb-4">

                                <div className="text-center mb-4">

                                    <div
                                        className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-4"
                                        style={{
                                            width: 82,
                                            height: 82,
                                            background: "rgba(37,99,235,.12)",
                                            border: "1px solid rgba(37,99,235,.20)",
                                        }}
                                    >

                                        <FileSpreadsheet
                                            size={40}
                                            color="#2563EB"
                                        />

                                    </div>

                                    <h3 className="text-white fw-bold mb-2">

                                        Bulk CSV Upload

                                    </h3>

                                    <p
                                        className="text-secondary mx-auto mb-0"
                                        style={{
                                            maxWidth: 380,
                                        }}
                                    >

                                        Upload a CSV file containing mock test
                                        questions. The platform will process
                                        and import all valid records.

                                    </p>

                                </div>

                                {/* Upload Box */}

                                <div
                                    className="rounded-4 p-4 mb-4"
                                    style={{
                                        background: "#0F172A",
                                        border: "2px dashed rgba(255,255,255,.12)",
                                    }}
                                >

                                    <input
                                        type="file"
                                        accept=".csv"
                                        className="form-control"
                                        onChange={handleFileChange}
                                        disabled={loading}
                                        style={{
                                            background: "#131D31",
                                            color: "#fff",
                                            border: "1px solid rgba(255,255,255,.08)",
                                        }}
                                    />

                                    <small className="text-secondary d-block mt-3">

                                        Only CSV files are supported.

                                    </small>

                                </div>

                                {/* Selected File */}

                                {file && (

                                    <div
                                        className="rounded-4 p-3 mb-4"
                                        style={{
                                            background: "rgba(34,197,94,.10)",
                                            border: "1px solid rgba(34,197,94,.20)",
                                        }}
                                    >

                                        <div className="d-flex align-items-center">

                                            <CheckCircle2
                                                size={20}
                                                color="#22C55E"
                                                className="me-2"
                                            />

                                            <div>

                                                <div className="text-success fw-semibold">

                                                    File Ready

                                                </div>

                                                <small className="text-light">

                                                    {file.name}

                                                </small>

                                            </div>

                                        </div>

                                    </div>

                                )}

                                {/* Information */}

                                <div
                                    className="rounded-4 p-3"
                                    style={{
                                        background: "rgba(59,130,246,.10)",
                                        border: "1px solid rgba(59,130,246,.20)",
                                    }}
                                >

                                    <div className="d-flex">

                                        <Info
                                            size={18}
                                            color="#3B82F6"
                                            className="me-2 mt-1"
                                        />

                                        <small
                                            className="text-secondary"
                                            style={{
                                                lineHeight: 1.7,
                                            }}
                                        >

                                            Ensure the CSV follows the required
                                            template. Invalid rows may be skipped
                                            during import.

                                        </small>

                                    </div>

                                </div>

                            </div>

                            {/* =====================================
                                Footer
                            ===================================== */}

                            <div className="modal-footer border-0 pt-0 px-4 pb-4">

                                <button
                                    type="button"
                                    className="btn btn-outline-light px-4"
                                    onClick={onClose}
                                    disabled={loading}
                                >

                                    Cancel

                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary px-4"
                                    disabled={loading}
                                >

                                    <Upload
                                        size={17}
                                        className="me-2"
                                    />

                                    {loading
                                        ? "Uploading..."
                                        : "Upload CSV"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}

export default CsvUploadModal;