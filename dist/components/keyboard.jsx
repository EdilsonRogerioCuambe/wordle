"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var key_1 = __importDefault(require("./key"));
var keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];
var Keyboard = function (_a) {
    var onKeyClick = _a.onKeyClick, keyStatuses = _a.keyStatuses, currentGuessLength = _a.currentGuessLength, answerLength = _a.answerLength;
    return (<div className="flex flex-col items-center mt-4 space-y-1 sm:space-y-2">
      {keys.map(function (row, rowIndex) { return (<div key={rowIndex} className="flex justify-center space-x-1 sm:space-x-2">
          {row.map(function (key) { return (<key_1.default key={key} value={key} status={keyStatuses[key] || 'default'} onClick={function () { return onKeyClick(key); }} isEnterKey={key === 'Enter'} isBackspaceKey={key === 'Backspace'} disabled={key === 'Enter' && currentGuessLength < answerLength}/>); })}
        </div>); })}
    </div>);
};
exports.default = Keyboard;
