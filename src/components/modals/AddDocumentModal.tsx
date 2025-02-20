import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import useUploadApis from "@/api/upload/useUploadApis";
import showToast from "@/utils/showtoast";

interface IAddDocumentProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelected: (fileName: string) => void;
  onDocumentUploaded: (documentPath: string, documentType: string) => void;
}

const AddDocumentModal = (props: IAddDocumentProps) => {
  const { uploadDocument } = useUploadApis();
  const { isOpen, onClose, onFileSelected, onDocumentUploaded } = props;
  const [selectedFile, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      onFileSelected(file.name);
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      showToast("Please Select File to upload");
      return;
    }

    const formData = new FormData();
    formData.append("doc", selectedFile);

    const { success, response } = await uploadDocument(formData);
    if (!success || !response) return;

    onDocumentUploaded(
      response.document?.documentPath,
      response.document?.mimeType
    );
    setFile(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalBody>
          <ModalHeader>Upload Single Page file to train bot</ModalHeader>
          <CustomInput type="file" name="doc" onChange={handleFileChange} />
          {selectedFile && (
            <span className="text-green-500">
              ✅ File Ready: {selectedFile.name}
            </span>
          )}
        </ModalBody>
        <ModalFooter>
          <CustomButton onPress={handleUpload}>Confirm</CustomButton>
          <CustomButton
            onPress={() => {
              setFile(null);
            }}
          >
            Cancel
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default AddDocumentModal;
