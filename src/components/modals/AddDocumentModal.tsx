import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";



interface IAddDocumentProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDocumentModal = (props: IAddDocumentProps) => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalBody>
          <ModalHeader>Upload Single Page file to train bot</ModalHeader>
          <CustomInput type="file" name="doc" />
        </ModalBody>
        <ModalFooter>
          <CustomButton>Confirm</CustomButton>
          <CustomButton>Cancel</CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default AddDocumentModal;
