import { CollectionsFixture } from "Apps/__test__/Fixtures/CollectionsFixture"
import { mount } from "enzyme"
import React from "react"
import { EntityHeader } from "Styleguide/Components/EntityHeader"
import { CollectionsGrid } from "../CollectionsGrid"

describe("CollectionsGrid", () => {
  const getWrapper = passedProps => {
    return mount(<CollectionsGrid {...passedProps} />)
  }

  let props
  beforeEach(() => {
    props = {
      collections: CollectionsFixture,
    }
  })

  it("Renders a list of collections", () => {
    const component = getWrapper(props)

    expect(component.find(EntityHeader).length).toBe(6)
    expect(component.text()).toMatch("Big Artists, Small Sculptures")
    expect(component.html()).toMatch(
      "http://files.artsy.net/images/pumpkinsbigartistsmallsculpture.png"
    )
  })

  it("Renders a categoryName if provided", () => {
    props.categoryName = "Collectible Sculptures"
    const component = getWrapper(props)

    expect(component.text()).toMatch("Collectible Sculptures")
  })
})
