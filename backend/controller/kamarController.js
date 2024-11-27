const { getAllKamarService,getKamarByIdService,addKamarService,updateKamarService,deleteKamarService,rentKamarService
} = require('../service/kamarService.js')

async function getAllKamar(req,res) {
    getAllKamarService(req,res);
}

async function getKamarById(req,res) {
    getKamarByIdService(req,res);
}

async function addKamar(req,res) {
    addKamarService(req,res);
}

async function updateKamar(req,res) {
   updateKamarService(req,res);
}

async function deleteKamar(req,res) {
    deleteKamarService(req,res)
}

async function rentKamar(req,res) {
    rentKamarService(req,res);
}

module.exports = {
    getAllKamar,getKamarById,addKamar,updateKamar,deleteKamar,rentKamar
};