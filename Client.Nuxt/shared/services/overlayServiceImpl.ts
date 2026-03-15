import { OverlayService } from "#shared/interfaces/overlayService";
import { OverlayElement } from "#shared/interfaces/overlayElement";

export class OverlayServiceImpl extends OverlayService {
  getElements(): OverlayElement[]
  {
    return [];
  }

  subscribeToElementChanges(handler: Action): void
  {
     
  }

  unsubscribeFromElementChanges(handler: Action): void
  {
    
  }  
}