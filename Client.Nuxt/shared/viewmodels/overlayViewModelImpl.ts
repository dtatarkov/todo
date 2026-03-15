import { OverlayViewModel, OverlayViewModelData } from "#shared/interfaces/overlayViewModel";

export class OverlayViewModelImpl extends OverlayViewModel
{
  readonly name = 'overlay';
  
  protected data: OverlayViewModelData = {
    elements: []
  }

  protected async handleInitialization(): Promise<void>
  {
    
  }
} 