
import { toast, TypeOptions } from 'react-toastify';

const showToast = (message: string, type: TypeOptions = 'info') => toast(message, { type });

export default showToast;
