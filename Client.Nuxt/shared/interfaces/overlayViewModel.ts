import { ViewModelBase } from "#shared/viewmodels/viewmodelBase";
import type { OverlayElement } from "#shared/interfaces/overlayElement";

export type OverlayViewModelData = {
  elements: OverlayElement[];
};

export abstract class OverlayViewModel extends ViewModelBase<OverlayViewModelData> { }

