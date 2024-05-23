"use strict";
'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var framer_motion_1 = require("framer-motion");
var row_1 = __importDefault(require("./row"));
var keyboard_1 = __importDefault(require("./keyboard"));
var image_1 = __importDefault(require("next/image"));
var modal_1 = __importDefault(require("./modal"));
var MAX_ATTEMPTS = 6;
var Board = function (_a) {
    var _b, _c;
    var categories = _a.categories;
    var _d = (0, react_1.useState)([]), guesses = _d[0], setGuesses = _d[1];
    var _e = (0, react_1.useState)(''), currentGuess = _e[0], setCurrentGuess = _e[1];
    var _f = (0, react_1.useState)([]), statuses = _f[0], setStatuses = _f[1];
    var _g = (0, react_1.useState)({}), keyStatuses = _g[0], setKeyStatuses = _g[1];
    var _h = (0, react_1.useState)(false), gameOver = _h[0], setGameOver = _h[1];
    var _j = (0, react_1.useState)(false), animateRow = _j[0], setAnimateRow = _j[1];
    var _k = (0, react_1.useState)(0), hintIndex = _k[0], setHintIndex = _k[1];
    var _l = (0, react_1.useState)(null), selectedCategory = _l[0], setSelectedCategory = _l[1];
    var _m = (0, react_1.useState)(''), answer = _m[0], setAnswer = _m[1];
    var _o = (0, react_1.useState)([]), hints = _o[0], setHints = _o[1];
    var _p = (0, react_1.useState)(true), isModalOpen = _p[0], setIsModalOpen = _p[1];
    var checkGuess = (0, react_1.useCallback)(function (guess) {
        var status = Array(answer.length).fill('absent');
        for (var i = 0; i < answer.length; i++) {
            if (guess[i] === answer[i]) {
                status[i] = 'correct';
            }
            else if (answer.includes(guess[i])) {
                status[i] = 'present';
            }
        }
        return status;
    }, [answer]);
    var setNewWord = (0, react_1.useCallback)(function () {
        var _a;
        if (selectedCategory) {
            var category = categories.find(function (cat) { return cat.id === selectedCategory; });
            if (category && category.words.length > 0) {
                var newAnswer_1 = category.words[Math.floor(Math.random() * category.words.length)]
                    .value;
                var newHints = ((_a = category.words.find(function (word) { return word.value === newAnswer_1; })) === null || _a === void 0 ? void 0 : _a.hints) || [];
                setAnswer(newAnswer_1);
                setHints(newHints);
                setGuesses([]);
                setCurrentGuess('');
                setStatuses([]);
                setKeyStatuses({});
                setGameOver(false);
                setHintIndex(0);
            }
        }
    }, [categories, selectedCategory]);
    (0, react_1.useEffect)(function () {
        setNewWord();
    }, [selectedCategory, setNewWord]);
    var handleSubmit = (0, react_1.useCallback)(function () {
        if (currentGuess.length === answer.length) {
            var newStatus_1 = checkGuess(currentGuess);
            setStatuses(function (prevStatuses) { return __spreadArray(__spreadArray([], prevStatuses, true), [newStatus_1], false); });
            setGuesses(function (prevGuesses) { return __spreadArray(__spreadArray([], prevGuesses, true), [currentGuess], false); });
            setCurrentGuess('');
            setAnimateRow(true);
            setTimeout(function () {
                setAnimateRow(false);
            }, 1000);
            if (currentGuess === answer || guesses.length + 1 === MAX_ATTEMPTS) {
                setGameOver(true);
            }
        }
    }, [currentGuess, answer, checkGuess, guesses.length]);
    (0, react_1.useEffect)(function () {
        var newKeyStatuses = __assign({}, keyStatuses);
        guesses.forEach(function (guess, i) {
            statuses[i].forEach(function (status, index) {
                var letter = guess[index];
                if (status === 'correct') {
                    newKeyStatuses[letter] = 'correct';
                }
                else if (status === 'present' &&
                    newKeyStatuses[letter] !== 'correct') {
                    newKeyStatuses[letter] = 'present';
                }
                else if (status === 'absent' && !newKeyStatuses[letter]) {
                    newKeyStatuses[letter] = 'absent';
                }
            });
        });
        setKeyStatuses(newKeyStatuses);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guesses, statuses]);
    var handleKeyClick = function (key) {
        if (gameOver)
            return;
        if (key === 'Enter') {
            handleSubmit();
        }
        else if (key === 'Backspace') {
            setCurrentGuess(currentGuess.slice(0, -1));
        }
        else if (currentGuess.length < answer.length && /^[a-zA-Z]$/.test(key)) {
            setCurrentGuess(currentGuess + key.toLowerCase());
        }
    };
    var handleCellClick = function (index) {
        if (currentGuess.length > index) {
            setCurrentGuess(currentGuess.slice(0, index) + currentGuess.slice(index + 1));
        }
    };
    var handleHint = function () {
        if (hintIndex < hints.length) {
            setHintIndex(hintIndex + 1);
        }
    };
    var handleNext = function () {
        setNewWord();
    };
    (0, react_1.useEffect)(function () {
        var handleKeyPress = function (event) {
            if (gameOver)
                return;
            var key = event.key;
            if (key === 'Enter') {
                handleSubmit();
            }
            else if (key === 'Backspace') {
                setCurrentGuess(function (prev) { return prev.slice(0, -1); });
            }
            else if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
                setCurrentGuess(function (prev) {
                    if (prev.length < answer.length) {
                        return prev + key.toLowerCase();
                    }
                    return prev;
                });
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return function () {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleSubmit, gameOver, answer.length]);
    var closeModal = function () {
        setIsModalOpen(false);
    };
    if (!selectedCategory) {
        return (<div className="flex flex-wrap justify-center space-x-4 sm:space-x-8">
        {categories.map(function (category) { return (<framer_motion_1.motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.1 }} key={category.id} type="button" onClick={function () {
                    setSelectedCategory(category.id);
                }} className="flex flex-col items-center space-y-2 p-4 my-4 border-2 border-[#f5f5f5] rounded-lg cursor-pointer">
            <image_1.default src={category.image} alt={category.name} width={50} height={50}/>
            <span>{category.name}</span>
          </framer_motion_1.motion.button>); })}
      </div>);
    }
    return (<div className="flex flex-col items-center space-y-4">
      <modal_1.default isModalOpen={isModalOpen} closeModal={closeModal} MAX_ATTEMPTS={MAX_ATTEMPTS}/>
      <div className="flex items-center space-x-2">
        <image_1.default src={((_b = categories.find(function (cat) { return cat.id === selectedCategory; })) === null || _b === void 0 ? void 0 : _b.image) || ''} alt={selectedCategory} width={50} height={50}/>
        <span className="text-xl font-extrabold uppercase">
          {((_c = categories.find(function (cat) { return cat.id === selectedCategory; })) === null || _c === void 0 ? void 0 : _c.name) || ''}
        </span>
      </div>
      {guesses.map(function (guess, i) { return (<row_1.default key={i} word={answer} guess={guess} status={statuses[i]} animate={true}/>); })}
      {guesses.length < MAX_ATTEMPTS && !gameOver && (<>
          <row_1.default word={answer} guess={currentGuess} status={Array(answer.length).fill('absent')} onCellClick={handleCellClick} animate={animateRow}/>
          <div className="flex space-x-4">
            <button title="Dica" type="button" onClick={handleHint} className={"px-4 py-2 bg-yellow-500 text-white font-extrabold rounded ".concat(hintIndex >= hints.length ? 'opacity-50 cursor-not-allowed' : '')} disabled={gameOver || hintIndex >= hints.length}>
              <fa_1.FaRegLightbulb className="inline-block"/>
            </button>
          </div>
        </>)}
      {hintIndex > 0 && (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex items-center capitalize space-x-2 text-lg">
          <span>Dica:</span>
          <span className="text-green-400 font-extrabold">
            {hints[hintIndex - 1]}
          </span>
        </framer_motion_1.motion.div>)}
      <div className={'text-xl font-extrabold uppercase' +
            (gameOver && guesses[guesses.length - 1] === answer
                ? ' text-green-400'
                : ' text-red-400')}>
        {gameOver &&
            (guesses[guesses.length - 1] === answer
                ? 'Você acertou!'
                : 'Você perdeu! A palavra era ' + answer)}
      </div>
      {gameOver && (<button type="button" onClick={handleNext} className="px-4 py-2 bg-violet-400 text-white font-extrabold rounded mt-4">
          Próxima Palavra
        </button>)}
      <keyboard_1.default onKeyClick={handleKeyClick} keyStatuses={keyStatuses} currentGuessLength={currentGuess.length} answerLength={answer.length}/>
    </div>);
};
exports.default = Board;
