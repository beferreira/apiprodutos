import con from "./connection.js";

export async function inserirProduto(produto){

const comando = `
insert into tb_produtos(nm_nomeProduto, bt_categoria, ds_descricao, bt_zeroAcucar, bt_diet, vl_preco)
values (?,?,?,?,?,?);
`
let resposta= await con.query(comando, [produto.nome, produto.categoria, produto.descricao, produto.zeroAcucar, produto.diet, produto.preco])
let info = resposta[0];

return info.insertId;
}

export async function alterarProduto(id,produto){
    const comando = `
    update tb_produtos 
    set nm_nomeProduto =?,
    bt_categoria =?,
    ds_descricao =?,
    bt_zeroAcucar =?,
    bt_diet =?,
    vl_preco =?

    where id_produtos = ?;
    `
    let resposta= await con.query(comando, [produto.nome, produto.categoria, produto.descricao, produto.zeroAcucar, produto.diet, produto.preco, id])
    let info = resposta[0];

    return info.affectedRows;

}

export async function consultarProduto(){
    const comando = `
    select id_produto       id,
    nm_nomeProduto          nome,
    bt_categoria            categoria,
    ds_descricao            descricao,
    bt_zeroAcucar           zeroAcucar,
    bt_diet                 diet,
    vl_preco                preco
    from tb_produtos
    `
    let resposta= await con.query(comando)
    let registros = resposta[0];

    return registros
}

export async function removerProduto(id){

const comando = `
delete from tb_produtos
where id_produto = ?
`
let resposta= await con.query(comando, [id])
let info = resposta[0];

return info.affectedRows;
}