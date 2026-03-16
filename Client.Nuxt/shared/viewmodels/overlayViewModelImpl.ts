import { OverlayViewModel, OverlayViewModelData } from "#shared/interfaces/overlayViewModel";
import type { OverlayService } from "#shared/interfaces/overlayService";

export class OverlayViewModelImpl extends OverlayViewModel
{
  readonly name = 'overlay';
  
  protected data: OverlayViewModelData = {
    elements: []
  }
  
  constructor(private overlayService: OverlayService)
  {
    super();
  }

  protected override handleInitialization(): void
  {
    super.handleInitialization();
    
    const elements = this.overlayService.getElements();
    
    this.setData({
      elements
    });    
    
    const unsubscribe = this.overlayService.onElementsChange(elements => {
      this.setData({
        elements: elements
      });
    });
    
    this.addDestroyHandler(unsubscribe);
  }
} 