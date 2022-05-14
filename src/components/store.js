import create from "zustand";
import { bg1 } from "../assets";

const useStore = create((set, get) => ({
  selectedShape: null,
  texts: [],
  containers: [],
  setTexts: (texts) => set(() => ({ texts })),
  setContainers: (containers) => set(() => ({ containers })),
  addText: (text) => set(() => ({ texts: [...get()?.texts, text] })),
  addContainer: (container) =>
    set(() => ({ containers: [...get()?.containers, container] })),
  setSelectedShape: (shape) =>
    set(() => ({
      selectedShape: shape,
    })),
  selectedBackground: bg1,
  setSelectedBackground: (image) => set(() => ({ selectedBackground: image })),
}));
export default useStore;
