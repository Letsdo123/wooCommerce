import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon,
    DocumentTextIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import DataGridComp from './DataGridComp';


// const gridOptions = {
//     modules: [ClientSideRowModelModule],
// };

function UserApprovalGrid({ data }) {
    const [selectedUser, setSelectedUser] = useState(null); // It is setting the user details
    const [showApproveModal, setShowApproveModal] = useState(false); // It's toggle the visibility of the approval modal
    const [showRejectModal, setShowRejectModal] = useState(false); // It's toggle the visibility of the rejection modal
    const [comment, setComment] = useState(''); // It's setting the comment for the approval/rejection modal
    const [showDocumentViewer, setShowDocumentViewer] = useState(false); // It's helps to show the document
    const [selectedDocument, setSelectedDocument] = useState(null); // It select the document

    // Mock multiple users for demonstration
    // const users = [
    //     { ...data, id: 1 },
    //     {
    //         ...data,
    //         id: 2,
    //         details: {
    //             ...data.details,
    //             basic_details: {
    //                 ...data.details.basic_details,
    //                 business_name: "ABC Corp",
    //                 owner_name: "Jane Smith"
    //             }
    //         },
    //         status: "Approved"
    //     },
    //     {
    //         ...data,
    //         id: 3,
    //         details: {
    //             ...data.details,
    //             basic_details: {
    //                 ...data.details.basic_details,
    //                 business_name: "XYZ Industries",
    //                 owner_name: "Mike Johnson"
    //             }
    //         },
    //         status: "Rejected"
    //     }
    // ];

    // This is the dummy data
    const mockData = [
        {
            _id: "67b37cb645e28a847aa842fc",
            entityType: "User",
            entityId: 7,
            details: {
                basic_details: {
                    business_name: "RCCIIT",
                    owner_name: "Rcc Institute of Information technology",
                    business_email: "pramaniksoham1@gmail.com",
                    business_mobile: "9564689847",
                    gstin: "GST00125432",
                    delivery_capacity: "249"
                },
                address: {
                    address: "Beleghata,Kolkata-700015",
                    city: "Kolkata",
                    state: "West bengal",
                    country: "india",
                    postalCode: "700015"
                },
                bank: {
                    account_holder_name: "rcc",
                    bank_name: "uco",
                    account_number: "12356855",
                    ifsc_code: "sbin0013436",
                    upi_id: "744582288@ybl",
                    account_type: "current"
                }
            },
            documents: [
                {
                    documentType: "identityproof",
                    publicId: "woocommerce/seller_documents/fyleawjbycwqtp3wkgi1.pdf",
                    fileType: "raw",
                },
                {
                    documentType: "addressproof",
                    publicId: "woocommerce/seller_documents/zkwyyg2onoprcrwfv1sy.pdf",
                    fileType: "raw",
                },
                {
                    documentType: "businesslicense",
                    publicId: "woocommerce/seller_documents/cbljvwiqsbpz71fboyxe.pdf",
                    fileType: "raw",
                },
                {
                    documentType: "fssaicertificate",
                    publicId: "woocommerce/seller_documents/ctynkym6ftevmuqduxyv.pdf",
                    fileType: "raw",
                }
            ],
            status: "Pending",
            comments: "",
        },
        {
            _id: "67b37cb645e28a847aa842fc",
            entityType: "User",
            entityId: 7,
            details: {
                basic_details: {
                    business_name: "PGEC",
                    owner_name: "Purulia Institute of Information technology",
                    business_email: "pramaniksoham1@gmail.com",
                    business_mobile: "9564689847",
                    gstin: "GST00125432",
                    delivery_capacity: "249"
                },
                address: {
                    address: "Beleghata,Kolkata-700015",
                    city: "Kolkata",
                    state: "West bengal",
                    country: "india",
                    postalCode: "700015"
                },
                bank: {
                    account_holder_name: "rcc",
                    bank_name: "uco",
                    account_number: "12356855",
                    ifsc_code: "sbin0013436",
                    upi_id: "744582288@ybl",
                    account_type: "current"
                }
            },
            documents: [
                {
                    documentType: "identityproof",
                    publicId: "woocommerce/seller_documents/fyleawjbycwqtp3wkgi1.pdf",
                    fileType: "raw",
                },
                {
                    documentType: "addressproof",
                    publicId: "woocommerce/seller_documents/zkwyyg2onoprcrwfv1sy.pdf",
                    fileType: "raw",
                },
                {
                    documentType: "businesslicense",
                    publicId: "woocommerce/seller_documents/cbljvwiqsbpz71fboyxe.pdf",
                    fileType: "raw",
                },
                {
                    documentType: "fssaicertificate",
                    publicId: "woocommerce/seller_documents/ctynkym6ftevmuqduxyv.pdf",
                    fileType: "raw",
                }
            ],
            status: "Pending",
            comments: "",
        }
    ];

    // const mockData = [
    //     { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, status: 'Active' },
    //     { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, status: 'Inactive' },
    //     { id: 3, name: 'Alice Brown', email: 'alice@example.com', age: 24, status: 'Pending' },
    //     { id: 4, name: 'Bob Johnson', email: 'bob@example.com', age: 40, status: 'Active' },
    //     { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', age: 36, status: 'Inactive' },
    //   ];

    // This is the action buttons
    const ActionRenderer = (props) => {
        return (
            <div className="flex gap-2">
                <button
                    onClick={() => setSelectedUser(props.data)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="View Details"
                >
                    <Eye className="w-5 h-5 text-blue-600" />
                </button>
                <button
                    onClick={() => handleApproval(props.data)}
                    className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    title="Approve"
                >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                </button>
                <button
                    onClick={() => handleApproval(props.data)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Reject"
                >
                    <XCircle className="w-5 h-5 text-red-600" />
                </button>
            </div>
        );
    };

    // This is the column
    const columnDefs = [
        {
            headerName: 'Business Name',
            field: 'details.basic_details.business_name',
            sortable: true,
            filter: true,
            flex: 2
        },
        {
            headerName: 'Owner Name',
            field: 'details.basic_details.owner_name',
            sortable: true,
            filter: true,
            flex: 2
        },
        {
            headerName: 'Email',
            field: 'details.basic_details.business_email',
            sortable: true,
            filter: true,
            flex: 2
        },
        {
            headerName: 'Mobile',
            field: 'details.basic_details.business_mobile',
            sortable: true,
            filter: true,
            flex: 1
        },
        {
            headerName: 'Status',
            field: 'status',
            sortable: true,
            filter: true,
            flex: 1,
            cellRenderer: (params) => (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${params.value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    params.value === 'Approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Actions',
            cellRenderer: ActionRenderer,
            flex: 1,
            minWidth: 150
        }
    ];
    // const columnDefs = [
    //     { field: 'id', headerName: 'ID', width: 90 },
    //     { field: 'name', headerName: 'Name', width: 150 },
    //     { field: 'email', headerName: 'Email', width: 200 },
    //     { field: 'age', headerName: 'Age', width: 100, type: 'number' },
    //     { field: 'status', headerName: 'Status', width: 120 },
    //   ];

    const handleApprove = () => {
        console.log('Approved with comment:', comment);
        setShowApproveModal(false);
        setComment('');
    };

    const handleReject = () => {
        console.log('Rejected with comment:', comment);
        setShowRejectModal(false);
        setComment('');
    };

    const handleViewDocument = (document) => {
        setSelectedDocument(document);
        setShowDocumentViewer(true);
    };

    // this take desicion of the bedge color according to the staus
    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Main Grid */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">User Approval Requests</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-white text-gray-600 rounded-lg border hover:bg-gray-50">
                                Export
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* List View */}
                    {!selectedUser && (
                        <div className="p-8">
                            <div className="max-w-7xl mx-auto">
                                <div className="bg-white rounded-lg shadow-md">
                                    <div className="p-6">
                                        <div className="ag-theme-alpine w-full h-[600px]">
                                            <AgGridReact
                                                rowData={mockData}
                                                columnDefs={columnDefs}
                                                pagination={true}
                                                paginationPageSize={10}
                                                domLayout='autoHeight'
                                                rowHeight={60}
                                                headerHeight={48}
                                                defaultColDef={{
                                                    resizable: true,
                                                    sortable: true,
                                                    filter: true
                                                }}
                                            />
                                            {/* <DataGridComp rows={mockData} columns={columnDefs}/> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Detail View */}
                    {selectedUser && (
                        <div>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="mb-6 text-primary hover:text-primary/80 flex items-center"
                            >
                                <ChevronRightIcon className="h-5 w-5 rotate-180 mr-1" />
                                Back to List
                            </button>

                            <div className="border rounded-lg p-6 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Basic Details Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-primary">Basic Details</h3>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-gray-500">Business Name</span>
                                                <p className="font-medium">{selectedUser.details.basic_details.business_name}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Owner Name</span>
                                                <p className="font-medium">{selectedUser.details.basic_details.owner_name}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Email</span>
                                                <p className="font-medium">{selectedUser.details.basic_details.business_email}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Mobile</span>
                                                <p className="font-medium">{selectedUser.details.basic_details.business_mobile}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">GSTIN</span>
                                                <p className="font-medium">{selectedUser.details.basic_details.gstin}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-primary">Address Details</h3>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-gray-500">Address</span>
                                                <p className="font-medium">{selectedUser.details.address.address}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">City</span>
                                                <p className="font-medium">{selectedUser.details.address.city}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">State</span>
                                                <p className="font-medium">{selectedUser.details.address.state}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Country</span>
                                                <p className="font-medium">{selectedUser.details.address.country}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Postal Code</span>
                                                <p className="font-medium">{selectedUser.details.address.postalCode}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bank Details Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-primary">Bank Details</h3>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-gray-500">Account Holder</span>
                                                <p className="font-medium">{selectedUser.details.bank.account_holder_name}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Bank Name</span>
                                                <p className="font-medium">{selectedUser.details.bank.bank_name}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Account Number</span>
                                                <p className="font-medium">{selectedUser.details.bank.account_number}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">IFSC Code</span>
                                                <p className="font-medium">{selectedUser.details.bank.ifsc_code}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">UPI ID</span>
                                                <p className="font-medium">{selectedUser.details.bank.upi_id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Documents Section */}
                            <div className="border rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-primary mb-4">Documents</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {selectedUser.documents.map((doc) => (
                                        <div
                                            key={doc.publicid}
                                            className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                                            onClick={() => handleViewDocument(doc)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <DocumentTextIcon className="h-8 w-8 text-primary" />
                                                <div>
                                                    <p className="font-medium">{doc.documentType}</p>
                                                    <p className="text-sm text-gray-500">{doc.fileType}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedUser.status === 'Pending' && (
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        onClick={() => setShowApproveModal(true)}
                                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => setShowRejectModal(true)}
                                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        <XCircleIcon className="h-5 w-5 mr-2" />
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Approve Modal */}
            {showApproveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 max-w-lg w-full">
                        <h3 className="text-xl font-semibold mb-4">Approve User</h3>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment (optional)"
                            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-primary focus:border-transparent"
                            rows="4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowApproveModal(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApprove}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Confirm Approval
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 max-w-lg w-full">
                        <h3 className="text-xl font-semibold mb-4">Reject User</h3>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Please provide a reason for rejection"
                            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-primary focus:border-transparent"
                            rows="4"
                            required
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Document Viewer Modal */}
            {showDocumentViewer && selectedDocument && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 max-w-4xl w-full h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">
                                {selectedDocument.documentType}
                            </h3>
                            <button
                                onClick={() => setShowDocumentViewer(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <XCircleIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="h-[calc(100%-4rem)] bg-gray-100 rounded-lg p-4">
                            {/* Placeholder for PDF Viewer - Replace with actual PDF viewer component */}
                            <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg">
                                <div className="text-center">
                                    <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">
                                        PDF Viewer will be integrated here
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Document ID: {selectedDocument.publicId}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserApprovalGrid;