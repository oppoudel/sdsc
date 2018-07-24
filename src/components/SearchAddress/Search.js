import React, { Component } from "react";
import Downshift from "downshift";
import matchSorter from "match-sorter";
import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  css
} from "./Shared";
import Geocode from "./Geocode";
import { addPoint } from "../Map/utils";

export default class Search extends Component {
  handleStateChange = ({ selectedItem }) => {
    if (selectedItem) {
      const { x, y } = selectedItem.location;
      addPoint(x, y);
    }
  };
  getItems(allItems, filter) {
    return filter
      ? matchSorter(allItems, filter, {
          keys: ["address"]
        })
      : allItems;
  }
  render() {
    return (
      <Downshift
        itemToString={item => (item ? item.address : "")}
        onStateChange={this.handleStateChange}
      >
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue,
          getLabelProps,
          clearSelection,
          getToggleButtonProps,
          getMenuProps
        }) => (
          <div {...css({ width: "50%" })}>
            <Label {...getLabelProps()}>Search Address</Label>
            <div {...css({ position: "relative" })}>
              <Input
                {...getInputProps({
                  placeholder: "Search Address",
                  onChange: this.inputOnChange
                })}
              />
              {selectedItem ? (
                <ControllerButton
                  onClick={clearSelection}
                  aria-label="clear selection"
                >
                  <XIcon />
                </ControllerButton>
              ) : (
                <ControllerButton {...getToggleButtonProps()}>
                  <ArrowIcon isOpen={isOpen} />
                </ControllerButton>
              )}
            </div>
            <div {...css({ position: "relative", zIndex: 1000 })}>
              <Menu {...getMenuProps({ isOpen })}>
                {(() => {
                  if (!isOpen) {
                    return null;
                  }

                  if (!inputValue) {
                    return (
                      <Item disabled>You have to enter a search query</Item>
                    );
                  }

                  return (
                    <Geocode address={inputValue}>
                      {({ loading, error, data = [] }) => {
                        if (loading) {
                          return <Item disabled>Loading...</Item>;
                        }

                        if (error) {
                          return <Item disabled>Error! ${error}</Item>;
                        }

                        if (!data.length) {
                          return <Item disabled>No Addresses found</Item>;
                        }

                        return this.getItems(data, inputValue).map(
                          (item, index) => (
                            <Item
                              key={index}
                              {...getItemProps({
                                item,
                                index,
                                isActive: highlightedIndex === index,
                                isSelected: selectedItem === item
                              })}
                            >
                              {item.address}
                            </Item>
                          )
                        );
                      }}
                    </Geocode>
                  );
                })()}
              </Menu>
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}
