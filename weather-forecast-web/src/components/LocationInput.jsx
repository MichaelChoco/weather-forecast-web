import { useState } from "react";

function LocationInput(props) {

  return (
    <div className="Location">
      <label>Your City</label>
      <input
        type="text"
        placeholder="Input your City"
        value={props.location}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default LocationInput;
