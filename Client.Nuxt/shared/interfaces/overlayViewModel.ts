import { ViewModelBase } from "#shared/viewmodels/viewmodelBase";
import { ViewElement } from "#shared/interfaces/viewElement";

export type OverlayViewModelData = {
  elements: ViewElement[];
};

export abstract class OverlayViewModel extends ViewModelBase<OverlayViewModelData> { }

