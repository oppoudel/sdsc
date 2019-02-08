import { geocode } from "@esri/arcgis-rest-geocoder";
import Downshift from "downshift";
import matchSorter from "match-sorter";
import React from "react";
import { addPoint } from "../Map/utils";
import Geocode from "./Geocode";
import {
  ArrowIcon,
  ControllerButton,
  css,
  Input,
  Item,
  Label,
  Menu,
  XIcon
} from "./Styles";

export default function Search({ updateXY }) {
  const handleStateChange = ({ selectedItem }) => {
    if (selectedItem) {
      const { magicKey } = selectedItem;
      geocode({ params: { magicKey, maxLocations: 10 } }).then(res => {
        const { x, y } = res.candidates[0].location;
        addPoint(x, y);
        updateXY(x, y);
      });
    }
  };
  const getItems = (allItems, filter) => {
    return filter
      ? matchSorter(allItems, filter, {
          keys: ["text"]
        })
      : allItems;
  };

  return (
    <Downshift
      itemToString={item => (item ? item.text : "")}
      onStateChange={handleStateChange}
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
        <div {...css({ width: "100%", margin: "auto" })}>
          <Label {...getLabelProps()}>Search Address</Label>
          <div {...css({ position: "relative" })}>
            <Input
              {...getInputProps({
                placeholder: "Search Address"
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
                  return <Item disabled>You have to enter a search query</Item>;
                }

                return (
                  <Geocode address={`${inputValue}`}>
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

                      return getItems(data, inputValue).map((item, index) => (
                        <Item
                          key={index}
                          {...getItemProps({
                            item,
                            index,
                            isActive: highlightedIndex === index,
                            isSelected: selectedItem === item
                          })}
                        >
                          {item.text}
                        </Item>
                      ));
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
