import * as db from '../repository/produtosRepository.js'

import {Router} from "express";
const endpoints = Router();



endpoints.get('/produto', async (req,resp) => {
    try {
        let registros = await db.consultarProduto();
        resp.send(registros)
    }
    
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



endpoints.post('/produto', async (req,resp) => {
    try {
        let produto = req.body;
        let id = await db.inserirProduto(produto);
        
        resp.send({
            novoId:id
        })
        
        
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/produto/:id', async (req,resp) => {
    try {
        let id = req.params.id;
        let produto=req.body;
        let linhasAfetadas=await db.alterarProduto(id,produto);
        
        if(linhasAfetadas==0){
            resp.status(404).send({erro:' Nenhum registro encontrado'})        
        }
        
        else(resp.send())
    }
    
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('/produto/:id', async (req,resp) => {
    
    
    try {
        let id = req.params.id;
        let linhasAfetadas= await db.removerProduto(id);
        
        if(linhasAfetadas==0){
            resp.status(404).send({erro:' Nenhum registro encontrado'})
            
        }
        
        else(resp.send())
    }
    
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;