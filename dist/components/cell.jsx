"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var framer_motion_1 = require("framer-motion");
var Cell = function (_a) {
    var value = _a.value, status = _a.status, animate = _a.animate, delay = _a.delay, onClick = _a.onClick;
    var getStatusClass = function () {
        switch (status) {
            case 'correct':
                return 'bg-green-500';
            case 'present':
                return 'bg-yellow-500';
            case 'absent':
                return 'border-2 border-[#f5f5f5] rounded-lg';
            default:
                return 'border-2 border-[#f5f5f5] rounded-lg';
        }
    };
    return (<framer_motion_1.motion.div className={"w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 uppercase rounded-lg flex items-center justify-center border font-bold text-sm sm:text-lg md:text-xl relative ".concat(getStatusClass())} initial={animate ? { rotateY: 0 } : false} animate={animate ? { rotateY: 180 } : undefined} transition={animate ? { duration: 0.5, delay: delay } : undefined} style={{ transformStyle: 'preserve-3d' }} onClick={onClick}>
      <framer_motion_1.motion.div className="absolute w-full h-full flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }} initial={{ rotateY: 0 }} animate={{ rotateY: 180 }} transition={{ duration: 0.5, delay: delay }}>
        {value}
      </framer_motion_1.motion.div>
      <framer_motion_1.motion.div className="absolute w-full h-full flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} initial={{ rotateY: -180 }} animate={{ rotateY: 0 }} transition={{ duration: 0.5, delay: delay }}>
        {value}
      </framer_motion_1.motion.div>
    </framer_motion_1.motion.div>);
};
exports.default = Cell;
