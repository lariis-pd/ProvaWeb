import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrptjs';
import authMiddleware from "../middleware/auth.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);