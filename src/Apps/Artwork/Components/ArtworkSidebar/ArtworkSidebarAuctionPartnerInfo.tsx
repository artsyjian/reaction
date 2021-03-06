import { Box, Serif } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import React from "react"

import { ArtworkSidebarAuctionPartnerInfo_artwork } from "__generated__/ArtworkSidebarAuctionPartnerInfo_artwork.graphql"

export interface ArtworkSidebarAuctionPartnerInfoProps {
  artwork: ArtworkSidebarAuctionPartnerInfo_artwork
}

export class ArtworkSidebarAuctionPartnerInfo extends React.Component<
  ArtworkSidebarAuctionPartnerInfoProps
> {
  render() {
    const { partner, sale_artwork, sale } = this.props.artwork
    if (sale.is_closed) {
      return null
    }
    return (
      <Box pb={3}>
        {partner && (
          <Serif size="2" weight="semibold" color="black100">
            {partner.name}
          </Serif>
        )}
        {sale_artwork && sale_artwork.estimate && (
          <Serif size="2" color="black60">
            Estimated value: {sale_artwork.estimate}
          </Serif>
        )}
      </Box>
    )
  }
}

export const ArtworkSidebarAuctionPartnerInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarAuctionPartnerInfo,
  {
    artwork: graphql`
      fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
        partner {
          name
        }
        sale_artwork: saleArtwork {
          estimate
        }
        sale {
          internalID
          is_closed: isClosed
        }
      }
    `,
  }
)
