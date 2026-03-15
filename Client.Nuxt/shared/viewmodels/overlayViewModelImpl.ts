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
    
    const observableElements = this.overlayService.getElements();
    const elements = observableElements.get();
    
    this.setData({
      elements
    });    
    
    const unsubscribe = observableElements.subscribe(elements => {
      this.setData({
        elements
      });
    });
    
    this.addDestroyHandler(unsubscribe);
  }
} 