"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var cell_1 = __importDefault(require("./cell"));
var Row = function (_a) {
    var guess = _a.guess, status = _a.status, onCellClick = _a.onCellClick, animate = _a.animate;
    return (<div className="flex space-x-1 sm:space-x-2">
      {Array.from({ length: guess.length }, function (_, i) { return (<cell_1.default key={i} value={guess[i] || ''} status={status[i] || 'absent'} onClick={onCellClick ? function () { return onCellClick(i); } : undefined} animate={animate || false} delay={i * 0.2}/>); })}
    </div>);
};
exports.default = Row;
