"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisher = exports.subscriber = void 0;
const redis_1 = require("redis");
exports.subscriber = (0, redis_1.createClient)({ url: `redis://localhost:6379/` });
exports.publisher = (0, redis_1.createClient)({ url: `redis://localhost:6379/` });
