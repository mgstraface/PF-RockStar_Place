import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailPlace, resetDetails } from "../../Redux/actions";
import Colors from "../../Utils/colors";
import NavBar from "../NavBar/NavBar";
import validate from "./validationsComment";
import LogoInstagram from "../../Assets/svg/Instagram.svg";
import LoaderComponent from "../Loader/Loading";
import MapLocalDetail from "../MapView/MapLocalDetail";
import MapaVacio from "../../Assets/img/MapaLocalSinUbicacionNL.png";
import Footer from "../Footer/Footer";

const HomeStyleCont = styled.div`
  box-sizing: border-box;
  background-color: ${Colors.Erie_Black};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailStyleCont = styled.div`
  box-sizing: border-box;
  width: 80%;
  height: fit-content;
  background-color: ${Colors.Green_Nigth};
  display: flex;
  margin: 2.5% 10%;

  .FirstCont {
    width: 65%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 2%;

    .NameAndRating {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .PlaceName {
        font-family: "New Rocker";
        font-style: normal;
        font-weight: 400;
        font-size: 75px;
        text-align: center;
        color: ${Colors.Green_Light};
      }

      .rating {
        font-family: "New Rocker";
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        text-align: center;
        color: ${Colors.Green_Light};
      }
    }

    .DataCont {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 1.5%;

      #msgh1 {
        color: ${Colors.Platinum};
        width: 100%;
        text-align: center;
        font-size: 15px;
      }

      .title {
        font-family: "New Rocker";
        font-style: normal;
        font-weight: 400;
        font-size: 45px;
        text-align: center;
        color: ${Colors.Green_Light};
      }

      .description {
        font-family: "RocknRoll One";
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        text-align: justify;
        color: ${Colors.Platinum};
      }

      .mapa {
        width: 100%;
        height: 500px;
        margin-bottom: 2.5%;

        & img {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          margin-top: 2.5%;
        }
      }

      .DatesCont {
        color: ${Colors.Green_Nigth};

        width: 100%;
        height: 300px;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
        & .carousel {
          width: 100%;
          height: 100%;
          & .item {
            width: 90%;
            height: 250px;
            background-color: ${Colors.Green_Light};
            text-align: center;
            margin: 0px 6px;
            font-family: "RocknRoll One";
            display: flex;
            flex-direction: column;
            & .BtnDelete {
              position: absolute;
              right: 7%;
            }
            & .day {
              font-size: 50px;
              margin-top: 2%;
            }
            & .month {
              font-size: 25px;
            }
            & .year {
              font-size: 25px;
              margin-bottom: 4%;
            }
            & .dateStatus {
              width: 100%;
              background-color: ${Colors.Erie_Black};
              font-size: 20px;
              color: ${Colors.Platinum};
            }
            & .BtnVerMas {
              font-family: "RocknRoll One";
              position: absolute;
              top: 80%;
              right: 30%;
              width: 110px;
              height: 35px;
              background-color: ${Colors.Green_Nigth};
              border-radius: 10px;
              border: none;
              color: white;
              transition: all 0.5s ease;

              :hover {
                background-color: ${Colors.Erie_Black};
                transform: scale(1.2);
                cursor: pointer;
              }
            }
          }
        }
      }

      .comentar {
        background: rgba(229, 229, 229, 0.5);
        width: 100%;
        height: 150px;
        margin-top: 3%;
        display: flex;
        flex-direction: column;
        padding: 2%;
        box-sizing: border-box;
        input {
          width: 95%;
          height: 80%;
          background-color: transparent;
          border: none;
          color: ${Colors.Platinum};
          font-family: "RocknRoll One";
          font-size: 16px;
        }
        input::placeholder {
          color: ${Colors.Platinum};
        }

        .RateComentCont {
          display: flex;
          justify-content: space-between;

          .BotonComent {
            font-family: "New Rocker";
            width: 190px;
            height: 55px;
            padding: 0px 15px;
            background-color: ${Colors.Green_Light};
            color: ${Colors.Erie_Black};
            border-radius: 10px;
            font-size: 2rem;
            border: none;
            transition: all 0.5s ease;
            :hover {
              transform: scale(1.1);
              cursor: pointer;
            }
          }

          .RateCont {
            /* display: flex; */

            .rate {
              font-family: "RocknRoll One";
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              text-align: justify;
              color: ${Colors.Platinum};
            }

            .buttons {
              display: flex;
              margin-top: 5%;

              button {
                margin-right: 4%;
              }
            }
          }

          button {
            width: 30%;
          }
        }
      }

      .spanError {
        font-size: 10px;
        color: #3f0f0f;
      }

      .comentarios {
        background: rgba(229, 229, 229, 0.5);
        width: 100%;
        margin-top: 3%;

        .coment {
          font-family: "RocknRoll One";
          font-style: normal;
          font-weight: 400;
          font-size: 15px;
          color: ${Colors.Platinum};
          margin: 4% 0%;
          padding: 0% 3%;
          .NameRating {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }

    .hr {
      width: 100%;
      margin-top: 3%;
    }
  }

  .SecondCont {
    width: 35%;
    display: flex;
    flex-direction: column;
    padding: 2%;

    .profile {
      width: 100%;
    }

    .ImglogosRedes {
      width: 40px;
      height: 40px;
      padding: 4px;
      border-radius: 50px;
      background-color: white;
      cursor: pointer;
      margin: 25px 0px 0px 0px;
      transition: all 0.5s ease;

      :hover {
        transform: scale(1.2);
        cursor: pointer;
      }
    }

    .stats {
      font-family: "RocknRoll One";
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      color: ${Colors.Platinum};
      margin-top: 3%;
    }

    .hr {
      width: 100%;
      margin-top: 3%;
    }
  }
`;

const DateStatusStyled = styled.div`
  width: 100%;
  background-color: ${Colors.Oxford_Blue};
  background-color: ${({ dateStatus }) => (dateStatus ? "#6a994e" : "#bc4749")};
  font-size: 20px;
`;

const FooterStyledCont = styled.footer`
  position: relative;
  background-color: ${Colors.Green_Nigth};
  box-sizing: border-box;
  height: fit-content;
  margin-left: 70px;
  padding-left: 25px;
  color: wheat;
  font-size: 3rem;
`;

export default function DetailPlace() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const place = useSelector((state) => state.detail_place);
  const [input, setInput] = useState({
    comment: "",
    rating: 0,
  });
  const confirmedDates = place.dates ? place.dates.sort((a, b) => new Date(a.date.substring(0, 10)) - new Date(b.date.substring(0, 10))) : [];

  const availableDates = place.availableDates
    ? place.availableDates.sort((a, b) => new Date(a.date.substring(0, 10)) - new Date(b.date.substring(0, 10)))
    : [];

  const allDates = [...confirmedDates, ...availableDates];

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (place.length === 0) dispatch(getDetailPlace(params.id));
    if (input.rating === "") dispatch(getDetailPlace(params.id));
  }, [input]);

  useEffect(() => {
    setLoading(true);
    return () => {
      dispatch(resetDetails([]));
      toast.remove();
    };
  }, []);

  const getMonth = (mes) => {
    if (mes === "01") return "Enero";
    if (mes === "02") return "Febrero";
    if (mes === "03") return "Marzo";
    if (mes === "04") return "Abril";
    if (mes === "05") return "Mayo";
    if (mes === "06") return "Junio";
    if (mes === "07") return "Julio";
    if (mes === "08") return "Agosto";
    if (mes === "09") return "Septiembre";
    if (mes === "10") return "Octubre";
    if (mes === "11") return "Noviembre";
    if (mes === "12") return "Diciembre";
    return mes;
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleChange = (e) => {
    setInput({ ...input, comment: e.target.value });
    setErrors(
      validate({
        ...input,
        comment: e.target.value,
      }),
    );
  };

  const handleClick = (e) => {
    setInput({ ...input, rating: e.target.value });
    setErrors(
      validate({
        ...input,
        rating: e.target.value,
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.error((t) => (
      <span>
        Para dejar tu valiosa opinión debes
        <button
          type="button"
          onClick={() => {
            navigate("/iniciarsesion");
          }}
        >
          Iniciar sesión
        </button>
      </span>
    ));
  };

  const handleAplica = (e) => {
    toast.error((t) => (
      <span>
        Para poder aplicar a una fecha debes
        <button
          type="button"
          onClick={() => {
            navigate("/iniciarsesion");
          }}
        >
          Iniciar sesión
        </button>
      </span>
    ));
  };

  if (place.banned === true || place.disabled === true) navigate("/");

  return (
    <div>
      {loading ? (
        <div>
          <HomeStyleCont>
            <NavBar LogIn Home FondoImg />
            <DetailStyleCont>
              <div className="FirstCont">
                <div className="NameAndRating">
                  <span className="PlaceName">{place.name}</span>
                  <span className="rating">Rating: ⭐{place.rating}</span>
                </div>
                <div className="DataCont">
                  <span className="title">Descripción</span>
                  <span className="description">{place.description}</span>
                  <hr className="hr" />
                </div>
                <div className="DataCont">
                  <span className="title">Próximas fechas</span>
                  {allDates && allDates.length !== 0 ? (
                    <div className="DatesCont">
                      <Carousel className="carousel" responsive={responsive} showDots={true} minimumTouchDrag={80} slidesToSlide={1}>
                        {allDates &&
                          allDates.map((date) => {
                            return (
                              <div className="item" key={date._id}>
                                <span className="day">{date.date.substring(8, 10)}</span>
                                <span className="month">{getMonth(date.date.substring(5, 7))}</span>
                                <span className="year">{date.date.substring(0, 4)}</span>
                                <DateStatusStyled dateStatus={date.isAvailable}>
                                  {date.isAvailable ? "Fecha Disponible" : "Fecha Cerrada"}
                                </DateStatusStyled>
                                {!date.isAvailable ? null : (
                                  <button className="BtnVerMas" type="button" onClick={(e) => handleAplica(e)}>
                                    Aplica
                                  </button>
                                )}
                              </div>
                            );
                          })}
                      </Carousel>
                    </div>
                  ) : (
                    <h1 id="msgh1">El local aún no tiene fechas publicadas.</h1>
                  )}

                  <hr className="hr" />
                </div>
                <div className="DataCont">
                  <span className="title">Ubicación</span>
                  <div className="mapa">
                    {place.coords ? (
                      place.coords.lat !== "" ? (
                        <MapLocalDetail placePosition={place.coords} placeName={place.name} />
                      ) : (
                        <img src={MapaVacio} alt="not found" />
                      )
                    ) : null}
                  </div>
                  <hr className="hr" />
                </div>
                <div className="DataCont">
                  <span className="title">Reseñas</span>
                  <form className="comentar" onSubmit={(e) => handleSubmit(e)}>
                    <input placeholder="Ingresa tu comentario" className="input" value={input.comment} onChange={(e) => handleChange(e)} />
                    <div className="RateComentCont">
                      <div className="RateCont">
                        <span className="rate">Puntaje: {input.rating !== 0 ? input.rating : ""}</span>
                        <div className="buttons">
                          <button type="button" value={1} onClick={(e) => handleClick(e)}>
                            1
                          </button>
                          <button type="button" value={2} onClick={(e) => handleClick(e)}>
                            2
                          </button>
                          <button type="button" value={3} onClick={(e) => handleClick(e)}>
                            3
                          </button>
                          <button type="button" value={4} onClick={(e) => handleClick(e)}>
                            4
                          </button>
                          <button type="button" value={5} onClick={(e) => handleClick(e)}>
                            5
                          </button>
                        </div>
                      </div>
                      {errors.comment && <span className="spanError">{errors.comment}</span>}
                      {errors.rating && <span className="spanError">{errors.rating}</span>}
                      <button className="BotonComent" type="submit">
                        Comentar
                      </button>
                    </div>
                  </form>
                  <div className="comentarios">
                    {place.reviews &&
                      place.reviews.map((p) => {
                        return (
                          <div key={p._id} className="coment">
                            <div className="NameRating">
                              <span className="autor">{p.author}</span>
                              <span className="ratingcoment">Rating: ⭐{p.rating}</span>
                            </div>
                            <p className="contenidocoment">{p.comment}</p>
                            <hr />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="SecondCont">
                <img src={place.profilePicture} className="profile" alt="Img not found" />
                <span className="stats">Ciudad: {place.city}</span>
                <span className="stats">Dirección: {place.adress}</span>
                <span className="stats">Persona a cargo: {place.personInCharge}</span>
                <span className="stats">Teléfono: {place.phoneNumber}</span>
                <span className="stats">Capacidad: {place.capacity}</span>
                <span className="stats">Sonido Propio: {place.hasSound ? "Si" : "No"}</span>
                <hr className="hr" />
                <p className="stats">Email: {place.email}</p>
                {place.socialMedia && place.socialMedia.instagram !== "" ? (
                  <a target="_blank" href={place.socialMedia.instagram} rel="noreferrer">
                    <img className="ImglogosRedes" src={LogoInstagram} alt="" />
                  </a>
                ) : null}
              </div>
            </DetailStyleCont>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                className: "",
                style: {
                  fontSize: "1.5rem",
                  fontFamily: "RocknRoll One",
                  textAlign: "center",
                },
              }}
            />
          </HomeStyleCont>
          <FooterStyledCont>
            <Footer />
          </FooterStyledCont>
        </div>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
}
