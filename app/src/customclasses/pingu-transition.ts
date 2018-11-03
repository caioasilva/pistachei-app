import {Animation, PageTransition} from "ionic-angular";
import {isPresent} from "ionic-angular/util/util";

const DURATION = 1000;
const EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
const OPACITY = 'opacity';
const TRANSFORM = 'transform';
const TRANSLATEX = 'translateX';
const CENTER = '0%';
const OFF_OPACITY = 1;


export class PinguTransition extends PageTransition {

  init() {
    super.init();

    const plt = this.plt;
    const OFF_RIGHT = plt.isRTL ? '-100%' : '100%';
    const OFF_LEFT = plt.isRTL ? '100%' : '-100%';
    const enteringView = this.enteringView;
    const leavingView = this.leavingView;
    const opts = this.opts;

    this.duration(isPresent(opts.duration) ? opts.duration : DURATION);
    this.easing(isPresent(opts.easing) ? opts.easing : EASING);

    const backDirection = (opts.direction === 'back');
    const enteringHasNavbar = (enteringView && enteringView.hasNavbar());
    const leavingHasNavbar = (leavingView && leavingView.hasNavbar());

    if (enteringView) {
      // get the native element for the entering page
      const enteringPageEle: Element = enteringView.pageRef().nativeElement;

      // entering content
      const enteringContent = new Animation(plt, enteringView.contentRef());
      enteringContent.element(enteringPageEle.querySelectorAll('ion-header > *:not(ion-navbar),ion-footer > *'));
      this.add(enteringContent);

      if (backDirection) {
        // entering content, back direction
        enteringContent
          .fromTo(TRANSLATEX, OFF_LEFT, CENTER, true)
          .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY, false);

      } else {
        // entering content, forward direction
        enteringContent
          .beforeClearStyles([OPACITY])
          .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY, false)
          .fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
      }

      if (enteringHasNavbar) {
        // entering page has a navbar
        const enteringNavbarEle = enteringPageEle.querySelector('ion-header');
        const enteringNavBar = new Animation(plt, enteringNavbarEle);
        this.add(enteringNavBar);

        enteringNavBar.fromTo(OPACITY, 0, 1, true);
        //enteringNavbarItems.fromTo(OPACITY, 0.01, 1, true);
        
      }
    }

    // setup leaving view
    if (leavingView && leavingView.pageRef()) {
      // leaving content
      const leavingPageEle: Element = leavingView.pageRef().nativeElement;

      const leavingContent = new Animation(plt, leavingView.contentRef());
      leavingContent.element(leavingPageEle.querySelectorAll('ion-header > *:not(ion-navbar),ion-footer > *'));
      this.add(leavingContent);

      if (backDirection) {
        // leaving content, back direction
        leavingContent
          .beforeClearStyles([OPACITY])
          .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY, false)
          .fromTo(TRANSLATEX, CENTER, (plt.isRTL ? '-100%' : '100%'));

      } else {
        // leaving content, forward direction
        leavingContent
          .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY, false)
          .fromTo(TRANSLATEX, CENTER, OFF_LEFT)
          .afterClearStyles([TRANSFORM, OPACITY]);
      }

      if (leavingHasNavbar) {
        // leaving page has a navbar
        const leavingNavbarEle: Element = leavingPageEle.querySelector('ion-header');
        const leavingNavBar = new Animation(plt, leavingNavbarEle);
        
        this.add(leavingNavBar);

        // fade out leaving navbar items
        leavingNavBar
        .fromTo(OPACITY, 1, 0);
        //leavingTitle.fromTo(OPACITY, 0.99, 0);
        //leavingNavbarItems.fromTo(OPACITY, 0.99, 0);

        
      }

    }
  }

}
