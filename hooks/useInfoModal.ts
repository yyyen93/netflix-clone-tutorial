// [1]
import { create } from 'zustand';

// [2]
export interface ModalStoreInterface{
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

// [3] Define hook
/** [3]
 * Define hook
 * (set) : is the parameter
 */
const useInfoModal = create<ModalStoreInterface>((set) => ({
    // [4] Set default movieId 
    movieId: undefined,
    isOpen: false,
    // This movieId is shorthand of movieId: movieId
    openModal: (movieId: string) => set({ isOpen: true, movieId }),
    closeModal: () => set({ isOpen: false, movieId: undefined}),
}));

export default useInfoModal;