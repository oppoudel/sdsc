import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";
import { addFeatures } from "@esri/arcgis-rest-feature-service";
import { bpdApp } from "./Map/mapConfig";
import { editServiceUrl } from "../config";

export default class InputForm extends Component {
  state = { Name: "" };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {
    const { x, y } = bpdApp;
    const { Name } = this.state;
    const token = JSON.parse(localStorage.getItem("bpdToken")).token;
    addFeatures({
      url: editServiceUrl,
      adds: [
        {
          geometry: { x, y, spatialReference: { wkid: 4326 } },
          attributes: { Name }
        }
      ],
      token
    }).then(res => console.log(res));
    this.setState({ Name: "" });
  };
  render() {
    const { Name } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <Input
              fluid
              placeholder="Name"
              name="Name"
              value={Name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Button content="Submit" />
        </Form>
      </div>
    );
  }
}
