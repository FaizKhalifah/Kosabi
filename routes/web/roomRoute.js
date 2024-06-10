import express from "express";
import axios from "axios";
import { Router } from "express";

const router = Router();
const url = 'http://localhost:3000/api/rooms';

router.get('/',async(req,res)=>{
    try{
        const response = await axios.get(url);
        res.render('rooms/index',{rooms:response.data});
    }catch(err){
        res.status(500).send(err);
    }
})

router.get('/create',(req,res)=>{
    res.render('rooms/create');
})