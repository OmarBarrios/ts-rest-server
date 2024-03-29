import {Request, Response } from 'express';
import Usuario from '../models/usuario';


const getUsuarios = async(req: Request, res: Response) => {
        
    const usuarios = await Usuario.findAll();

    res.json({
        usuarios
    })
}


const getUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if ( usuario ) {
        res.json({
            usuario
        })
    }else {
        res.status(404).json({
            msg: `No existe el usuario con el id:  ${id}`
        })
    }
}
const postUsuario = async(req: Request, res: Response) => {

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if ( existeEmail ) {
            res.status(400).json({
                msg: 'Ya existe un usuario con este email'
            })
        }
        
        const usuario = Usuario.build(body);
        await usuario.save();

        res.json({
            msg: 'Usuario creado',
            usuario
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }

    
}
const putUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(400).json({
                msg: `No existe el usuario con el id:  ${id}`
            })
        }

        await usuario.update(body);

        res.json(usuario);

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
}
const deleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return res.status(400).json({
            msg: `No existe el usuario con el id:  ${id}`
        })
    }


    await usuario.update({estado: 0});

    //await usuario.destroy();

    res.json({
        msg: 'Usuario borrado',
        usuario
    })
}



export {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}