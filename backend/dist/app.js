"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cookieParser = require('cookie-parser');
const cors = require('cors');
// Enable JSON
app.use(express_1.default.json());
// Enable cookie parsing
app.use(cookieParser());
// Enable Cross Origin Resource Sharing
app.use(cors({
    origin: [
        'http://localhost:4000', 'http://127.0.0.1:4000',
        'http://localhost:3000', 'http://127.0.0.1:3000',
        'http://localhost:3080', 'http://127.0.0.1:3080'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.options('*', cors());
// Routes
const ClientRouter_1 = __importDefault(require("./routers/ClientRouter"));
app.use('/client', ClientRouter_1.default);
// Port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Listening to PORT:', PORT);
});
