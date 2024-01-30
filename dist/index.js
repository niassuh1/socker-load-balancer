"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const redis_client_1 = require("./redis/redis-client");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const PORT = process.env.PORT || 8000;
io.on("connection", (socket) => {
    socket.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("message:", data);
        socket.broadcast.emit("message", data);
    }));
});
Promise.all([redis_client_1.publisher.connect(), redis_client_1.subscriber.connect()]).then(() => {
    io.adapter((0, redis_adapter_1.createAdapter)(redis_client_1.publisher, redis_client_1.subscriber));
    server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Server listening on port", PORT);
    }));
});
