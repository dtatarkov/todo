import { ViewModelBase } from "#shared/viewmodels/viewmodelBase";
import type { OverlayElement } from "#shared/entities/overlay/overlayElement";

export type OverlayViewModelData = {
  elements: OverlayElement[];
};

export abstract class OverlayViewModel extends ViewModelBase<OverlayViewModelData> { }

