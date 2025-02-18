import React from 'react';
import { FiUpload } from 'react-icons/fi';
import FormSectionTitle from '../public/FormSectionTitle';
import FileUpload from '../public/FileUpload';

function DocumentUploadSection({ control }) {
  return (
    <div className="form-section">
      <FormSectionTitle icon={FiUpload} title="Required Documents" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload
          name="documents.identityProof"
          label="Identity Proof"
          description="Upload Aadhar, PAN , or Voter ID (Max 5MB)"
          accept=".pdf,.jpg,.jpeg,.png"
          control={control}
          required
        />
        <FileUpload
          name="documents.addressProof"
          label="Address Proof"
          description="Upload any government address proof (Max 5MB)"
          accept=".pdf,.jpg,.jpeg,.png"
          control={control}
          required
        />
        <FileUpload
          name="documents.businessLicense"
          label="Business License"
          description="Upload your business registration doc (Max 5MB)"
          accept=".pdf,.jpg,.jpeg,.png"
          control={control}
          required
        />
        <FileUpload
          name="documents.fssaiCertificate"
          label="FSSAI Certificate"
          description="Upload your valid FSSAI license (Max 5MB)"
          accept=".pdf,.jpg,.jpeg,.png"
          control={control}
          required
        />
      </div>
    </div>
  );
}

export default DocumentUploadSection;