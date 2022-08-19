/* eslint-disable react/destructuring-assignment */
import React from "react";
import styled from "styled-components";
import Colors from "../../../Utils/colors";

const SearchBarYFiltersStyled = styled.div`
  display: flex;
  position: absolute;
  z-index: 100;
  border: solid black 3px;
  background-color: ${Colors.Green_Light};
  height: fit-content;
  width: 350px;
`;

export default function SearchBarYFilters(props) {
  return (
    <SearchBarYFiltersStyled>
      {props.Search && (
        <>
          <div>
            <h4>Busqueda por Local</h4>
          </div>
          <input type="text" placeholder="Rock Store" /> <button type="submit">Search</button>
        </>
      )}
    </SearchBarYFiltersStyled>
  );
}
