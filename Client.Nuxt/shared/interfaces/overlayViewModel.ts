import { ViewModelBase } from "#shared/viewmodels/viewmodelBase";
import type { OverlayElement } from "#shared/entities/overlayElement";

export type OverlayViewModelData = {
  elements: OverlayElement[];
};

export abstract class OverlayViewModel extends ViewModelBase<OverlayViewModelData> { }

