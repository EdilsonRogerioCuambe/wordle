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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var axios_1 = __importDefault(require("axios"));
function Page() {
    var _this = this;
    var _a = (0, react_1.useState)([]), categories = _a[0], setCategories = _a[1];
    var _b = (0, react_1.useState)(''), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = (0, react_1.useState)(''), word = _c[0], setWord = _c[1];
    var router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(function () {
        function fetchCategories() {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1.default.get('/api/categories')];
                        case 1:
                            data = (_a.sent()).data;
                            setCategories(data);
                            if (data.length > 0) {
                                setSelectedCategory(data[0].id);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error(error_1);
                            react_hot_toast_1.default.error('Falha ao buscar categorias');
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        fetchCategories();
    }, []);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, value, error_2;
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
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1.default.post('/api/words', {
                            value: word.toLowerCase(),
                            categoryId: selectedCategory,
                        })];
                case 2:
                    response = _a.sent();
                    react_hot_toast_1.default.success('Palavra adicionada com sucesso!');
                    value = response.data.value;
                    router.push("/edit-word/".concat(value));
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    react_hot_toast_1.default.error('Falha ao adicionar palavra');
                    return [3 /*break*/, 5];
                case 4:
                    setWord('');
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="md:text-4xl text-2xl font-bold mb-8">
        Adicionar Nova Palavra
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-lg border-2 border-[#f5f5f5] text-[#f5f5f5]">
        <div className="mb-4">
          <label className="block text-[#f5f5f5] text-sm font-bold mb-2" htmlFor="category">
            Categoria
          </label>
          <select id="category" value={selectedCategory} onChange={function (e) { return setSelectedCategory(e.target.value); }} className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline" required>
            {categories.map(function (category) { return (<option key={category.id} value={category.id} className="bg-[#333333] text-[#f5f5f5]">
                {category.name}
              </option>); })}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[#f5f5f5] text-sm font-bold mb-2" htmlFor="word">
            Palavra
          </label>
          <input type="text" id="word" value={word} onChange={function (e) { return setWord(e.target.value); }} className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline" required/>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="border-2 border-[#f5f5f5] hover:bg-[#333333] hover:border-[#f5f5f5] hover:text-white text-white flex justify-center items-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Adicionar Palavra
          </button>
        </div>
      </form>
    </div>);
}
exports.default = Page;
