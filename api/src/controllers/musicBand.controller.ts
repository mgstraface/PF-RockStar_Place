import { Request, Response } from "express";
import {
	addBandReview,
	createMusicBand,
	getAllMusicBands,
	getMusicBand,
	getMusicBandByID,
	updateMusicBand,
} from "../db/models/musicBandModel";

const getAllBandsController = async (req: Request, res: Response) => {
	try {
		const musicBands = await getAllMusicBands();
		if (musicBands) {
			return res.status(200).send(musicBands);
		} else {
			return res.status(404).send({
				msg: "Bands not found",
			});
		}
	} catch (error) {
		return res.status(500).send({ error: "Something went wrong" });
	}
};

const updateMusicBandController = async (req: any, res: any) => {
	const { email, data } = req.body;
	if (data) {
		try {
			let updated = await updateMusicBand(email, data);
			if (updated) return res.status(201).send({ msg: "Se actualizó la banda correctamente" });
			return res.status(400).send({ error: "Ha ocurrido un error" });
		} catch (error) {
			return res.status(500).send({ error: "No se pudo actualizar la banda" });
		}
	} else {
		res.status(404).send({ msg: "Data faltante o incorrecta" });
	}
};

const createMusicBandController = async (req: any, res: any) => {
	const musicBand = req.body.newMusicBand;
	if (musicBand) {
		try {
			let created = await createMusicBand(musicBand);
			if (created.hasOwnProperty("error"))
				return res
					.status(400)
					.send({ error: "Ya existe un usuario registrado con ese correo" });
			return res.status(201).send({ msg: "se creó la banda correctamente" });
		} catch (error) {
			return res.status(500).send({ error: "Something went wrong" });
		}
	} else {
		res.status(400).send({ msg: "Data faltante o incorrecta" });
	}
};

const addBandReviewController = async (req: Request, res: Response) => {
	const { review, email } = req.body;

	if (review && email) {
		try {
			await addBandReview(email, review);
			return res.status(201).send({ msg: "Se añadio la reseña exitosamente" });
		} catch (error) {
			return res.status(500).send({ error: "Something went wrong" });
		}
	} else {
		return res.status(404).send({ msg: "Data faltante o incorrecta" });
	}
};

const getMusicBandByIDController = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (id) {
		const musicBand = await getMusicBandByID(id);
		return res.status(200).send(musicBand);
	}
	if (!id) return res.status(404).send({ msg: "Invalid data" });
};

module.exports = {
	getAllBandsController,
	createMusicBandController,
	addBandReviewController,
	getMusicBandByIDController,
	updateMusicBandController,
};
