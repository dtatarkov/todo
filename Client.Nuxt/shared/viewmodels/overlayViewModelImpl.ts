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

  protected async handleInitialization(): Promise<void>
  {
    const observableElements = this.overlayService.getElements();
    const elements = observableElements.get();
    
    this.setData({
      elements
    });    
    
    observableElements.subscribe(elements => {
      this.setData({
        elements
      });
    });
  }
} 