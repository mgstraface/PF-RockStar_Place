/* eslint-disable no-confusing-arrow */
/* React stuff */
import React, { useEffect, useState } from "react";

/* Modules */
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* Components & Actions */
import Pagination from "../Pagination/Pagination";
import CardsPlaces from "../Cards/CardsPlaces";
import Colors from "../../Utils/colors";
import NavBar from "../NavBar/NavBar";
import { getPlaces, updateFilters, popularitySort } from "../../Redux/actions";

/* Form Img & SVG */
import BGHome from "../../Assets/img/hostile-gae60db101_1920.jpg";
import IMGLogoA from "../../Assets/img/logo3.png";
import IMGBand from "../../Assets/img/ROLLING STONES.jpg";
import IMGLocal from "../../Assets/img/upload_7xCMVkX.png";
import Logo from "../../Assets/img/LogoCircular.png";

/* * * * * * * * * * * Styled Components CSS  * * * * * * * * * * */
const HomeStyleCont = styled.div`
  box-sizing: border-box;
  background-color: ${Colors.Erie_Black};
  width: 100%;
  height: fit-content;
  position: absolute;
`;

const FirtVewStyleCont = styled.div`
  position: relative;
  z-index: 25;
  box-sizing: border-box;
  background-color: ${Colors.Erie_Black};
  width: 100%;
  height: fit-content;
  padding-left: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .ImgContainer {
    position: fixed;
    z-index: 24;
    box-sizing: border-box;
    width: auto;
    height: 100vh;
    width: 100%;

    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .Heder {
    box-sizing: border-box;
    position: relative;
    z-index: 27;
    display: flex;
    height: fit-content;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 50px 385px 20px 100px;

    .Logo {
      width: 350px;
      height: 150px;
    }

    .Title {
      font-family: "New Rocker", cursive;
      margin: 0px;
      color: ${Colors.Platinum};
      font-size: 8rem;
    }
    .Notificacion {
      background-color: transparent;
      border: none;
    }
  }

  .CardUnicaCont {
    background-color: ${Colors.Oxford_Blue_transparent};
    position: relative;
    z-index: 27;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    color: ${Colors.Platinum};
    padding: 40px;

    & .ImgBanda {
      width: auto;

      & img {
        border-radius: 15px;
        max-width: 100%;
        height: 300px;
        margin-right: 40px;
      }
    }

    & .ProximoInfCont {
      display: flex;
      border-left: solid white 3px;
      width: fit-content;
      height: 300px;

      & .ProximoInf {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px 35px 0px 15px;

        & h4 {
          font-family: "New Rocker", cursive;
          font-size: 3.5rem;
          letter-spacing: 4px;
          margin: 0px;
        }

        & p {
          margin-top: 20px;
          font-size: 1.6rem;
          line-height: 27px;
          max-width: 420px;

          & span {
            color: ${Colors.Blue_Vivid};
            font-size: 2.4rem;
          }
        }
      }

      & .ProximoIMGyBtn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        & img {
          border-radius: 15px;
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        & .Lynk_Btn {
          button {
            font-family: "New Rocker", cursive;
            border: none;
            color: ${Colors.Platinum};
            border-radius: 8px;
            width: 160px;
            height: 45px;
            font-size: 2.4rem;
            background-color: ${Colors.Blue_life};
            letter-spacing: 1.5px;
            margin-top: 25px;
            transition: all 0.5s ease;

            :hover {
              transform: scale(1.2);
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;

const SecondVewStyleCont = styled.section`
  box-sizing: border-box;
  position: relative;
  z-index: 27;
  margin-left: 75px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .ContenidoPrevio {
    position: absolute;
    top: 42px;
    width: 86%;
    display: flex;
    align-items: center;
    justify-content: end;
  }

  img {
    width: 230px;
    height: 230px;
  }
`;

const SecondStyleCont = styled.section`
  width: 75%;
  height: fit-content;
  margin-bottom: 100px;
  background-color: ${Colors.Oxford_Blue_transparent};
  margin-top: 160px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    margin-bottom: 30px;
    color: ${Colors.Platinum};
    font-family: "New Rocker", cursive;
    font-size: 7rem;
  }
