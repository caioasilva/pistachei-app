import {Animation} from "ionic-angular/animations/animation";
import {isPresent} from "ionic-angular/util/util";
import {PageTransition} from "ionic-angular/transitions/page-transition";

const DURATION = 500;
const TRANSFORM = "transform";
const MOVED_DOWN = "translateY(100%)";
const NOT_MOVED = "translateY(0)";
const ZINDEX = "z-index";
const OPACITY = "opacity";
const INDEX_FRONT = 101;
const INDEX_BACK = 100;
const OPAQUE = 1;


export class SlideDownTransition extends PageTransition {

    init() {
        super.init();

        const enteringView = this.enteringView;
        const leavingView = this.leavingView;
        const opts = this.opts;

        this.duration(isPresent(opts.duration) ? opts.duration : DURATION);

        const backDirection = (opts.direction === 'back');

        if (enteringView) {
            const enteringContent = new Animation(this.plt, enteringView.pageRef());
            this.add(enteringContent);

            if (backDirection) {
                enteringContent
                    .fromTo(TRANSFORM, MOVED_DOWN, NOT_MOVED, false)
                    .fromTo(OPACITY, OPAQUE, OPAQUE, false)
                    .fromTo(ZINDEX, INDEX_FRONT, INDEX_FRONT, false);
            } else {
                enteringContent
                    .fromTo(TRANSFORM, NOT_MOVED, NOT_MOVED, false)
                    .fromTo(OPACITY, OPAQUE, OPAQUE, false)
                    .fromTo(ZINDEX, INDEX_BACK, INDEX_BACK, false);
            }

        }

        if (leavingView && leavingView.pageRef()) {
            const leavingContent = new Animation(this.plt, leavingView.pageRef());
            this.add(leavingContent);

            if (backDirection) {
                leavingContent
                    .fromTo(TRANSFORM, NOT_MOVED, NOT_MOVED, false)
                    .fromTo(OPACITY, OPAQUE, OPAQUE, false)
                    .fromTo(ZINDEX, INDEX_BACK, INDEX_BACK, false);
            } else {
                leavingContent
                    .fromTo(TRANSFORM, NOT_MOVED, MOVED_DOWN, false)
                    .fromTo(OPACITY, OPAQUE, OPAQUE, false)
                    .fromTo(ZINDEX, INDEX_FRONT, INDEX_FRONT, false)
                    .afterClearStyles([TRANSFORM, OPACITY]);
            }

        }
    }

}
