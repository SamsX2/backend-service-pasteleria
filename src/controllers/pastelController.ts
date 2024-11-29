import { Request, Response } from "express";
import { AppDataSource } from "../swagger/data-source";
import { Pastel } from "../entities/Pastel";

const PastelRepository = AppDataSource.getRepository(Pastel);

// GET - Obtener Todos los Productos
export const getAllPastel = async(red: Request, res: Response) => {
  try {
    const Pastel = await PastelRepository.find();
    res.json(Pastel);
  } catch(error) {
    res.status(500).json({ message: "Error al obtener productos." });
  }
};

// GET by ID - Obetener Producto por ID
export const getPastelById = async(req: Request, res: Response) => {
  try {
    const Pastel = await PastelRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if(Pastel) {
      res.json(Pastel);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al obtener el producto." });
  }
};

// POST - Crear un nuevo Producto
export const createPastel = async(req: Request, res: Response) => {
  try {
    const { name, description, price, imgUrl } = req.body;
    const pastel = new Pastel ();
    pastel.name = name;
    pastel.description = description;
    pastel.price = price;
    pastel.imgUrl = imgUrl;

    await PastelRepository.save(pastel);
    res.status(201).json(Pastel);
  } catch(error) {
    res.status(500).json({ message: "Error al crear el producto." });
  }
};

// PUT - Actualizar un Producto existente
export const updatePastel = async(req: Request, res: Response) => {
  try {
    const { name, description, price, imgUrl } = req.body;
    const Pastel = await PastelRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if(Pastel) {
      Pastel.name = name ?? Pastel.name;
      Pastel.description = description ?? Pastel.description;
      Pastel.price = price ?? Pastel.price;
      Pastel.imgUrl = imgUrl ?? Pastel.imgUrl;

      await PastelRepository.save(Pastel);
      res.json(Pastel);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al actualizar el producto." });
  }
};

// DELETE - Borrar un Producto
export const deletePastel = async(req: Request, res: Response) => {
  try {
    const Pastel = await PastelRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if (Pastel) {
      await PastelRepository.remove(Pastel);
      res.json({ message: "Producto eliminado." });
    } else {
      res.status(404).json({ message: "Producto no encontrado." });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al eliminar el producto." });
  }
};