import {
  addBandReview,
  createMusicBand,
  getAllMusicBands,
  getMusicBand,
} from "../db/models/musicBandModel";
import { addPlaceReview, createPlace, getAllPlaces, getPlace } from "../db/models/placeModel";

const { Router } = require("express");

const router = Router();

// router.use(/* ALGO */);

router.get("/musicbands", async (req: any, res: any) => {
  try {
    const musicBands = await getAllMusicBands();
    if (musicBands) {
      return res.status(200).send(musicBands);
    } else {
      return res.status(404).send({
        msg: "No se encontraron bandas",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/musicbands", async (req: any, res: any) => {
  const musicBand = req.body.newMusicBand;
  if (musicBand) {
    try {
      await createMusicBand(musicBand);
      res.status(201).send({ msg: "Se creo la banda exitosamente" });
    } catch (error) {
      console.log(error);
      res.status(404).send({ error: error });
    }
  } else {
    res.status(400).send({ msg: "Data faltante o incorrecta" });
  }
});

router.post("/bandreviews", async (req: any, res: any) => {
  const { review, email } = req.body;

  if (review && email) {
    try {
      await addBandReview(email, review);
      return res.status(201).send({ msg: "Se añadio la reseña exitosamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).send({ msg: "Data faltante o incorrecta" });
  }
});

router.get("/musicband", async (req: any, res: any) => {
  const { email } = req.body;
  try {
    const musicBand = await getMusicBand(email);
    if (musicBand) {
      return res.status(200).send(musicBand);
    } else {
      return res.status(404).send({
        msg: "No se encontraron bandas",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

/// ACA ARRANCAN RUTAS DEL PLACE

router.get("/places", async (req: any, res: any) => {
  try {
    const places = await getAllPlaces();
    if (places) {
      return res.status(200).send(places);
    } else {
      return res.status(404).send({
        msg: "No se encontraron lugares",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/places", async (req: any, res: any) => {
  const places = req.body.newPlace;
  if (places) {
    try {
      await createPlace(places);
      res.status(201).send({ msg: "Se creo el lugar exitosamente" });
    } catch (error) {
      console.log(error);
      res.status(404).send({ error: error });
    }
  } else {
    res.status(400).send({ msg: "Data faltante o incorrecta" });
  }
});

router.post("/placereviews", async (req: any, res: any) => {
  const { review, email } = req.body;

  if (review && email) {
    try {
      await addPlaceReview(email, review);
      return res.status(201).send({ msg: "Se añadio la reseña exitosamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).send({ msg: "Data faltante o incorrecta" });
  }
});

router.get("/place/:email", async (req: any, res: any) => {
  const { email } = req.params;
  try {
    const place = await getPlace(email);
    if (place) {
      return res.status(200).send(place);
    } else {
      return res.status(404).send({
        msg: "No se encontraron lugares",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
