import cartsDao from "../daos/dbManager/carts.dao.js";
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    try {
      const carts = await cartsDao.getAll();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

router.get('/:id', async (req, res) => {
    try {
      const cart = await cartsDao.getById(req.params.id);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

router.post('/', async (req, res) => {
    try {
      const cart = await cartsDao.create(req.body);
      res.redirect('/')
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })


//Borro el contenido del carrito 
router.delete('/:id', async (req, res) => {

    try {
      let cart = await cartsDao.getById(req.params.id);
      cart = [];
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  })


//Borro producto dentro del carrito
router.delete('/:cid/carts/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        let cart = await cartsDao.getById(cid);
        cart = cart.splice(pid,1);
        res.json(cart);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }  
  })

//Actualizo todo el carrito
router.put('/:id', async (req, res) => {
    try {
      const cart = await cartsDao.update(req.params.id, req.body);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

//Actualizo el stock de un producto dentro del carrito
router.put('/:cid/carts/:pid', async (req, res) => {

    const { cid, pid } = req.params;
    const stock = req.body.stock;

    try {
        let cart = await cartsDao.getById(cid);
        
        cart.products[pid].stock = stock;

        res.json(cart);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  })


  
export default router;