`;

const FooterStyle = styled.section`
  box-sizing: border-box;
  position: relative;
  background-color: ${Colors.Erie_Black};
  width: 100%;
  height: 80px;
  z-index: 27;
  color: white;
  padding-left: 75px;
`;

/* * * * * * * * * * * React Component Function  * * * * * * * * * * */
function HomeBL() {
  const dispatch = useDispatch();
  const allPlaces = useSelector((state) => state.places);
  const filters = useSelector((state) => state.filters);

  /* * * * * * * * * * * React Hooks  * * * * * * * * * * */
  useEffect(() => {
    dispatch(getPlaces());
  }, [dispatch]);

  const [reRender, setreRender] = useState(false);

  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [cardsPerPage] = useState(10);
  const ultimaCard = pageNumber * cardsPerPage;
  const primeraCard = ultimaCard - cardsPerPage;
  const currentCards = allPlaces.slice(primeraCard, ultimaCard);
  const paginado = (num) => {
    setPageNumber(num);
  };

  const [filter, setFilter] = useState({
    FilterCities: "",
    FilterSounds: "",
  });

  /* * * * * * * * * * * Handle´s * * * * * * * * * * */
  const handlerClickReset = () => {
    dispatch(getPlaces());
    dispatch(
      updateFilters({
        Ciudad: false,
        Sonido: false,
      }),
    );
    setFilter({
      FilterCities: "",
      FilterSounds: "",
    });
    paginado(1);
  };

  const handleClickSort = () => {
    dispatch(popularitySort(allPlaces));
    paginado(1);
    setreRender(!reRender);
  };

  /* * * * * * * * * * * React JSX * * * * * * * * * * */
  return (
    <HomeStyleCont>
      <NavBar
        Eventos
        Perfil
        HelpLog
        UserLog
        paginado={paginado}
        setFilter={setFilter}
        filter={filter}
      />

      <FirtVewStyleCont>
        <div className="ImgContainer">
          <img src={BGHome} alt="Background" />
        </div>
        <div className="Heder">
          <img className="Logo" src={IMGLogoA} alt="" />
          <h1 className="Title">Nombre de el Local</h1>
          <button type="button" className="Notificacion">
            <img src="" alt="" />
          </button>
        </div>
        <div className="CardUnicaCont">
          <div className="ImgBanda">
            <img src={IMGLocal} alt="Banda" />
          </div>
          <div className="ProximoInfCont">
            <div className="ProximoInf">
              <h4>Proximo Evento</h4>
              <p>
                <span>Banda: </span>Los Autenticos Tlacuaches <br />
                <span>Fecha: </span>Sabado 27 de Marzo. <br />
                <span>Contacto: </span>Dimitri Gomez Plata <br />
                <span>Telefono: </span> (+52) 55 6192 2596 <br />
                <span>Direccion: </span> Av. Siempre Viva #54 interior 12 Colonia Las Americas
              </p>
            </div>
            <div className="ProximoIMGyBtn">
              <img src={IMGBand} alt="Local" />
              <Link className="Lynk_Btn" to="/home/band">
                <button type="button">Detalle</button>
              </Link>
            </div>
          </div>
        </div>
      </FirtVewStyleCont>
      <SecondVewStyleCont UserLog id="SecondVewStyleCont">
        <div className="ContenidoPrevio">
          <img src={Logo} alt="Logo" />
        </div>
        <SecondStyleCont>
          <h4 id="Ancla_Titulo">Gestiona tus Eventos</h4>
        </SecondStyleCont>
      </SecondVewStyleCont>
      <FooterStyle>
        Fotter
        asdlfjkhgasdkjfughkaduisfhgiluadhfligushjdofiughjoadipufghjlsikdufjvblskdfjgpiijfghoiusjfñboisjdlfbkjsrñftogbjslfifdjnmg
        sdlifdjgsld iolsidfurtdhjg isufdfhopiu sdlfiu ghsldi uh
      </FooterStyle>
    </HomeStyleCont>
  );
}

export default HomeBL;
