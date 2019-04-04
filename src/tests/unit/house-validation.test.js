import React from "react";
import renderer from "react-test-renderer";
import PropertyForm from "../../pages/AddProperty/components/PropertyForm";
import { shallow } from "enzyme";

test("house validation", () => {
    const wrapper = shallow(<PropertyForm.WrappedComponent />);

    const houseObj = {
        email: "seller4@gmail.com",
        userId: "5bd1fde74458861f08a2667f",
        price: "123",
        address: "null",
        propertyType: "null",
        description: "null",
        bedRooms: "1",
        bathRooms: "1",
        yearBuilt: "1540492553438",
        sqFeetLot: "1000",
        sqFeet: "1000",
        status: "publish"
    };

    console.log(wrapper.instance());
    expect(wrapper.validateHouseObject(houseObj).equals(true));
});
