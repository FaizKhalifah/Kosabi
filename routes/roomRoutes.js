import express from "express";
import { Router } from "express";
import roomController from "../controllers/roomController.js";
import room from "../models/room";


router.get('/',roomController.index);