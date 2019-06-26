import { Box, color, Flex, FlexProps, Sans } from "@artsy/palette"
import { AdDimension, AdUnit } from "Components/Publishing/Typings"
import React, { SFC, useState } from "react"
import { Bling as GPT } from "react-gpt"
import styled from "styled-components"

export interface DisplayAdProps extends FlexProps {
  adUnit: AdUnit
  adDimension: AdDimension
  displayNewAds?: boolean
  targetingData: {
    is_testing: boolean
    page_type: string
    post_id: string
  }
  isSeries?: boolean
  isStandard?: boolean
}

export interface DisplayAdContainerProps extends FlexProps {
  isSeries?: boolean
  isStandard?: boolean
  adDimension?: AdDimension
}

export const DisplayAd: SFC<DisplayAdProps> = props => {
  const {
    adDimension,
    adUnit,
    displayNewAds,
    targetingData,
    ...otherProps
  } = props

  const [width, height] = adDimension.split("x").map(a => parseInt(a))
  const [isAdEmpty, setAdEmpty] = useState(false)
  const is300x50Display = height === 50

  const ad = (
    <GPT
      adUnitPath={`/21805539690/${adUnit}`}
      targeting={targetingData}
      slotSize={[width, height]}
      onSlotRenderEnded={event => {
        setAdEmpty(event.isEmpty)
      }}
    />
  )

  if (!displayNewAds || isAdEmpty) {
    return null
  }

  return (
    <DisplayAdContainer
      flexDirection="column"
      pt={is300x50Display ? 0 : 2}
      pb={is300x50Display ? 2 : 1}
      height={is300x50Display ? "100px" : "334px"}
      {...otherProps}
    >
      <Box m="auto">
        {ad}
        <Sans size="1" color="black30" m={1}>
          Advertisement
        </Sans>
      </Box>
    </DisplayAdContainer>
  )
}

const DisplayAdContainer = styled(Flex)<DisplayAdContainerProps>`
  margin: ${props => (props.isStandard ? "0" : "0 auto")};
  border-top: ${props =>
    props.isSeries ? `1px solid ${color("black10")}` : "none"};
  background: ${props =>
    props.isSeries ? color("black100") : color("black5")};
  text-align: center;
  width: 100%;
`
