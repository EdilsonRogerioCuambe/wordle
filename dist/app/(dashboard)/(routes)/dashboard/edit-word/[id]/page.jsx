"use strict";
'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var navigation_1 = require("next/navigation");
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var axios_1 = __importDefault(require("axios"));
var framer_motion_1 = require("framer-motion");
function EditWord() {
    var _this = this;
    var _a = (0, react_1.useState)(''), word = _a[0], setWord = _a[1];
    var _b = (0, react_1.useState)(['']), hints = _b[0], setHints = _b[1];
    var _c = (0, react_1.useState)([]), categories = _c[0], setCategories = _c[1];
    var _d = (0, react_1.useState)(''), selectedCategory = _d[0], setSelectedCategory = _d[1];
    var _e = (0, react_1.useState)(''), newHint = _e[0], setNewHint = _e[1];
    var router = (0, navigation_1.useRouter)();
    var id = (0, navigation_1.useParams)().id;
    (0, react_1.useEffect)(function () {
        function fetchWord() {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1.default.get("/api/words/".concat(id))];
                        case 1:
                            data = (_a.sent()).data;
                            setWord(data.value);
                            setHints(data.hints || []);
                            setSelectedCategory(data.categoryId);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error(error_1);
                            react_hot_toast_1.default.error('Falha ao buscar a palavra');
                            router.push('/');
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function fetchCategories() {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1.default.get('/api/categories')];
                        case 1:
                            data = (_a.sent()).data;
                            setCategories(data);
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            console.error(error_2);
                            react_hot_toast_1.default.error('Falha ao buscar categorias');
                            router.push('/');
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        fetchWord();
        fetchCategories();
    }, [router, id]);
    var handleAddHint = function () { return __awaiter(_this, void 0, void 0, function () {
        var updatedHints, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (newHint.trim() === '') {
                        react_hot_toast_1.default.error('A dica não pode estar vazia');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    updatedHints = __spreadArray(__spreadArray([], hints, true), [newHint], false);
                    return [4 /*yield*/, axios_1.default.patch("/api/words/".concat(id), {
                            hints: updatedHints,
                        })];
                case 2:
                    _a.sent();
                    setHints(updatedHints);
                    setNewHint('');
                    react_hot_toast_1.default.success('Dica adicionada com sucesso!');
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error(error_3);
                    react_hot_toast_1.default.error('Falha ao adicionar dica');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleHintChange = function (index, value) {
        var newHints = hints.slice();
        newHints[index] = value;
        setHints(newHints);
    };
    var handleRemoveHint = function (index) { return __awaiter(_this, void 0, void 0, function () {
        var updatedHints, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedHints = hints.slice();
                    updatedHints.splice(index, 1);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.patch("/api/words/".concat(id), {
                            hints: updatedHints,
                        })];
                case 2:
                    _a.sent();
                    setHints(updatedHints);
                    react_hot_toast_1.default.success('Dica removida com sucesso!');
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error(error_4);
                    react_hot_toast_1.default.error('Falha ao remover dica');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!selectedCategory || !word) {
                        react_hot_toast_1.default.error('Por favor, preencha todos os campos');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.patch("/api/words/".concat(id), {
                            word: word,
                            categoryId: selectedCategory,
                        })];
                case 2:
                    _a.sent();
                    react_hot_toast_1.default.success('Palavra atualizada com sucesso!');
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error(error_5);
                    react_hot_toast_1.default.error('Falha ao atualizar palavra');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<>
      <h1 className="md:text-4xl text-2xl font-bold mb-8">Editar Palavra</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl text-[#f5f5f5]">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="border-2 border-[#f5f5f5] p-4 rounded-lg">
              <label className="block text-[#f5f5f5] text-sm font-bold mb-2" htmlFor="category">
                Categoria
              </label>
              <select id="category" value={selectedCategory} onChange={function (e) { return setSelectedCategory(e.target.value); }} className="bg-transparent shadow appearance-none border cursor-pointer rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline" required>
                {categories.map(function (category) { return (<option key={category.id} value={category.id} className="bg-[#333333] text-[#f5f5f5] cursor-pointer hover:bg-[#444444] hover:text-[#f5f5f5]">
                    {category.name}
                  </option>); })}
              </select>
            </div>
            <div className="border-2 border-[#f5f5f5] p-4 rounded-lg my-4">
              <label className="block text-[#f5f5f5] text-sm font-bold mb-2" htmlFor="word">
                Palavra
              </label>
              <input type="text" id="word" value={word} onChange={function (e) { return setWord(e.target.value); }} className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline" required/>
              <button type="submit" className="mt-2 transition-all duration-300 ease-in-out bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Atualizar Palavra
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="border-2 border-[#f5f5f5] p-4 rounded-lg">
              <label className="block text-[#f5f5f5] text-sm font-bold mb-2" htmlFor="newHint">
                Nova Dica
              </label>
              <input type="text" id="newHint" value={newHint} onChange={function (e) { return setNewHint(e.target.value); }} className="bg-[#333333] shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline focus:ring-0 ring-0"/>
              <button type="button" onClick={handleAddHint} className="mt-2 transition-all duration-300 ease-in-out bg-purple-400 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Adicionar Dica
              </button>
            </div>
            {hints.map(function (hint, index) { return (<framer_motion_1.motion.div key={index} className="border-2 border-[#f5f5f5] p-4 rounded-lg my-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <label className="block text-[#f5f5f5] text-sm font-bold mb-2" htmlFor={"hint-".concat(index)}>
                  Dica {index + 1}
                </label>
                <input type="text" id={"hint-".concat(index)} value={hint} onChange={function (e) { return handleHintChange(index, e.target.value); }} className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline" disabled/>
                <button type="button" onClick={function () { return handleRemoveHint(index); }} className="mt-2 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Remover Dica
                </button>
              </framer_motion_1.motion.div>); })}
          </div>
        </div>
      </form>
    </>);
}
exports.default = EditWord;
