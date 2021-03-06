import React from "react"
import styled from "styled-components"
import {
  Flex,
  FlexProps,
  HTML,
  Join,
  Sans,
  Spacer,
  color,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeader_feature } from "__generated__/FeatureHeader_feature.graphql"
import { NavBarHeight } from "Components/NavBar"

const Container = styled(Flex)`
  width: 100%;
  flex: 1;
  border-bottom: 1px solid ${color("black100")};
`

const Figure = styled(Flex)`
  flex-basis: 50%;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: ${color("black10")};
  overflow: hidden;
`

const Meta = styled(Flex)`
  flex-shrink: 1;
  flex-grow: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export interface FeatureHeaderProps extends FlexProps {
  feature: FeatureHeader_feature
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({
  feature: { name, subheadline, image },
  ...rest
}) => {
  return (
    <Container
      display={["block", "flex"]}
      height={["auto", !!image ? `calc(95vh - ${NavBarHeight}px)` : "50vh"]}
      {...rest}
    >
      {image && (
        <Figure
          style={{
            backgroundImage: `url(${image.cropped.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        />
      )}

      <Meta p={4} flexBasis={image ? "50%" : "100%"}>
        <Join separator={<Spacer my={1} />}>
          <Sans size="10" element="h1" textAlign="center" unstable_trackIn>
            {name}
          </Sans>

          {subheadline && (
            <HTML
              fontFamily="sans"
              size="4"
              textAlign="center"
              html={subheadline}
            />
          )}
        </Join>
      </Meta>
    </Container>
  )
}

export const FeatureHeaderFragmentContainer = createFragmentContainer(
  FeatureHeader,
  {
    feature: graphql`
      fragment FeatureHeader_feature on Feature {
        name
        subheadline(format: HTML)
        image {
          cropped(width: 2000, height: 2000, version: "source") {
            url
          }
        }
      }
    `,
  }
)
