import { ViewModelBase } from "@/viewmodels/viewmodelBase";
import type { OverlayElement } from "~/interfaces/overlayElement";

export type OverlayViewModelData = {
  elements: OverlayElement[];
};

export abstract class OverlayViewModel extends ViewModelBase<OverlayViewModelData> { }

