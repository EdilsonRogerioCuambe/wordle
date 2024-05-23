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
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var axios_1 = __importDefault(require("axios"));
var storage_1 = require("firebase/storage");
var firebase_1 = require("@/lib/firebase");
var fa_1 = require("react-icons/fa");
var image_1 = __importDefault(require("next/image"));
var ai_1 = require("react-icons/ai");
function AddCategory() {
    var _this = this;
    var _a = (0, react_1.useState)(''), name = _a[0], setName = _a[1];
    var _b = (0, react_1.useState)(null), image = _b[0], setImage = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var handleImage = function (e) {
        if (e.target.files) {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(e.target.files[0]);
            reader_1.onload = function () {
                setImage(reader_1.result);
            };
        }
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, blob, storageRef, url, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!name || !image) {
                        react_hot_toast_1.default.error('Please provide both name and image');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, 8, 9]);
                    setLoading(true);
                    return [4 /*yield*/, fetch(image)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.blob()];
                case 3:
                    blob = _a.sent();
                    storageRef = (0, storage_1.ref)(firebase_1.storage, "categories/".concat(name));
                    return [4 /*yield*/, (0, storage_1.uploadBytes)(storageRef, blob)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, storage_1.getDownloadURL)(storageRef)];
                case 5:
                    url = _a.sent();
                    return [4 /*yield*/, axios_1.default.post('/api/categories', { name: name, image: url })];
                case 6:
                    _a.sent();
                    react_hot_toast_1.default.success('Category added successfully!');
                    return [3 /*break*/, 9];
                case 7:
                    error_1 = _a.sent();
                    console.error(error_1);
                    react_hot_toast_1.default.error('Failed to add category');
                    return [3 /*break*/, 9];
                case 8:
                    setName('');
                    setImage(null);
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="md:text-4xl text-2xl font-bold mb-8">
        Adicionar Nova Categoria
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-lg border-2 border-[#f5f5f5] text-[#f5f5f5]">
        <div className="mb-4">
          <label className="block text-[#f5f5f5] text-sm font-bold mb-2" htmlFor="name">
            Nome da Categoria
          </label>
          <input type="text" id="name" value={name} onChange={function (e) { return setName(e.target.value); }} className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline" required/>
        </div>
        <div className="mb-6">
          <label className="block text-[#f5f5f5] text-sm font-bold mb-2" htmlFor="image">
            Imagem
          </label>
          <div className="flex items-center">
            <label className="flex flex-col items-center px-4 py-6 bg-[#333333] text-[#f5f5f5] rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-[#222222] hover:text-white" htmlFor="image">
              <fa_1.FaCloudUploadAlt className="text-4xl"/>
              <input type="file" id="image" accept="image/*" onChange={handleImage} className="hidden" required/>
            </label>
            {image && (<image_1.default src={image} alt="Preview" className="ml-4 w-24 h-24 object-cover rounded-lg" width={96} height={96}/>)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" disabled={!name || !image} className={"".concat(!name || !image
            ? 'cursor-not-allowed bg-[#121214] text-[#f5f5f5]'
            : 'border-2 border-[#f5f5f5] hover:bg-[#202024] hover:border-[#f5f5f5] hover:text-white', " text-white flex justify-center items-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline")}>
            {loading ? (<ai_1.AiOutlineLoading3Quarters className="animate-spin"/>) : ('Adicionar Categoria')}
          </button>
        </div>
      </form>
    </div>);
}
exports.default = AddCategory;
