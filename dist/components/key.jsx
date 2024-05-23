"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var framer_motion_1 = require("framer-motion");
var react_1 = __importDefault(require("react"));
var fa_1 = require("react-icons/fa");
var Key = function (_a) {
    var value = _a.value, status = _a.status, onClick = _a.onClick, isEnterKey = _a.isEnterKey, isBackspaceKey = _a.isBackspaceKey, disabled = _a.disabled;
    var getStatusClass = function () {
        switch (status) {
            case 'correct':
                return 'bg-green-500';
            case 'present':
                return 'bg-yellow-500';
            case 'absent':
                return 'border-2 border-[#f5f5f5]';
            default:
                return 'border-2 border-[#f5f5f5]';
        }
    };
    return (<framer_motion_1.motion.button className={"w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-lg ".concat(getStatusClass(), " text-white font-bold text-xs sm:text-sm md:text-lg lg:text-xl m-1 ").concat(disabled ? 'opacity-50 cursor-not-allowed' : '')} onClick={function () { return !disabled && onClick(value); }} whileTap={!disabled ? { scale: 0.9 } : {}} disabled={disabled}>
      {isEnterKey ? (<fa_1.FaLevelUpAlt size={20} className="transform rotate-90"/>) : isBackspaceKey ? (<fa_1.FaBackspace size={20}/>) : (value.toUpperCase())}
    </framer_motion_1.motion.button>);
};
exports.default = Key;
