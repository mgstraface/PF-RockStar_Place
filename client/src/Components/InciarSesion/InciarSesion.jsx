/* eslint-disable react/button-has-type */
/* eslint-disable consistent-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
/* Modules */

/* Components & Actions */
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUserInfo } from "../../Utils/auth.controller";
import NavBar from "../NavBar/NavBar";

/* Form Img & SVG */
import IMGoogle from "../../Assets/svg/Google.svg";
// import IMGFace from "../../Assets/svg/Facebook.svg";
import LoaderComponent from "../Loader/Loading";

/* * * * * * * * * * * Styled Components CSS  * * * * * * * * * * */
import { RegisterStyleCont, RegisterStyleContJr } from "./IniciarSesion.style";

require("dotenv").config();

const Blocker = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 40%;
  position: absolute;
  z-index: ${({ block }) => (block ? 2100 : -1)};
`;

function InciarSesion() {
  const BACK_URL = "https://pf-rock-star-place.herokuapp.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState(false);
  const navigate = useNavigate();

  //Login tradicional
  const login = async () => {
    try {
      const response = await axios({
        method: "POST",
        data: {
          email,
          password,
        },
        withCredentials: true,
        url: "/login",
      });

      if (response) {
        const { token } = response.data;
        localStorage.setItem("user-token", token);
        const header = new Headers();
        header.append("authorization", token);
        const user = await getUserInfo();
        const homeURL = "/";
        if (user.role === "musicband") {
          const userLogMusic = await axios.get(`${BACK_URL}/musicbandemail/${user.email}`);
          if (userLogMusic.data.disabled === true) {
            toast.dismiss();
            setBlock(true);
            toast(
              (t) => (
                <span className="spancito">
                  <b>Su cuenta se encuentra desactivada.</b>
                  <p>¿Desea activarla?</p>
                  <div className="buttonCont">
                    <button
                      type="button"
                      className="buttonToastAcept"
                      onClick={async () => {
                        await axios.put("/bandDisabled", {
                          email: userLogMusic.data.email,
                          disabled: "false",
                        });
                        setBlock(false);
                        navigate("/");
                      }}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      className="buttonToastCancel"
                      onClick={() => {
                        toast.dismiss(t.id);
                        localStorage.removeItem("user-token");
                        setBlock(false);
                        navigate("/iniciarsesion");
                      }}
                    >
                      No
                    </button>
                  </div>
                </span>
              ),
              {
                duration: Infinity,
                style: {
                  borderRadius: "3%",
                },
              },
            );
          } else if (userLogMusic.data.banned === true) {
            localStorage.removeItem("user-token");
            return toast.error("Usuario baneado temporalmente");
          } else {
            window.location.replace(homeURL);
          }
        } else if (user.role === "place") {
          const userLogPlace = await axios.get(`${BACK_URL}/place-email/${user.email}`);
          if (userLogPlace.data.disabled === true) {
            toast.dismiss();
            setBlock(true);
            toast(
              (t) => (
                <span className="spancito">
                  <b>Su cuenta se encuentra desactivada.</b>
                  <p>¿Desea activarla?</p>
                  <div className="buttonCont">
                    <button
                      type="button"
                      className="buttonToastAcept"
                      onClick={async () => {
                        await axios.put("/placeDisabled", {
                          email: userLogPlace.data.email,
                          disabled: "false",
                        });
                        setBlock(false);
                        navigate("/");
                      }}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      className="buttonToastCancel"
                      onClick={() => {
                        toast.dismiss(t.id);
                        localStorage.removeItem("user-token");
                        setBlock(false);
                        navigate("/iniciarsesion");
                      }}
                    >
                      No
                    </button>
                  </div>
                </span>
              ),
              {
                duration: Infinity,
                style: {
                  borderRadius: "3%",
                },
              },
            );
          } else if (userLogPlace.data.banned === true) {
            localStorage.removeItem("user-token");
            return toast.error("Usuario baneado temporalmente");
          } else {
            window.location.replace(homeURL);
          }
        } else {
          window.location.replace(homeURL);
        }
      }
    } catch (error) {
      toast.error("Verifica tu email o clave");
    }
  };

  function recuperoClave() {
    toast.dismiss();
    toast(
      (t) => (
        <span className="spancito">
          <b>¿Estás seguro de cambiar la contraseña?</b>
          <p>Se enviará un correo con los pasos a seguir.</p>
          <div className="buttonCont">
            <button
              className="buttonToastAcept"
              onClick={() => {
                toast.dismiss(t.id);
                axios.get(`/cambioclave/${email}`);
              }}
            >
              Sí, estoy seguro
            </button>
            <button
              className="buttonToastCancel"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Cancelar
            </button>
          </div>
        </span>
      ),
      {
        duration: Infinity,
        style: {
          borderRadius: "3%",
        },
      },
    );
  }

  const google = () => {
    localStorage.setItem("loggedWithGoogle", "true");
    window.open(`${BACK_URL}/auth/google`, "_self");
  };
  useEffect(() => {
    toast.remove();
    if (isAuthenticated()) navigate("/");
    setTimeout(() => {
      setLoading(true);
    }, 100);
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <RegisterStyleCont>
            <Blocker block={block} />
            <NavBar LogIn Home FondoImg />
            <RegisterStyleContJr>
              <div className="UpSection">
                <h1>¡Hola de Nuevo!</h1>
                <p>
                  ¿No tienes una cuenta? <a href="./registro">Registrate aquí</a>{" "}
                </p>
              </div>
              <div className="DownSection">
                <div className="Left">
                  <h2>Iniciar sesión con una red social</h2>
                  <div className="Butons">
                    <button className="Google" type="button" onClick={google}>
                      <img src={IMGoogle} alt="" />
                      <p>Ingresar con Google</p>
                    </button>
                    <a href="https://www.linkedin.com/in/matías-straface-369a66238/">MatiasStraface</a>
                  </div>
                </div>
                <div className="Rigth">
                  <h2>Inicia sesión con tu email</h2>
                  <div className="Inputs">
                    <input
                      name="input-email"
                      id="input_email"
                      type="email"
                      placeholder="Email"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      name="input-password"
                      id="input_password"
                      type="password"
                      placeholder="Contraseña"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" className="recuperoClave" onClick={(e) => recuperoClave(e)}>
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <button type="submit" onClick={login}>
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            </RegisterStyleContJr>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                className: "",
                style: {
                  fontSize: "1.5rem",
                  fontFamily: "RocknRoll One",
                },
              }}
            />
          </RegisterStyleCont>
        </div>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
}
export default InciarSesion;
