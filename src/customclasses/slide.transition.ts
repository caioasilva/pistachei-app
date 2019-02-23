import {Animation, PageTransition} from "ionic-angular";
import {isPresent} from "ionic-angular/util/util";

const DURATION = 500;
const EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
const OPACITY = 'opacity';
const TRANSFORM = 'transform';
const TRANSLATEX = 'translateX';
const CENTER = '0%';
const OFF_OPACITY = 1;


export class SlideTransition extends PageTransition {

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

        if (enteringView) {
            const enteringContent = new Animation(plt, enteringView.pageRef());
            this.add(enteringContent);

            if (backDirection) {
                enteringContent
                    .fromTo(TRANSLATEX, OFF_LEFT, CENTER, true)
                    .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY, false);

            } else {
                enteringContent
                    .beforeClearStyles([OPACITY])
                    .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY, false)
                    .fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
            }

        }

        if (leavingView && leavingView.pageRef()) {
            const leavingContent = new Animation(plt, leavingView.pageRef());
            this.add(leavingContent);

            if (backDirection) {
                leavingContent
                    .beforeClearStyles([OPACITY])
                    .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY, false)
                    .fromTo(TRANSLATEX, CENTER, (plt.isRTL ? '-100%' : '100%'));

            } else {
                leavingContent
                    .fromTo(OPACITY, OFF_OPACITY, OFF_OPACITY, false)
                    .fromTo(TRANSLATEX, CENTER, OFF_LEFT)
                    .afterClearStyles([TRANSFORM, OPACITY]);
            }
        }
    }

}
